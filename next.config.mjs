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