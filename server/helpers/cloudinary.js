const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config({ path: '../../.env' });

cloudinary.config({
  cloud_name: "du0x0xwgt",
  api_key: "845348897748278",
  api_secret: "2LY65nBESQMpgODUEZNB6t1raHA",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
