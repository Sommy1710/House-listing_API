import {aggregateResults} from "../../lib/util.js";
import {Listing} from "../schema/listing.schema.js";

export const createListing = async (payload) => {
    return await Listing.create(payload);
};


export const getListing = async (payload = {}) => {
  return await aggregateResults(Listing, payload);
};

export const getListings = async (id) => {
    return await Listing.findById(id)
};

export const updateListing = async (id, payload) => {
    return await Listing.findByIdAndUpdate(id, payload, {new: true});
};

export const deleteListing = async (id) => {
    return await Listing.findByIdAndDelete(id);
};
