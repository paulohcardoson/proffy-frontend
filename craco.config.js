const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@base": path.resolve(__dirname, "src/"),
			"@pages": path.resolve(__dirname, "src/pages/"),
			"@components": path.resolve(__dirname, "src/components/"),
			"@assets": path.resolve(__dirname, "src/assets/"),
			"@images": path.resolve(__dirname, "src/assets/images"),
			"@icons": path.resolve(__dirname, "src/assets/images/icons/"),
		},
	},
};
