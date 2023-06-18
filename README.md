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

### Running

The scripts are visible in `package.json`, but `yarn dev`/`yarn run dev` runs the development server.