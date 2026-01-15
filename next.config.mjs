import path from "node:path";
import url from "node:url";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import bundleAnalyzer from "@next/bundle-analyzer"

const dirname = path.dirname(url.fileURLToPath(import.meta.url))

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
export default withBundleAnalyzer({
	async redirects() {
		return [
			{
				source: "/eclipse-rsvp",
				destination: "https://docs.google.com/forms/d/e/1FAIpQLSf3Fa7DclMJ3JVVduSjCY5kgi1nA-q4L4S-qy8Oi78sQ_nDUA/viewform",
				permanent: false,
			},
			{
				source: "/workshops/:slug*",
				destination: "/events/workshops/:slug*",
				permanent: true,
			},
			{
				source: "/connections/:slug*",
				destination: "/games/connections/:slug*",
				permanent: true,
			},
			{
				source: "/crosswords/:slug*",
				destination: "/games/crosswords/:slug*",
				permanent: true,
			},
			{
				source: "/feedback",
				destination: "https://forms.gle/HhQSGitE65vyjQKr8",
				permanent: false,
			},
			{
				source: "/events/students-run-studios/sign-up",
				destination: "https://docs.google.com/forms/d/e/1FAIpQLSeKSy32bJ8J-34jcpIuoL3ReN6VogYQSd_73ClM2z5BYuEXdA/viewform",
				permanent: false,
			},
			{
				source: "/srs/:slug*",
				destination: "/events/students-run-studios/:slug*",
				permanent: true,
			},
			{
				source: "/students-run-studios/:slug*",
				destination: "/events/students-run-studios/:slug*",
				permanent: true,
			},
		]
	},
	pageExtensions: ["page.tsx", "page.jsx"],
	webpack: (config, options) => {
		config.resolve.alias["~"] = path.resolve(dirname, "src");
		config.resolve.alias["@"] = path.resolve(dirname, "content");
		config.module ??= {};
		config.module.rules ??= [];
		config.module.rules.push({
			test: /\.mdx?$/,
			use: [
				{
					loader: '@mdx-js/loader',
					/** @type {import('@mdx-js/loader').Options} */
					options: {
						remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter]
					}
				}
			]
		});
		return config
	},
})
