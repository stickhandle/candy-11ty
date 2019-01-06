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
 // date format for sitemap
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  // Create your collections
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/site/blog/*.md").reverse();
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
