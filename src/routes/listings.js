import {Router} from 'express';
import authMiddleware from '../app/middleware/auth.middleware.js';
import { createNewListing, deleteSingleListing, fetchAllListings, fetchListing, updateSingleListing, searchListing } from '../app/controllers/listing.controller.js';
import { uploadMultiplePhotos } from '../lib/upload.js';
const router = Router();

router.get('/', fetchAllListings);
router.post('/', authMiddleware, uploadMultiplePhotos, createNewListing);
router.get('/search',  searchListing);
router.get('/:id', fetchListing);
router.put('/:id', authMiddleware, updateSingleListing);
router.delete('/:id', authMiddleware, deleteSingleListing);

export const listingRouter = router;