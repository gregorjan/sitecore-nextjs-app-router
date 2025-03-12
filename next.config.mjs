/** @type {import('next').NextConfig} */
const nextConfig = {
 	typescript: {
		ignoreBuildErrors: true,
	},
	env: {
		SITECORE_EDGE_CONTEXT_ID: process.env.SITECORE_EDGE_CONTEXT_ID,
		SITECORE_EDGE_URL: process.env.SITECORE_EDGE_URL,
		DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
		SITECORE_SITE_NAME: process.env.SITECORE_SITE_NAME
	},
};

export default nextConfig;
