# Hugo Theme Demo Builder

This is a small npm package to help build your `exampleSite` directory for a hugo theme demo. This package will clone your theme and run `hugo` for you, so that the `exampleSite` will automatically build with the latest commit from your theme.

[Click here](https://tyler-lawson.com/posts/deploy-hugo-theme-demo-guide/) for a full guide on how to deploy your hugo theme to [Netlify](https://netlify.com) with this package.

## Instructions

```sh
cd exampleSite
yarn add hugo-theme-demo-builder
npm set-script build hugo-theme-demo-builder
```
