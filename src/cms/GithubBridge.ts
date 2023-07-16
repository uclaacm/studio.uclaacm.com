import { Octokit } from "@octokit/rest"
import { Bridge } from "@tinacms/datalayer"

import path from "path";

// filesystem bridge example here https://github.com/tinacms/tinacms/blob/f4ad4bd9fd1ca04443a5cfdb27f1caf6b13b9eb2/packages/%40tinacms/graphql/src/database/bridge/filesystem.ts#L12

const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
const owner = process.env.GITHUB_OWNER
const repo = process.env.GITHUB_REPO
const branch = process.env.GITHUB_BRANCH

const committer = {
	name: "Tina CMS",
	email: "zane.a.s.clark@gmail.com"
};

export class GithubBridge implements Bridge {
	public rootPath: string
	public outputPath?: string

	constructor(rootPath: string) {
		this.rootPath = rootPath || ''
	}

	async glob(pattern: string, extension: string): Promise<string[]> {
		const basePath = path.join(...pattern.split('/'));
		const { data } = await octokit.repos.getContent({ owner, repo, ref: branch, path: basePath });
		if(data instanceof Array){
			return Promise.all(
				// [string] => [Promise<string[]>]
				data.map(
					// return [filename] if file and matches
					// return glob(directory) if directory
					async (entry): Promise<string[]> => (
						entry.type === "dir"
							? await this.glob(entry.path, extension)
							: entry.type === "file"
								? entry.path.endsWith(`.${extension}`) ? [entry.path] : []
							: []
					)
				)
			)	// Promise.all: Promise<string[]>[] => Promise<string[][]>
				// Promise<string[][]> => Promise<string[]>
				.then(arr => arr.flat());
		}
		else {
			// glob called on file/symlink -> what???
			// maybe should throw
			return []
		}
	}

	async delete(filepath: string): Promise<void> {
		const { data } = await octokit.repos.getContent({ owner, repo, ref: branch, path: filepath });
		let sha: string | null = null;
		if(!(data instanceof Array) && data.type === "file"){
			sha = data.sha;
		}
		if(!sha){
			throw "Could not find file.";
		}

		await octokit.repos.deleteFile({
			owner,
			repo,
			branch,
			path: filepath,
			message: "TinaCMS: Deleting file through GitHub bridge",
			sha,
			committer
		});
	}

	async get(filepath: string): Promise<string> {
		const { data } = await octokit.repos.getContent({ owner, repo, ref: branch, path: filepath }).catch(e => null as ReturnType<typeof octokit.repos.getContent> | null);
		if(data instanceof Array){
			throw "Trying to get contents of directory";
		}
		if(data.type !== "file"){
			throw `Trying to get contents of ${data.type}`;
		}

		return Buffer.from(data.content, "base64").toString();
	}

	async put(filepath: string, data: string): Promise<void> {
		const getContentRes = await octokit.repos.getContent({ owner, repo, ref: branch, path: filepath }).catch(e => null as ReturnType<typeof octokit.repos.getContent> | null);
		let sha: string | undefined = undefined;
		if(getContentRes){
			const contentData = getContentRes.data;
			if(contentData instanceof Array){
				throw "Trying to put contents to directory";
			}
			if(contentData.type !== "file"){
				throw `Trying to put content to a ${contentData.type}`;
			}
			sha = contentData.sha;
		}

		await octokit.rest.repos.createOrUpdateFileContents({
			owner,
			repo,
			branch,
			path: filepath,
			sha: sha,
			message: "TinaCMS: Putting content through GitHub bridge",
			content: Buffer.from(data).toString("base64"),
			committer
		})
	}
}