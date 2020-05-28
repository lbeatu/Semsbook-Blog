const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url:
    "mongodb+srv://ozhan:123456987@cluster0-7w74l.mongodb.net/test?retryWrites=true&w=majority",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `Semsbook-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "SemsbookStore",
      filename: `Semsbook-${file.originalname}`,
    };
  },
});

const uploadFile = multer({
  storage: storage,
}).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFile;
