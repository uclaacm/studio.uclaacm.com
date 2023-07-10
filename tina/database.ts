import { createDatabase, TinaLevelClient } from '@tinacms/datalayer'
import { Level } from "@tinacms/graphql/dist/database/level"

import { MongodbLevel } from 'mongodb-level'
import { Octokit } from '@octokit/rest'

import path from 'path';
import * as fs from 'node:fs/promises';

// `isLocal` determines if the database is running in "Local Mode" or "Production Mode". You can set this value in your .env file or use a different method for determining the value. In this example we are using an environment variable.

// When in "Local Mode" a local levelDB server is used and data is saved to the file system
// When in "Production Mode" Your provided LevelDB implementation is used (MongoDB Level in this example) and data is written to the Git repository with "onPut" and "onDelete" callback functions
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true'

if (isLocal) console.log('Running TinaCMS in local mode.')
else console.log('Running TinaCMS in production mode.')

const owner = process.env.GITHUB_OWNER as string
const repo = process.env.GITHUB_REPO as string

// Must create a personal access token
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string
const branch = process.env.GITHUB_BRANCH as string

const octokit = new Octokit({
	auth: token,
})
const localLevelStore = new TinaLevelClient()
const mongodbLevelStore = new MongodbLevel<string, Record<string, any>>({
	collectionName: 'tinacms',
	dbName: 'tinacms',
	mongoUri: process.env.MONGODB_URI as string,
})
if (isLocal) {
	localLevelStore.openConnection()
}

async function githubOnPut(key: string, value: string): Promise<void> {
    // let sha;
    // try {
    //     const {
    //     // @ts-ignore
    //     data: { sha: existingSha },
    //     } = await octokit.repos.getContent({
    //     owner,
    //     repo,
    //     path: key,
    //     branch,
    //     });
    //     sha = existingSha;
    // } catch (e) {}

    // const { data } = await octokit.repos.createOrUpdateFileContents({
    //     owner,
    //     repo,
    //     path: key,
    //     message: "commit from self-hosted tina",
    //     content: Buffer.from(value).toString("base64"),
    //     branch,
    //     sha,
    // });
};

async function githubOnDelete(key: string): Promise<void> {
    // let sha;
    // try {
    //     const {
    //         // @ts-ignore
    //         data: { sha: existingSha },
    //     } = await octokit.repos.getContent({
    //         owner,
    //         repo,
    //         path: key,
    //         branch,
    //     });
    //     sha = existingSha;
    // } catch (e) {
    //     console.log(e);
    // }
    // if (sha) {
    //     const { data } = await octokit.repos.deleteFile({
    //     owner,
    //     repo,
    //     path: key,
    //     message: "commit from self-hosted tina",
    //     branch,
    //     sha,
    //     });
    //     console.log("data", data);
    // }
};

const localRoot = path.join(process.cwd(), "content");

async function localOnPut(key: string, value: string): Promise<void> {
    const filePath = path.join(localRoot, key);
    const dir = path.dirname(filePath)
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, value);
};

async function localOnDelete(key: string): Promise<void> {
    const currentPath = path.join(process.cwd(), "content", key);
    await fs.rm(currentPath);
};



export default createDatabase({
	level: isLocal ? localLevelStore as Level : mongodbLevelStore,
	onPut: isLocal ? localOnPut : githubOnPut,
	onDelete: isLocal ? localOnDelete : githubOnDelete,
})