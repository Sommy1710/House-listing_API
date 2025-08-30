import Joi from 'joi';

export const CreateListingRequest = Joi.object({
  ownerId: Joi.string().required(), 
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().integer().min(1).required(),
  currency: Joi.string().required(),
  propertyType: Joi.string()
    .valid('apartment', 'house', 'studio', 'duplex', 'land')
    .required(),
  bedrooms: Joi.number().integer().min(0).required(),
  bathrooms: Joi.number().integer().min(0).required(),
  areaSqm: Joi.number().min(0).required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
  address: Joi.string().required(),
  amenities: Joi.array().items(Joi.string()).required(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  status: Joi.string().valid('active', 'inactive').default('active')
});