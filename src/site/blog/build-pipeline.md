---
layout: layouts/post-rsidebar.njk
title: Candy Build Pipeline
headTitlePost: "| Candy"
date: 2019-03-02
mainImageFilename: candy_worms
mainImageTitle: Candy Worms
mainImageAltText: A pile of candy worms
excerpt: custom
customExcerpt: Candy is using Yarn to manage dependencies and Gulp to manage the build process.
metaDescription: Candy is using Yarn to manage dependencies and Gulp to manage the build process.
tags:
    - setup
    - config
    - star
---

Candy is using Yarn to manage dependencies and Gulp to manage the build process.

## The Yarn scripts

The following set of Yarn scripts are defined in the `package.json` file:

| Yarn Command | Description |
| --- | --- |
| yarn start | Build the Eleventy website and serve with a local web server at `http://127.0.0.1:8080` |
| yarn watch | Build the Eleventy website and serve with a local web server with hot reloading at `http://127.0.0.1:8080` |
| yarn watcher | Serve the already built website with a local web server with hot reloading at `http://127.0.0.1:8080` |
| yarn build | Build the Eleventy website |
| yarn serve | Serve the website with a local web server at `http://127.0.0.1:8080` |
| yarn eleventy | Run eleventy to build the destination pages |

During development,  `yarn watch` should be your go-to script.

## Gulp tasks

Candy comes with a few interesting Gulp tasks in `gulpfile.js` that are integrated into the build process:

| Gulp task | Description |
| --- | --- |
| sassy | Sass preprocessing to a single compressed css file  |
| purgecss | Purge any unused css from the final output |
| scripts | Uglify our javascript files into one file and use `pump` to expose errors. |
| copyimg | Copy image files in the `img` source folder to the destination `images` folder unchanged |
| images | Process image files in the `images` source folder to the destination `images` folder unchanged. Images are resized to a set of default pixel widths (200, 400, 800, 1600) while retaining aspect ratio, and then minimized |

These tasks are combined in a few ways to enable the watcher script to determine what build steps need to be redone based on the folder that contains the file that changed ... kind of like lego building blocks.
