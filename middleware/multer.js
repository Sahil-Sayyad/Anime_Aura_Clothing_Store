//this multer package for the store image in db.
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const multerConfig = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, ""),
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG files are allowed!"), false);
    }
  },
});

const upload = multerConfig.single("image");

module.exports = { upload };
