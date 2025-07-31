const multer = require('multer');
const path = require('path');
const { MulterAzureStorage } = require('multer-azure-blob-storage');
require('dotenv').config();

const resolveBlobName = (req, file) => {
  return new Promise((resolve, reject) => {
    const ext = path.extname(file.originalname);
    const blobName = path.basename(file.originalname, ext) + Date.now() + ext;
    req.filename = blobName;
    resolve(blobName);
  });
};

const azureStoreage = new MulterAzureStorage({
  connectionString: process.env.SA_CONNECTION_STRING,
  accessKey: process.env.SA_KEY,
  containerName: 'yangpa',
  blobName: resolveBlobName,
  containerAccessLevel: 'blob',
});
const upload = multer({
  storage: azureStoreage,
  limits: { fileSize: 1024 * 1024 * 100 },
});

module.exports = upload;
