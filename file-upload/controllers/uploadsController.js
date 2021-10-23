const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

const uploadProductImageLocal = async (req, res) => {
  // check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;
  // check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  // check size
  if (productImage.size > process.env.IMAGE_MAX_SIZE) {
    throw new CustomError.BadRequestError(
      `Image Size Must Be Less Then ${process.env.IMAGE_MAX_SIZE / 1000} KB`
    );
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/',
    productImage.name
  );
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
