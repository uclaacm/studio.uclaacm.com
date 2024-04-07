# studio.uclaacm.com

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

You can specify environment variables in a [.env](https://www.npmjs.com/package/dotenv) file in the root of the repo. Right now, there is only 1 environment needed for `events` (see branch `events-v2`):

```
NEXT_PUBLIC_GCLOUD_API_KEY=...
```

To access the API key, ask Aubrey or somebody with access to the GCloud console (though you can make your own key pretty easily, you only need calendar permissions)

### Running

The scripts are visible in `package.json`.

There are 2 important ones:

- `dev` runs the NextJS development server
- `index` indexes the content in the `content` folder
- `index:watch` does the same thing but automatically reruns the script when something changes

If you modify any content in `content`, you need to rerun `index` (or have `index:watch` automatically rerun), so it is best to run `yarn dev` and `yarn index:watch` at the same time, either using 2 terminal instances or in parallel (`yarn dev & yarn index:watch` on Mac, Linux, and [MS Powershell 7](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4#msi)).
