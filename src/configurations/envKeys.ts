import dotenv from 'dotenv';

dotenv.config()

// GENERAL SECRETS
export const APP_SECRET = process.env.APP_SECRET!

//SMTP SECRETS
export const SMTP_USER_NAME = process.env.SMTP_USER_NAME!
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD!

//CLOUDINARY SECRETS
export const DEV_CLOUDINARY_NAME = process.env.DEV_CLOUDINARY_NAME!
export const DEV_CLOUDINARY_API_KEY = process.env.DEV_CLOUDINARY_API_KEY!
export const DEV_CLOUDINARY_API_SECRET = process.env.DEV_CLOUDINARY_API_SECRET!

export const PROD_CLOUDINARY_NAME = process.env.PROD_CLOUDINARY_NAME!
export const PROD_CLOUDINARY_API_KEY = process.env.PROD_CLOUDINARY_API_KEY!
export const PROD_CLOUDINARY_API_SECRET = process.env.PROD_CLOUDINARY_API_SECRET!