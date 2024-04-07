import path from "node:path";
import url from "node:url";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const dirname = path.dirname(url.fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
export default {
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
}