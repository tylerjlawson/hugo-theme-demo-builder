#!/usr/bin/env node

var toml = require("toml");
var concat = require("concat-stream");
var fs = require("fs");
const shell = require("shelljs");

try {
  if (!fs.existsSync("netlify.toml")) {
    console.warn(
      "Missing netlify.toml in exampleSite directory\nFor more info: https://gohugo.io/hosting-and-deployment/hosting-on-netlify/"
    );
  }
} catch (e) {
  console.log("An error occurred when trying to read netlify.toml:", e);
}

fs.createReadStream("../theme.toml", "utf8").pipe(
  concat(function (data) {
    const parsed = toml.parse(data);
    let themeURL = parsed.homepage;
    if (themeURL[themeURL.length - 1] === "/") {
      themeURL = themeURL.substr(0, themeURL.length - 1);
    }
    const themeURLSplit = themeURL.split("/");

    // make sure homepage does not use .git in url
    const themeName = themeURLSplit[themeURLSplit.length - 1].replace(
      ".git",
      ""
    );

    if (!"demosite" in parsed) console.warn("Missing demourl in theme.toml");

    try {
      if (fs.existsSync(`themes/${themeName}`)) {
        console.log("Theme exists.");
      } else {
        shell.exec(`git clone ${themeURL}.git themes/${themeName}`);
      }
    } catch (e) {
      console.log("An error occurred when trying to clone:", e);
    }
    shell.exec("hugo");
  })
);
