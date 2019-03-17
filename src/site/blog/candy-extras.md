---
title: Candy Extras
headTitlePost: "| Candy"
date: 2019-03-16
mainImageFilename: candy_bowls
mainImageTitle: Bowls of Candy
mainImageAltText:  Bowls of Candy
excerpt: comment
tags:
    - config
    - eleventy
---
<!--excerpt-->
Candy comes with a bunch of little extras.<!--end-excerpt-->

## Bootstrap and JQuery and Friends

Candy comes with CSS and JS loaded from cdn sources baked in, ready to use. This includes minimized versions of Bootstrap 4 (CSS and JS), JQuery 3.3 (slim), Font Awesome, Google Fonts, Lodash, Parallax, and PopperJS.

Candy relies pretty heavily on Bootstrap CSS, but the others are optional. Don't want them? Just remove the import in `layouts/base.njk`. 

## PrismJS for Syntax Highlighting

Candy uses [PrismJS](https://prismjs.com/) for syntax highlighting of code blocks. It uses a customized version of [Sulphurpool Light](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-base16-ateliersulphurpool.light.css) by Bram de Haan. For more, see `src/scss/_prism-syntax.scss`.

## Markdown-it Emoji and Footnote support

Eleventy uses markdown-it to process Markdown files. Markdown-it supports plugins, and we include emoji and footnote support in our `eleventy.js` config:

``` js
let markdownIt = require("markdown-it");
let markdownItEmoji = require("markdown-it-emoji");
let markdownItFootnote = require("markdown-it-footnote");
let options = {
  html: true
};
let markdownLib = markdownIt(options).use(markdownItEmoji).use(markdownItFootnote);
eleventyConfig.setLibrary("md", markdownLib);
```

## Candy Build Pipeline

Candy uses Yarn to manage dependencies and Gulp to manage the build process. Read more about the about the pipeline [here](/blog/candy-build-pipeline).

## Sass

A Gulp build task processes the `src/*.scss` files into a single minimized `dist/css/main.css` file. All colours and fonts are kept as variables in `src/_variables.scss`. Modifying this file alone can go a long way to customizing your site. 

## Generated RSS feed.xml

Candy produces a [feed.xml](/feed.xml) for RSS. The nunjuck template is located at `src/site/feed/feed.njk`. Note that Candy uses the collections.stsop filter from `eleventy.js` config as the source the generated feed.xml, 

## Similar Posts

The custom nunjucks filter called "similar" has been created to generate a "Related Posts" section. The custom filter can be inspected at `filters/similar.js`.

The usage in nunjuck template looks like this: `for simpost in collections.posts | similar(tags, page.url, 2, true) `, where the inputs represent:

| Attribute | Description |
| --- | --- |
| sametags | set of tags for the current post |
| noturl | the current url, which should be excluded from the matching process |
| maxcount | the max number of similar posts to return | 
| includestars | boolean to indicate if posts tagged `star` should be given special preference |

The filter will iterate over all posts (except noturl) and determine a "match score" against the current post. For each common tag the match the score is incremented by +2. If "includestars" is true, then the match score is incremented an additiional +1 if the compareTo post is tagged "star". 

A set of posts with the highest match score containing `maxcount` items is returned.

## Favourite Posts

This is a simple filter on posts tagged as `star`.

## Tag List with Counts

## SEO Optimizations

### Generated sitemap.xml

### Generated robots.txt

### Page meta data tags

### Open Graph meta data tags





