---
title: A Post Page
date: 2018-03-21
tags:
  - ssg
  - eleventy
  - jamstack
mainImageFilename: jellybeans
mainImageTitle: Sea of Jellybeans
---

There's not much here in the sample post page. Better get to work.

## An H2 Element

The common front-matter data for all of the files in the posts section are abstracted into a `posts.json` file so that we don't need to repeat that on every file. Handy.

### An H3 Element

It looks like this:

``` json
{
  "layout" : "layouts/post.md",
  "tags" : "post",
  "templateEngineOverride": "njk,md"
}
```

Adding syntax highlighting from PrismJS like this:

``` js
function myFunction() {
  return true;
}
```

