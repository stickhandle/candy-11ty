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

  //blog posts in create order
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md");
  });
  //blog posts in reverse create order - newest first
  eleventyConfig.addCollection("stsop", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  }); 
  //portfolio photos in create order 
  eleventyConfig.addCollection("photos", function(collection) {
    return collection.getFilteredByGlob("src/site/portfolio/*.md");
  });  
  //portfolio photos in reverse create order - newest first
  eleventyConfig.addCollection("sotohp", function(collection) {
    return collection.getFilteredByGlob("src/site/portfolio/*.md").reverse();
  });
  //posts or photos tagged star in reverse create order - newest first
  eleventyConfig.addCollection("stars", function(collection) {
    return collection.getFilteredByTag("star").reverse();
  });    
  //list of tags with count per tag
  eleventyConfig.addCollection("tagList", require("./filters/tagcounter"));
  //list of posts per tag
  eleventyConfig.addCollection("tagListPosts", require("./filters/taglist"));


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
