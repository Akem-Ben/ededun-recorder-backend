import dotenv from 'dotenv';

dotenv.config()

// GENERAL SECRETS
export const APP_SECRET = process.env.APP_SECRET!

//SMTP SECRETS
export const GMAIL_USER = process.env.GMAIL_USER!
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD!

//CLOUDINARY SECRETS
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME!
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!