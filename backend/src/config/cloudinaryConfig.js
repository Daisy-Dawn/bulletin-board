const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configure Multer-Storage-Cloudinary with transformations
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'user-profile-pictures', // Folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
        transformation: [
            {
                width: 500,
                height: 500,
                crop: 'fill', // Ensures the image fills the 500x500 box
                gravity: 'auto', // Automatically centers the crop
                fetch_format: 'auto', // Optimizes format
                quality: 'auto', // Optimizes quality
            },
        ],
    },
})

const upload = multer({ storage })

module.exports = { upload, cloudinary }
