# studio.uclaacm.com

## Setup

### NodeJS

We recommend using a package manager (and a [version manager](https://github.com/nvm-sh/nvm) if you want)!

[Brew](https://formulae.brew.sh/formula/node) (Mac): `brew install node`

[Choco](https://community.chocolatey.org/packages/nodejs.install) (Window): `choco install nodejs.install`

Otherwise, you can [install it manually](https://nodejs.org/en)

Latest release should work.

### Yarn

Once NodeJS is installed, install yarn globally:

`npm i --global yarn`

Now open the repository in a terminal and install required packages using:

`yarn`

(if it doesn't recognize yarn, restart terminal)

### Environment Variables

A few environment variables are required for the backend to work. These can be specified using a [.env](https://www.npmjs.com/package/dotenv) file with the format:

```
# Always required
HOST=https://localhost:3000
TINA_PUBLIC_IS_LOCAL=true # true: no auth, everything saved in filesystem. False: auth, saved in github + cloudinary

# Only required when TINA_PUBLIC_IS_LOCAL == false
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dinbkakti
NEXT_PUBLIC_CLOUDINARY_API_KEY=815221835574889
CLOUDINARY_API_SECRET=...
GITHUB_OWNER=ketexon
GITHUB_REPO=studio-cms
GITHUB_PERSONAL_ACCESS_TOKEN=...
GITHUB_BRANCH=main
MONGODB_URI=...
```

### Running

The scripts are visible in `package.json`, but `yarn dev`/`yarn run dev` runs the development server.

#### SSL

For local SSL, you need to generate the certificates: `certificates/localhost.crt` and `certificates/localhost.key` and use `yarn dev:ssl`.

If you have OpenSSL installed (`choco install openssl`, `brew install openssl`, usually installed by default on linux), you can run `yarn gencerts` to automatically generate the certificates.