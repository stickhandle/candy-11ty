---
title: How to add a Portfolio Photo
headTitlePost: "| Candy"
date: 2019-03-10
mainImageFilename: candy_bg_egg
mainImageTitle: Eggs over Candy
mainImageAltText: Candy eggs lying on a pile of candy
tags:
    - config
    - layouts
    - frontmatter
---
Candy is ready out-of-the-box to create a simple portfolio of photos. Using Nunjuck layout templates and front matter (with logical defaults) in Markdown files, we can add and tag photos with ease.

## Candy Photo Layout

By default, portfolio posts added to the `site\portfolio` folder use the `layouts\photo.njk` nunjuck template. The `photo.njk` template extends `layouts\base.njk` template which defines the basic structure of a Candy portfolio page.

The `photo.njk` template defines a page with full width header (inluding menu) and footer. The rest of the content, including the image is presented in a container powered by a Bootstrap grid.

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

The individual data items are self-explanatory. Obviously, you will want to update this file with your own site and user values. The values from this file are used in the `HEAD` of the generated HTML documents to define metadata for seo and open graph.

### Level 2 Front Matter - portfolio.json

All files generated from the `site\portfolio` folder have access to `site\portfolio\portfolio.json` data. The Candy sample looks like this:

``` json
{
  "layout" : "layouts/photo.njk",
  "tags" : ["untagged"],
  "mainImageExt" : "jpg",
  "mainImageSize" : "1600",
  "medImageSize" : "800",
  "thumbImageSize" : "400",
  "tinyImageSize" : "200"
}
```

The `portfolio.json` file provide a sane set of default front matter for all the Markdown files in the `portfolio` folder. The following table defines the elements:

| Key | Description |
| --- | ----------- |
| layout | Layout template for generated pages |
| tags | Default set of tags to be used for photos |
| mainImageExt | Filename extension for the post main image |
| mainImageSize | Generated main image file size (px width) ^[The build pipeline resizes each image in the image folder to predefined set of sizes: 1600, 800, 400, 200] |
| medImageSize | Generated medium image file size (px width) |
| thumbImageSize | Generated thumb image file size (px width) |
| tinyImageSize | Generated tiny image file size (px width) |

### Level 3 Front Matter - template yaml

Eleventy allows us to define front matter variables as yaml in the template heirarchy. Since all portfolio photo items are defined in portfolio.json to use the `photo.njk` template, the attributes are defined:

``` yaml
---
layout: layouts/base.njk
bodyClass: candy-photo
templateEngineOverride: njk, md
contentContainerClass: container
---
```

The following table describes the data elements:

| Key | Description |
| --- | ----------- |
| layout | This template will inherit from the base.njk template |
| bodyClass | The `body` element will have the css class `candy-photo` applied |
| templateEngineOverride | For pages utilizing this template, we instruct Eleventy to use the Nunjucks and Markdown template engines |
| contentContainerClass | Defines the Bootstrap container class to apply to the `main` element in the generated HTML. Possible values: `container` and `container-fluid`  |

### Level 4 Front Matter - photo item yaml

At the highest level, we have front matter defined in the photo item Markdown file itself. Front matter defined here will override any lower level settings, like in the template or portfolio.json files. In addition, a handful of variables are only defined here since they would be specific only to this one file. The item front matter could be as simple as defining a `title`, a `mainImageFilename`, and a `date` ... or be more involved like this:

``` yaml
---
title: How to add a Portfolio Photo
headTitlePre: "Target Keyword |"
headTitlePost: "| Candy"
date: 2019-03-09
mainImageFilename: candy-eggs
mainImageExt: png
mainImageTitle: Eggs over Candy
mainImageAltText: Candy eggs lying on a pile of candy
metaDescription: This is the meta description of a candy egg photo
tags:
    - candy
    - eggs
---
```
The following table describes the data elements:

| Key | Required? | Description |
| --- | --- | --- |
| title | Yes | Define the title of the page. The title is used in the generated `<h1>` tag and meta data for seo `<title>` tag  and open graph `<og:title>` tag. Be aware that the value is truncated in search displays at ~ 60 chars. |
| headTitlePre | No | If present, this value will be prepended to the title value in the generated `<title>` and `<og:title>` tags. It can be useful for seo purposes to pre-pend a desirable keyword. |
| headTitlePost | No | If present, this value will be appended to the title value in the generated `<title>` and `<og:title>` tags. It can be useful for seo purposes to append a desirable keyword. The append can also be used for branding of all search results |
| date | Yes | Represents the publish date. Format: YYYY-MM-DD  |
| mainImageFilename | No | Name of the image file in the `images` directory to use associate with this blog entry. Candy encourages all blog posts to be accompanied by a main image. If this value is present, all other "mainImage*" items are expected. The mainImage is used for open graph meta data as well as on the page itself. If it is not provided, the `<og:image>` meta falls back to og-image.jpg. |
| mainImageExt | No | The image filename extension. The default, set in `portfolio.json` is "jpg". If your image is something else ... like "png" ... declare that here  |
| mainImageTitle | No | Used in the `<img>` tag as the title attribute and in the overlay on the image. Also used as the value for the open graph `<og:image>` meta tag. If not provided, fallback is the mainImageFilename. |
| mainImageAltText | No | Used in the `<img>` tag as the title attribute. If not provided, fallback is the mainImageTitle. |
| metaDescription | No | If provided, this attribute will be used as the value for the description and og:description meta tags in the page head. |
| tags | No | Assign as many tags to this piece of content as desired. This will override the value `untagged` from `blog.json`. The author can also assign the special `star` tag to the post to add it to the favourites list. |

## Pulling It All Together ...

The above is a lot of information, but creating a new portfolio photo entry can be super easy. Let's imagine we want to add a new photo file, "my_new_photo.jpg" as a portfolio item. Here is what we need to do:

1. Create a new file in the `src\site\portfolio` folder called  `my-new-photo.md`.
2. Add the my_new_photo.jpg image file to the `src\images` folder.
3. Open `my-new-post.md` and add the following front matter:
``` yaml
---
title: My New Photo
date: 2019-03-09
mainImageFilename: my_new_photo
tags:
    - newphoto
---
```
4. Build with Eleventy (yarn run build) and serve (yarn run serve). Profit! :-) 

The new photo will be added to the `http://localhost:8080/portfolio/` page, `http://localhost:8080/tags/#newphoto` page, and its own page at `http://localhost:8080/portfolio/my-new-photo/`.