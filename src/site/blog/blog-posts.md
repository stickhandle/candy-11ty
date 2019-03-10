---
title: How to add Blog Posts
date: 2019-03-09
mainImageFilename: candy_assorted2
mainImageTitle: Assortment of Candies
mainImageAltText: An assortment of hard candies
tags:
    - config
    - frontmatter
excerpt: none
---
Candy makes it easy to create a blog. Using a combination of front-matter, with logical defaults, and Markdown, your workflow from idea to publish is simple.

## Candy Post Template

By default, blog posts added to the `site\blog` folder use the `layouts\post.njk` nunjuck template. The `post.njk` template extends `layouts\base.njk` template which defines the basic structure of a Candy page.

## Candy Front Matter

Like any Eleventy based project, Candy uses a series of files to set front matter for use in generation of web pages. The front matter is defined in a heirarchy where each successive level can override the values.

### Level 1 Front Matter - metadata.json

The file `site\_data\metadata.json` defines a series of values that are be used site-wide and available to the generation of all pages. The sample file looks like this: 

``` json
{
  "title": "Candy",
  "url": "https://candy-11ty.netlify.com/",
  "sitemap": "https://candy-11ty.netlify.com/sitemap.xml",
  "twitter": "@wernersiemens",
  "feed": {
    "subtitle": "Candy is a quick-start scaffold for building sites. It's Eleventy with sugar on top.",
    "filename": "feed.xml",
    "path": "/feed.xml",
    "url": "https://candy-11ty.netlify.com/feed.xml",
    "id": "https://candy-11ty.netlify.com/"
  },
  "author": {
    "name": "Werner Siemens",
    "email": "stickhandle@gmail.com",
    "twitter": "@wernersiemens"
  }
}
```

The individual data items are self-explanatory. Obviously, you will want to update this file with your own site and user values. The values from this file are used in the `HEAD` of the generated HTML documents to define metadata.

### Level 2 Front Matter - blog.json

All files generated from the `site\blog` folder have access to `site\blog\blog.json` data. The Candy sample looks like this:

``` json
{
  "layout" : "layouts/post.njk",
  "tags" : ["untagged"],
  "mainImageExt" : "jpg",
  "mainImageSize" : "1600",
  "medImageSize" : "800",
  "thumbImageSize" : "400",
  "tinyImageSize" : "200",
  "excerpt": "auto",
  "similarScore" : 0
}
```

The `blog.json` file provide a sane set of default front matter for all the Markdown files in the `blog` folder. The following table defines the elements:

| Key | Description |
| --- | ----------- |
| layout | Layout template for generated pages |
| tags | Default set of tags to be used for posts |
| mainImageExt | Filename extension for the post main image |
| mainImageSize | Generated main image file size (px width) ^[The build pipeline resizes each image in the image folder to predefined set of sizes: 1600, 800, 400, 200] |
| medImageSize | Generated medium image file size (px width) |
| thumbImageSize | Generated thumb image file size (px width) |
| tinyImageSize | Generated tiny image file size (px width) |
| excerpt | Informs the processor how an excerpt is to be generated. Possible values: auto, comment, custom, none  |
| similarScore | Defines the variable and provides a start value when calculating similar posts based on tags |

#### Defining the Excerpt

The `excerpt` element can have the following possible values:

| Value | Description |
| ----- | ----------- |
| auto | The post will be stripped of html tags and the first 150 chars will become the excerpt |
| comment | The excerpt can be defined by wrapping the content to be used between `<!--excerpt-->` and `<!--end-excerpt-->` html comments |
| custom | Post pages will define a `customExcerpt` element |
| none | No excerpt is defined |

### Level 3 Front Matter - template yaml

Eleventy allows us to define front matter variables as yaml in the template heirarchy. Since all blog post items are defined in blog.json to use the `post.njk` template, the attributes are defined:

``` yaml
---
layout: layouts/base.njk
bodyClass: candy-post
templateEngineOverride: njk, md
contentContainerClass: container
---
```

| Key | Description |
| --- | ----------- |
| layout | This template will inherit from the base.njk template |
| bodyClass | The `body` element will have the css class `candy-post` applied |
| templateEngineOverride | For pages utilizing this template, we instruct Eleventy to use the Nunjucks and Markdown template engines |
| contentContainerClass | Defines the Bootstrap container class to apply to the `main` element in the generated HTML. Possible values: `container` and `container-fluid`  |

### Level 4 Front Matter - blog item yaml



``` yaml
---
title: How to add Blog Posts
date: 2019-03-09
mainImageFilename: candy_assorted2
mainImageTitle: Assortment of Candies
mainImageAltText: An assortment of hard candies
tags:
    - config
    - frontmatter
excerpt: none
---
```