import { GridFsStorage } from 'multer-gridfs-storage';
import path from 'path';
import multer from 'multer';
import crypto from 'crypto';


// enter your mongodb connection string here
const mongoURI = '';

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.memeType) === -1)
      return `${Date.now()}-blog-${file.originalname}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`
    }

  }
});
export default multer({ storage });