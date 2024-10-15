// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listings.js");

// //const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const dbUrl = process.env.MONGO_URI;
// main()
//     .then(() => {
//         console.log("connected to DB");
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

// async function main() {
//     await mongoose.connect(dbUrl);
// }

// const initDB = async()=>{
//     await Listing.deleteMany({});
//     initData.data=initData.data.map((obj)=>({...obj,owner:"66fba30a01fbfd7b4b33e3aa"}));
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
// }

// initDB();










require('dotenv').config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const cloudinary = require('cloudinary').v2;

const dbUrl = process.env.MONGO_URI;

if (!dbUrl) {
  console.error("Database URL is not defined in .env file.");
  process.exit(1);
}

async function main() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000 // 30 seconds
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1);
  }
}

main();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner:process.env.ATLAS_ADMIN }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();

// const initDB = async () => {
//   try {
//     // To clear existing listings before inserting new ones
//     await Listing.deleteMany({});

//     // Map over the initData data and add the owner field
//     const listingsWithCloudinaryImages = await Promise.all(
//       initData.data.map(async (listingData) => {
//         const { image, ...rest } = listingData;

//         try {
//           const imageData = image && image.url ? image.url : null;

//           if (!imageData) {
//             throw new Error('Image data is missing or invalid.');
//           }

//           const cloudinaryImage = await cloudinary.uploader.upload(imageData, {
//             folder: 'wanderlust_DEV',
//             allowed_formats: ["png", "jpg", "jpeg"],
//           });

//           const listingWithImage = {
//             ...rest,
//             image: {
//               url: cloudinaryImage.url,
//               filename: cloudinaryImage.public_id,
//             },
//             owner: process.env.ATLAS_ADMIN,
//           };

//           return listingWithImage;
//         } catch (uploadError) {
//           console.error('Error uploading image to Cloudinary:', uploadError);
//           throw uploadError;
//         }
//       })
//     );

//     await Listing.insertMany(listingsWithCloudinaryImages);
//     console.log("Data was initialized with Cloudinary images");
//   } catch (error) {
//     console.error('Error in initDB:', error);
//   }
// };

// initDB();



