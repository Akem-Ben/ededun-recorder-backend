

const {
    DEV_PORT,
    DEV_CLOUDINARY_NAME,
DEV_CLOUDINARY_API_KEY,
DEV_CLOUDINARY_API_SECRET
} = process.env

console.log('Running in development mode')

export default {
    PORT:DEV_PORT,
    CLOUDINARY_NAME: DEV_CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: DEV_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: DEV_CLOUDINARY_API_SECRET
}