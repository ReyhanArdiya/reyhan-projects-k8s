import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
	"api_key"    : process.env.CLOUDINARY_API_KEY,
	"api_secret" : process.env.CLOUDINARY_API_SECRET,
	"cloud_name" : process.env.CLOUDINARY_CLOUD_NAME
});

const storage = new CloudinaryStorage({
	cloudinary,
	params : {
		allowedFormats : [ "jpg", "jpeg", "png" ],
		folder         : "VIXUN/profiles",
	}
});

const imageParser = multer({ storage });

export default imageParser;