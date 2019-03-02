module.exports = function(eleventyConfig) {
  //mardown-it
  let markdownIt = require("markdown-it");
  let markdownItEmoji = require("markdown-it-emoji");
  let markdownItFootnote = require("markdown-it-footnote");
  let options = {
    html: true
  };
  let markdownLib = markdownIt(options).use(markdownItEmoji).use(markdownItFootnote);
  
  eleventyConfig.setLibrary("md", markdownLib);
  // syntax highlighting plugin
  const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlightPlugin, {
    templateFormats: "md"
  });

  // RSS plugin
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  eleventyConfig.addPlugin(pluginRss);

  // Add filters
  const { DateTime } = require("luxon");
  eleventyConfig.addFilter("excerpt", require("./filters/excerpt.js") );
  eleventyConfig.addFilter("similar", require("./filters/similar.js") );
  // date formats 
  eleventyConfig.addFilter('formatIsoDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISODate(); // '2017-08-24'
  });  
  eleventyConfig.addFilter('formatDisplayDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('dd-LLL-yyyy'); // '24-Aug-2017'
  });

  // Create your collections
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });  
  eleventyConfig.addCollection("photos", function(collection) {
    return collection.getFilteredByGlob("src/site/portfolio/*.md").reverse();
  });
  eleventyConfig.addCollection("tagList", require("./filters/tagcounter"));
  eleventyConfig.addCollection("tagListPosts", require("./filters/taglist"));
  eleventyConfig.addCollection("stars", function(collection) {
    return collection.getFilteredByTag("star").reverse();
  });  

  return {
    dir: {
      input: "src/site",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    templateFormats : ["njk", "md", "html"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    "dataTemplateEngine": "njk",
    passthroughFileCopy: true
  };

};
