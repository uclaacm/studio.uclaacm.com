# studio.uclaacm.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/8dd726a7-23aa-4b82-ae3b-8c1c034a01d9/deploy-status)](https://app.netlify.com/sites/vermillion-hummingbird-d28997/deploys)

## Contributing

Make sure code looks alright before commiting. You can use prettier if you have it installed, but I just use the LSP's formatter (on VSCode its "Format Document": `Alt+Shift+F` on windows and `Shift+Option+F` on Mac). As long as you indent correctly and try to make sure
things don't take up too many columns, it's fine.

Before you push to `main` or merge into `prod`, ***make sure the code builds***. Just because it works in `dev`, doesn't mean it actually deploys. Just run `yarn build` before building, which will check for type errors and errors in files you haven't checked.

## Setup

### NodeJS

We recommend using a package manager (and a [version manager](https://github.com/nvm-sh/nvm) if you want)!

[Brew](https://formulae.brew.sh/formula/node) (Mac): `brew install node`

[Choco](https://community.chocolatey.org/packages/nodejs.install) (Window): `choco install nodejs.install`

Otherwise, you can [install it manually](https://nodejs.org/en)

Latest release (v21) works, but requires some polyfills so be warned if using new JS APIs (see `src/util/polyfill.ts` for some polyfills already implemented).

### Yarn

Once NodeJS is installed, install yarn globally:

`npm i --global yarn`

Now open the repository in a terminal and install required packages using:

`yarn`

(if it doesn't recognize yarn, restart terminal)

### Environment Variables

You can specify environment variables in a [.env](https://www.npmjs.com/package/dotenv) file in the root of the repo. Do not share or commit the API keys/secrets.

```env
NEXT_PUBLIC_GCLOUD_API_KEY=...
NOTION_SECRET=...
NOTION_OFFICERS_DATABASE_ID=f82a1e06e36345088fa782632acf1dee
NOTION_OFFICER_SOCIAL_LINKS_DATABASE_ID=71a67370c416472096621cbb25335ae4
NOTION_DEBUG_ARTICLES_DATABASE_ID=457c5b5607df4219a8640d78d20b0962
```

#### Google API

To access the Google API Key, go to [this link](https://console.cloud.google.com/apis/credentials?project=studio-uclaacm-com). If this doesn't work, make sure you have access to the Google Developer console. Otherwise, you can also go to the Google Developer Console, open the left-hand-side menu, and go to `APIs & Services/Credentials`. For development, use the development key, and for production, use the production key.

#### Notion API

To access the Notion API Key, make sure you have the Workspace Owner perm on the ACM Studio Notion, and navigate to [https://www.notion.so/my-integrations]. Find the `ACM Studio Website Scraper` integration, click on it, and go to the secrets tab, where you will find the secret. Please don't refresh it lol.

The Notion API requires a database ID when querying the database. At the time of writing, the officers one is `f82a1e06e36345088fa782632acf1dee`. However, if it is even changed, [it can be found](https://developers.notion.com/reference/retrieve-a-database) by going to a database (the database will be in the dropdown under the page displaying the database), go to the top right three dots icon, click `Copy Link`, which will be of the form:

```text
https://www.notion.so/acmstudioucla/f82a1e06e36345088fa782632acf1dee?v=30c84e38ff814e36b6f2d3cde4befa41&pvs=4
                                    ^                              ^
                                    |______________________________|
                                               Database ID
```

In addition, the integration to be [connected to the database](https://www.notion.so/help/add-and-manage-connections-with-the-api), which can be granted through the three dots again, then `connect to`, then find the integration. This must be done for any *related* databases to (eg. the Officer Social Links) database.

### Running

The scripts are visible in `package.json`.

There are 2 important ones:

- `dev` runs the NextJS development server
- `index` indexes the content in the `content` folder
- `index:watch` does the same thing but automatically reruns the script when something changes

If you modify any content in `content`, you need to rerun `index` (or have `index:watch` automatically rerun), so it is best to run `yarn dev` and `yarn index:watch` at the same time, either using 2 terminal instances or in parallel (`yarn dev & yarn index:watch` on Mac, Linux, and [MS Powershell 7](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4#msi)).

### Deploying

The branch `prod` is automatically deployed to the Netlify project `vermillion-hummingbird-d28997` accessible through [https://vermillion-hummingbird-d28997.netlify.app/]. Thus, all you need to do is merge into `prod` to deploy.

Netlify uses a CI process, so unsuccessful builds will *not* break everything. However, unsuccessful builds happen a lot, even with type errors that you may not get on your machine. To test if the build *should* work on Netlify's servers, you can run `yarn build`. Depending on your version of `node`, you can also install the Netlify CLI and do a local build.

If you need access to the Netlify, ask Aubrey. Note that the main configuration needed for Netlify to work is to set up the environment variables [as shown above](#environment-variables).