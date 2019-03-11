---
layout: layouts/post-rsidebar.njk
title: How to add a Candy Page
headTitlePost: "| Candy"
date: 2019-03-11
mainImageFilename: candy_splash
mainImageTitle: Candy Splash
mainImageAltText: A splash of candies
tags:
    - layouts
    - frontmatter
---
Candy is all set to go when creating *one-off* pages like [About](/about/), [Blog](/blog/) or [Portfolio](/portfolio/). The same scaffolding can be used to create any number of *landing style* pages in your project.

## Candy Page Layout

Pages use the `layouts\page.njk` nunjuck template. The `page.njk` template extends `layouts\base.njk` template which defines the basic structure of a Candy portfolio page.

The `page.njk` template defines a page with full width header (inluding menu) and footer. The rest of the content, including the image is presented in a container powered by a Bootstrap grid.

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

### Level 2 Front Matter - template yaml

Eleventy allows us to define front matter variables as yaml in the template heirarchy. Since Candy pages use the `page.njk` template, the attributes are defined:

``` yaml
---
layout: layouts/base.njk
bodyClass: candy-page
templateEngineOverride: njk, md
contentContainerClass: container
---
```

The following table describes the data elements:

| Key | Description |
| --- | ----------- |
| layout | This template will inherit from the base.njk template |
| bodyClass | The `body` element will have the css class `candy-page` applied |
| templateEngineOverride | For pages utilizing this template, we instruct Eleventy to use the Nunjucks and Markdown template engines |
| contentContainerClass | Defines the Bootstrap container class to apply to the `main` element in the generated HTML. Possible values: `container` and `container-fluid`  |

### Level 3 Front Matter - page item yaml

At the highest level, we have front matter defined in the page item Markdown or Nunjucks file itself. Front matter defined here will override any lower level settings. In addition, a handful of variables are only defined here since they would be specific only to this one file. The item front matter could be as simple as defining a `title`, a `mainImageFilename`, and a `date` ... or be more involved like this:

``` yaml
---
permalink: /blog/
layout: layouts/page.njk
title: How to add a Portfolio Photo
headTitlePre: "Target Keyword |"
headTitlePost: "| Candy"
date: 2019-03-09
mainImageFilename: candy-eggs
mainImageExt: jpg
mainImageSize: 1600
metaDescription: This is the meta description of a candy egg photo
---
```
The following table describes the data elements:

| Key | Required? | Description |
| --- | --- | --- |
| permalink | Yes | Define the url for the page |
| title | Yes | Define the title of the page. The title is used in the generated `<h1>` tag and meta data for seo `<title>` tag  and open graph `<og:title>` tag. Be aware that the value is truncated in search displays at ~ 60 chars. |
| headTitlePre | No | If present, this value will be prepended to the title value in the generated `<title>` and `<og:title>` tags. It can be useful for seo purposes to pre-pend a desirable keyword. |
| headTitlePost | No | If present, this value will be appended to the title value in the generated `<title>` and `<og:title>` tags. It can be useful for seo purposes to append a desirable keyword. The append can also be used for branding of all search results |
| date | Yes | Represents the publish date. Format: YYYY-MM-DD  |
| mainImageFilename | No | Name of the image file in the `images` directory to use associate with this page. If this value is present, all other "mainImage*" items are expected. The mainImage is used for open graph meta data. If it is not provided, the `<og:image>` meta falls back to og-image.jpg. |
| mainImageExt | No | The image filename extension. |
| mainImageSize | No | The image size to use for the `<og:image>` meta. |
| metaDescription | No | If provided, this attribute will be used as the value for the description and `og:description` meta tags in the page head. |

## Pulling It All Together ...

The above is a lot of information, but creating a new Candy page can be super easy. Let's imagine we want to add a new landing page at `/landing-page/` with "my_landing_image.jpg" as the associated image. Here is what we need to do:

1. Create a new file in the `src\` folder called  `my-landing-page.md`.
2. Add the my_landing_image.jpg image file to the `src\images` folder.
3. Open `my-landing-page.md` and add the following front matter:
``` yaml
---
permalink: /landing-page/
title: My New Landing Page
date: 2019-03-09
mainImageFilename: my_landing_image
mainImageExt: jpg
mainImageSize: 1600
metaDescription: This is my new landing page meta
---
```
4. Add content to `my-landing-page.md` in Markdown format after the front matter.
``` yaml
---
permalink: /landing-page/
title: My New Landing Page
date: 2019-03-09
mainImageFilename: my_landing_image
mainImageExt: jpg
mainImageSize: 1600
metaDescription: This is my new landing page meta
---
Here we add our page content in Markdown format.
## An H2 Subtitle
...
```
5. Build with Eleventy (yarn run build) and serve (yarn run serve). Profit! :-) 

The new page will be available at `http://localhost:8080/landing-page/`.


