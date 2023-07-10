const path = require("node:path")

module.exports = {
	webpack: (config, options) => {
		config.resolve.alias["~"] = path.resolve(__dirname, "src");
		config.resolve.alias["cms"] = path.resolve(__dirname, "tina", "__generated__");
		return config
	},
	async redirects() {
		return [
			{
				source: '/admin',
				destination: '/admin/index.html',
				permanent: true,
			},
		]
	},
}