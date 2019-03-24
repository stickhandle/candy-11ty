# Candy

Candy is a quick-start scaffold for building sites. It's Eleventy with sugar on top.

## Sweet Extras

| 🍫 Delicious Build Pipeline | 🍬 Yummy Display Goodies | 🍭 Candy Custom Treats |
| --- | --- | --- |
| Yarn | Sass | Blog and Portfolio ready |
| Gulp | Bootstrap 4 | Custom Related Posts, Favorites and Tag List widgets |
| Markdown-it | JQuery 3.3 (slim) | Custom tags page |
| Nunjucks templates | Google fonts | Custom filters |
| Image pre-processing | Font Awesome | Ready for RSS |
| JS and CSS minification | PrismJS | SEO Optimizations |

### 🍫 Delicious Build Pipeline

- Yarn
- Gulp
- Markdown-it
- Nunjucks templates
- Image pre-processing and minification
- JS and CSS minification

### 🍬 Yummy Display Goodies

- Sass
- Bootstrap 4
- JQuery 3.3 (slim)
- Google fonts + Font Awesome
- PrismJS

### 🍭 Candy Custom Treats

- Blog and Portfolio ready
- Custom Related Posts, Favorites and Tag List widgets
- Custom tags page
- Custom filters
- Ready for RSS
- SEO Optimizations

## Quick Start Instructions

Use Candy as a project starter for a new project. The following steps will get a local version of Eleventy + Candy installed and running. At that point it's up to you and your imagination!

### Install NodeJs and NPM

Download and run the installation from [nodejs.org](https://nodejs.org/en/). 

### Install graphicsmagick

Candy uses graphicsmagick to resize and optimize images via its gulp build process. 

To install [graphicsmagick](http://www.graphicsmagick.org) locally for development, I would recommend using a package manager. 
+ For Mac users `brew install graphicsmagick` would do the trick! 
+ Windows users should use [Chocolatey](https://chocolatey.org/) to manage dependencies ... once installed, open a shell window and issue a simple `choco install graphicsmagick` command. Done.

### Clone the Candy Repo from Github

Assuming you have git installed locally, open a shell window and run:

```
git clone https://github.com/stickhandle/candy-11ty.git
```

Once downloaded, cd into the `candy-11ty` folder.

### Install Eleventy and Candy

From the `candy-11ty` folder, install all dependencies:

``` bash
yarn install
```

### Build & run your local Candy website

Pick your yarn command, open your browser and you're off to the races!

| Yarn Command | Description |
| --- | --- |
| yarn start | Build the Eleventy website and serve with a local web server at `http://127.0.0.1:8080` |
| yarn watch | Build the Eleventy website and serve with a local web server with hot reloading at `http://127.0.0.1:8080` |
| yarn build | Build the Eleventy website |
| yarn serve | Serve the website with a local web server at `http://127.0.0.1:8080` |

### Start Customizing

Learn all about Eleventy by reading the [official docs](https://www.11ty.io/docs/). Learn more about Candy from your local [About](http://localhost:8080/about/) page or on the sample site [here](https://candy-11ty.netlify.com/about/).

## Netlify Instructions

To get your own instance of this 11ty starter project cloned and deploying to Netlify very quickly, just click the button below and follow the instructions.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/philhawksworth/eleventyone)


## Wait, what happens when I click that button?

Good question. Here's what it will do...

1. Netlify will clone the git repository of this project into your Github account. It will be asking for permission to add the repo for you.
2. We'll create a new site for you in Netlify, and configure it to use your shiny new repo. Right away you'll be able to deploy changes simply by pushing changes to your repo.
3. That's it really.
