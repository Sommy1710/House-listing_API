import * as listingService from "../services/listing.service.js";
import { asyncHandler } from "../../lib/util.js";
import {Validator} from './../../lib/validator.js';
import {CreateListingRequest} from '../requests/create-listing.request.js';
import {ValidationError} from '../../lib/error-definitions.js';
import { Listing } from "../schema/listing.schema.js";
import config from "../../config/app.config.js"
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export const createNewListing = asyncHandler(async (req, res) => {
    if(req.body.amenities && !Array.isArray(req.body.amenities)) {
        req.body.amenities = [req.body.amenities]
    }
    const validator = new Validator();
    const {errors, value} = validator.validate(CreateListingRequest, req.body);
    if (errors) throw new ValidationError('The request failed with the following errors', errors);

    let photoUrls = [];

    if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({resource_type: 'image'}, (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }).end(file.buffer);
            });
        });
        photoUrls = await Promise.all(uploadPromises);
    }
    const listingPayload = {
        ...value,
        images: photoUrls //this attaches photo URLs to the listing
    };

    await listingService.createListing(listingPayload);
    return res.status(201).json({
        success: true,
        message: 'new listinnng created',
        images: photoUrls
    });
});


export const fetchAllListings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, ...filters } = req.query;

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);
  const skip = (pageNumber - 1) * pageSize;

  const { listings, total } = await listingService.getListing({
    ...filters,
    skip,
    limit: pageSize
  });

  const totalPages = Math.ceil(total / pageSize);

  return res.status(200).json({
    success: true,
    message: 'listing retrieved',
    data: {
      listings,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages
      }
    }
  });
});

export const fetchListing = asyncHandler(async(req, res) =>
{
    const {id} = req.params;
    const listing = await listingService.getListings(id);
    
    return res.json({
        success: true,
        message: 'listing retrieved',
        data: {
            listing
        }
    })
});


export const updateSingleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  
  const validator = new Validator();
  const { errors, value } = validator.validate(CreateListingRequest, req.body);

  if (errors) throw new ValidationError('The request failed with the following errors', errors);

  
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ success: false, message: 'Listing not found' });
  }

  if (listing.ownerId.toString() !== userId) {
    return res.status(403).json({ success: false, message: 'You are not authorized to update this listing' });
  }

  
  const updatedListing = await listingService.updateListing(id, value);

  return res.status(200).json({
    success: true,
    message: 'Listing updated successfully',
    data: updatedListing
  });
});


export const deleteSingleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // from auth middleware

  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ success: false, message: 'Listing not found' });
  }

  if (listing.ownerId.toString() !== userId) {
    return res.status(403).json({ success: false, message: 'You are not authorized to delete this listing' });
  }

  await listing.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Listing deleted successfully'
  });
});

export const searchListing = asyncHandler(async (req, res) => {
    const {keyword} = req.query;
    if (!keyword) {
        return res.status(400).json({success: false, message: 'keyword is required'});
    }
   
    const listings = await Listing.find({
        $or: [
            {title: {$regex: keyword, $options: 'i'}}, //for case insensitive search
            {description: {$regex: keyword, $options: 'i'}}// for case insensitive search
        ]
    }).populate('ownerId', '-email -password'); // this will include the ownerId in response

    return res.status(200).json({
        success: true,
        message: 'Matching listing found',
        data: listings
    });
});