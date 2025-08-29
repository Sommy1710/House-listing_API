#House Listing API
A secure and scalable RESTful API for managing house listings, built with JavaScript, Node.js, Express, and MongoDB.
This backend service supports full CRUD operations, advanced querying, secure authentication, and image uploads — ideal
for real estate platforms or property management systems.

#Features

-JWT Authentication Secure login and protected routes using JSON Web Tokens.

-CRUD Operations
Create, Read, Update, and Delete listings with full validation and ownership checks.

-Advanced Querying
Search by keyword
Filter by city, price, property type, etc.
Sort by price or creation date (asc/desc)
Pagination with metadata (page, limit, total, totalPages)

-Validation with Joi
Ensures clean and predictable request payloads.

-Password Hashing 
User passwords are securely hashed before storage.

-Rate Limiting
Prevents brute-force attacks by limiting incorrect login attempts (15-minute lockout).

-Image Uploads
Integrated with Cloudinary and Multer for uploading and storing listing images.

-Tech Stack
Runtime = Node.js
Framework = Express.js
Database = MongoDB(Mongoose)
Auth = JWT
Validation = joi
Security = express-rate-limit
File Uploads = Multer + Cloudinary

-Installation
git clone <repository url>
cd < repository name>
npm install

-Running the project 
start the server in development mode
npm run start:dev

-seeding the database 
npm run db:seed

demo user(demo@user.com/ password123/ Martin)

-Environment Variables
Create a `.env` file in the root of the project and add the following variables:
PORT=3000
MONGO_URI=mongodb=
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

-API Endpoints
- Auth
  POST /api/v1/auth/register - Register new user
  POST /api/v1/auth/login - Login and recieve JWT
  GET /api/v1/auth/user - get authenenticated user(authourized users only)

-Listings
POST /api/v1/listings – Create listing (authentication required)
GET /api/v1/listings – Get all listings with filters, search, sort, pagination
GET /api/v1/listings/:id – Get single listing
PUT /api/v1/listings/:id – Update listing (owner only)
GET /api/v1/listings/search = Searches for a particular keyword and returns all
listing associated with that keyword
DELETE /api/v1/listings/:id – Delete listing (owner only)

-Sample listing payload
{
  "ownerId": "64f9c1a2b7e3a9d5c8e4f123",
  "title": "Modern Duplex with Ocean View",
  "description": "A spacious and elegant duplex located near the coastline, perfect for families.",
  "price": 250000,
  "currency": "USD",
  "propertyType": "duplex",
  "bedrooms": 4,
  "bathrooms": 3,
  "areaSqm": 320,
  "city": "Ekae",
  "state": "Edo",
  "country": "Nigeria",
  "address": "12 Palm Grove Avenue, Ekae",
  "amenities": ["WiFi", "Air Conditioning", "Swimming Pool", "Parking"],
  "images": [
    "https://res.cloudinary.com/demo/image/upload/v1690000000/listing1.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1690000001/listing2.jpg"
  ],
  "status": "active"
}
ownerId must be a valid MongoDB ObjectId. 
images must be valid URLs hosted on Cloudinary.

User A cannot update/delete User B's Listing
User B cannot update/delete User A's Listing

-Usage
Use tools like Postman or Insomnia or thunderclient to interact with the API. 

-Secury Highlights
Passwords hashed with argon
JWT-based route protection
Rate limiting on login to prevent brute-force attacks
Ownership checks on update/delete operations

-Image Uploads
Upload listing images using multipart/form-data
Images are stored on Cloudinary and returned as secure URLs
