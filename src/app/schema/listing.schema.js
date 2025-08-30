import mongoose, {model, Schema} from 'mongoose';

const ListingSchema = new Schema ({
    ownerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    currency: {type: String, required: true},
    propertyType: {type: String, enum: ['apartment', 'house', 'studio', 'duplex', 'land'], required: true},
    bedrooms: {type: Number, required: true, min: 0},
    bathrooms: {type: Number, required: true, min: 0},
    areaSqm: {type: Number, required: true, min: 0},
    city: {type: String, required: true, trim: true},
    state: {type: String, required: true, trim: true},
    country: {type: String, required: true, trim: true},
    address: {type: String, required: true},
    amenities: {type: [String], default: [], required: true},
    images: [{type: String}],
    status: {type: String, enum: ['active', 'inactive'], default: 'active', required: true}
}, {timestamps: true});

export const Listing = model('Listing', ListingSchema);