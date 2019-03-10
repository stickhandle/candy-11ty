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
Candy makes it easy to create a blog. Using a combination of Nunjuck layout templates, front matter (with logical defaults) and Markdown, your workflow from idea to publish is simple.

## Candy Post Layout

By default, blog posts added to the `site\blog` folder use the `layouts\post.njk` nunjuck template. The `post.njk` template extends `layouts\base.njk` template which defines the basic structure of a Candy page.

The `post.njk` template defines a page with full width header (inluding menu) and footer. The rest of the content, including the main image, article and widgets (similar posts, favourite posts, tags listing) are presented in a container powered by a Bootstrap grid. You can choose to use the `post-rsidebar.njk` layout to add a right-side sidebar to larger screens holding the favourite posts and tag listing widgets.

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

The following table describes the data elements:

| Key | Description |
| --- | ----------- |
| layout | This template will inherit from the base.njk template |
| bodyClass | The `body` element will have the css class `candy-post` applied |
| templateEngineOverride | For pages utilizing this template, we instruct Eleventy to use the Nunjucks and Markdown template engines |
| contentContainerClass | Defines the Bootstrap container class to apply to the `main` element in the generated HTML. Possible values: `container` and `container-fluid`  |

### Level 4 Front Matter - blog item yaml

At the highest level, we have front matter defined in the blog item Markdown file itself. Front matter defined here will override any lower level settings, like in the template or blog.json files. In addition, a handful of variables are only defined here since they would be specific only to this one file. The item front matter could be as simple as defining a `title` and a `date`, or be more involved like this:

``` yaml
---
layout: layouts/post-rsidebar.njk
title: How to add Blog Posts
headTitlePre: "Target Keyword |"
headTitlePost: "| Candy"
date: 2019-03-09
mainImageFilename: candy_assorted2
mainImageExt: png
mainImageTitle: Assortment of Candies
mainImageAltText: An assortment of hard candies
excerpt: custom
customExcerpt: This is the custom excerpt
metaDescription: This is the meta description
tags:
    - config
    - frontmatter
---
```

The following table describes the data elements:

| Key | Required? | Description |
| --- | --- | --- |
| layout | No | Override the `layout` template setting from `blog.json` |
| title | Yes | Define the title of the page. The title is used in the generated `<h1>` tag and meta data for seo `<title>` tag  and open graph `<og:title>` tag. Be aware that the value is truncated in search displays at ~ 60 chars. |
| headTitlePre | No | If present, this value will be prepended to the title value in the generated `<title>` and `<og:title>` tags. It can be useful for seo purposes to pre-pend a desirable keyword. |
| headTitlePost | No | If present, this value will be appended to the title value in the generated `<title>` and `<og:title>` tags. It can be useful for seo purposes to append a desirable keyword. The append can also be used for branding of all search results |
| date | Yes | Represents the publish date. Format: YYYY-MM-DD  |
| mainImageFilename | No | Name of the image file in the `images` directory to use associate with this blog entry. Candy encourages all blog posts to be accompanied by a main image. If this value is present, all other "mainImage*" items are expected. |
| mainImageExt | No | The image filename extension. The default, set in `blog.json` is "jpg". If your image is something else ... like "png" ... declare that here  |
| mainImageTitle | No | Used in the `<img>` tag as the title attribute and in the overlay on the image. Also used as the value for the open graph `<og:image>` meta tag. If not provided, fallback is the mainImageFilename. |
| mainImageAltText | No | Used in the `<img>` tag as the title attribute. If not provided, fallback is the mainImageTitle. |
| excerpt | No | Informs the processor how an excerpt is to be generated. Possible values: auto, comment, custom, none. Defining a value here overrides the default value of "auto" from `blog.json`. The excerpt is used as a post teaser. It is also used as the value for the description and og:description meta tags in the page head if a "metaDescription" element is not provided. |
| customExcerpt | No | If the value for `excerpt` is `custom`, then this value is expected. Provides the author with the ability to define a custom excerpt. |
| metaDescription | No | If provided, this attribute will be used as the value for the description and og:description meta tags in the page head. |
| tags | No | Assign as many tags to this piece of content as desired. This will override the value `untagged` from `blog.json`. The author can also assign the special `star` tag to the post to add it to the favourites list. |

## Pulling It All Together ...

The above is a lot of information, but creating a new post can be super easy. Let's imagine we want a new post called "My New Post". We also have a hero image file (my_hero_image.jpg) to go along with it. Here is what we need to do:

1. Create a new file in the `src\site\blog` folder called  `my-new-post.md`.
2. Add the my_hero_image.jpg image file to the `src\images` folder.
3. Open `my-new-post.md` and add the following front matter:
``` yaml
---
title: My New Post
date: 2019-03-09
mainImageFilename: my_hero_image
---
```
4. Add content to `my-new-post.md` in Markdown format after the front matter.
``` yaml
---
title: My New Post
date: 2019-03-09
mainImageFilename: my_hero_image
---
Here we add our post content in Markdown format.
## An H2 Subtitle
...
```
5. Build with Eleventy (yarn run build) and serve (yarn run serve). Profit! :-)