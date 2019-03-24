---
title: Getting Started with Candy
headTitlePost: "| Candy"
date: 2019-03-01
mainImageFilename: jellybeans
mainImageTitle: Jellybeans
mainImageAltText: Jellybeans
tags:
    - setup
    - eleventy
    - star
excerpt: comment
---
<!--excerpt-->
Candy can be used to as scaffolding to help you get started with a new project. The following steps will get a local version of Eleventy + Candy installed and running.<!--end-excerpt--> At that point it's up to you and your imagination!

## Install NodeJs and NPM

Download and run the installation from [nodejs.org](https://nodejs.org/en/). 

## Install graphicsmagick

Candy uses graphicsmagick to resize and optimize images via its gulp build process. 

To install [graphicsmagick](http://www.graphicsmagick.org) locally for development, I would recommend using a package manager. 
+ For Mac users `brew install graphicsmagick` would do the trick! 
+ Windows users should use [Chocolatey](https://chocolatey.org/) to manage dependencies ... once installed, open a shell window and issue a simple `choco install graphicsmagick` command. Done.

## Clone the Candy Repo from Github

Assuming you have git installed locally, open a shell window and run:

``` bash
git clone https://github.com/stickhandle/candy-11ty.git
```

Once downloaded, cd into the candy-11ty folder.

## Install Eleventy and Candy

From the `candy-11ty` folder, install all dependencies:

``` bash
yarn install
```

## Build & run your local Candy website

Pick your yarn command, open your browser and you're off to the races!

| Yarn Command | Description |
| --- | --- |
| yarn start | Build the Eleventy website and serve with a local web server at `http://127.0.0.1:8080` |
| yarn watch | Build the Eleventy website and serve with a local web server with hot reloading at `http://127.0.0.1:8080` |
| yarn build | Build the Eleventy website |
| yarn serve | Serve the website with a local web server at `http://127.0.0.1:8080` |

## Start Customizing

Learn all about Eleventy by reading the [official docs](https://www.11ty.io/docs/).




