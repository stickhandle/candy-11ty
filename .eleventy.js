module.exports = function(eleventyConfig) {

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
  eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js") );
  eleventyConfig.addFilter("timestamp", require("./filters/timestamp.js") );
  eleventyConfig.addFilter("squash", require("./filters/squash.js") );
  // date formats
  eleventyConfig.addFilter('formatIsoDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toISODate(); // '2017-08-24'
  });  
  eleventyConfig.addFilter('formatDisplayDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('dd-LLL-yyyy'); // '24-Aug-2017'
  });

  // Create your collections
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
  });
  eleventyConfig.addCollection("tagList", require("./filters/getTagsList"));
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
