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
| includestars | boolean to indicate if posts tagged `star` shown as <i class="far fa-star"> should be given special preference |

The filter will iterate over all posts (except noturl) and determine a "match score" against the current post. For each common tag the match the score is incremented by +2. If "includestars" is true, then the match score is incremented an additiional +1 if the compareTo post is tagged "star". 

A set of posts with the highest match score containing `maxcount` items is returned.

## Favourite Posts

This is a simple filter on posts tagged as `star` and denoted by <i class="far fa-star"></i>. Applies to both Blog and Portfolio items.

Favourite posts can be displayed by including either the `star-list-col.njk` or `star-list-row.njk` nunjuck template. The "-col" version is meant to display the thumbnails in a column (like in a sidebar), while "-row" shows them side-by-side in a Bootstrap row.

## Tag List with Counts

Candy incorporates a sort of "tag cloud" which can be used as a widget in a sidebar by including `tag-list-col.njk` or in a full width page with `tag-list-row.njk`. This include will display a list of all tags in the project with a count of the number of blog or portfolio items share the tag. 

## Tags Page

All tags used in the project are listed on the [tags page](/tags/) along with usage counts. Furthermore, the tags (in this list, as well as in all other pages) link directly to a `/tags/#tagName` hashtag target in tags page. At this target, we list thumbnails with excerpts of each post or photo that carries that tag.  

## SEO Optimizations

The Candy project contains a few basic elements designed for helping search engines find and evaluate content.

### Generated sitemap.xml

Although crawlers can usually discover most of the well inter-linked site, a sitemap can improve the crawling of the site.^[<a href="https://five.agency/seo-guide-for-web-developers-2017/#2b37">Five Agency Seo Guide for Developers</a>]

Candy produces a basic (sitemap.xml)[/sitemap.xml] with the `sitemap.xml.njk` template. By default all site content will be included in the sitemap. Generated pages can be excluded by specifying `excludeFromSitemap: true` in the page front matter yaml.

### Generated robots.txt

You can learn all about `robots.txt` at [Moz.com](https://moz.com/learn/seo/robotstxt). Candy help by creating a very basic robots.txt file from `robots.txt.njk` template.

### Page meta data tags

The `<title>...</title>` tag^[<a href="https://moz.com/learn/seo/title-tag">Moz SEO Guide - Title tag</a>] and `<meta name="description" ...>` tag^[<a href="https://moz.com/learn/seo/meta-description">Moz SEO Guide - Meta Description tag</a>] still have an important role in search. Candy helps.

#### Title tag

By default Candy will produce a `<title>...</title>` tag in the head of each generated document using the following rules:
1. Each page extending `base.njk` must define a title value in front matter yaml.
2. If a `headTitlePre` attribute is added to the front matter, then this text will be pre-pended to title. It is recommended that this value should represent a target keyword for the page and a dash or pipe separator.
3. If a `headTitlePost` attribute is added to the front matter, then this text will be appended to title. It is recommended that this value should represent a branding opportunity by appending something like " | Candy" to all pages.
4. The pre+title+post value is truncated to 60 chars.

#### Meta Description tag

By default Candy will produce a `<meta name="description" content="..." />` tag where the content value will be derived from:
1. If page front matter yaml specifies a `metaDescription: xyz` then `xyz` will be used, else ...
2. If an excerpt can be derived it will be used, else ...
3. Page title will be used

In either case, the content value will be stripped of html and truncated to 280 chars.

### Open Graph meta data tags

The [Open Graph Protocol](http://ogp.me/) specifies a number of tags to assist with social content sharing. Candy has these built-in:

| Meta tag Name | Description |
| --- | --- |
| og:site_name | Value from `metadata.json` file "title" attribute |
| og:title | Value is generated with the same algorithm as the Title tag (described above) |
| og:description | Value is generated with the same algorithm as the Meta Description tag (described above) |
| og:url | Value is provided per page by Eleventy as absolutePostUrl |
| og:image | If the page front matter defines a mainImageFilename, then it is used. Otherwise, the site default [og-image](/images/og-image.jpg) is used |
| og:image:width | If the page front matter defines a mainImageFilename and a mainImageSize, then the mainImageSize value is used. If the site default og-image.jpg is used, then the value is "279" |
| og:image:height | If the page front matter defines a mainImageFilename, then this value is not known and omitted. If the site default og-image.jpg is used, then the value is "279" |

### Twitter meta tags

Twitter will honour Open Graph tags when present, but we do want to add a few meta tags spefically for twitter:

| Meta tag Name | Description |
| --- | --- |
| twitter:card | Value "summary_large_image" instruct twitter to share a large image from og:image |
| twitter:site | Value from `metadata.json` file "twitter" attribute. Represents the site's twitter handle |
| twitter:creator | Value from `metadata.json` file "author.twitter" attribute. Represents the author's twitter handle |







