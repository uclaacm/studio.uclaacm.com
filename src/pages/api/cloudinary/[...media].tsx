import {
	mediaHandlerConfig,
	createMediaHandler,
} from 'next-tinacms-cloudinary/dist/handlers'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export const config = !isLocal && mediaHandlerConfig

export default !isLocal && createMediaHandler({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	authorized: async (req, _res) => {
		return true;
	},
})