const multer = require('multer');
const fs = require('fs')
const util = require("util");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const { sku } = JSON.parse(req.body['product-data'])
        const folderPath = `./uploads/gallery/${sku}`
        fs.mkdirSync(folderPath, { recursive: true })
        callback(null, folderPath);
    },
    filename: function (req, file, callback) {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            let message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
        }
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).array('product_images', 10);
var uploadFilesMiddleware = util.promisify(upload);
module.exports = uploadFilesMiddleware