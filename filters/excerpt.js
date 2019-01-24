module.exports = function(str) {
    var content = new String(str);
    var delimitStart = "<!--excerpt-->";
    var delimitEnd = "<!--end-excerpt-->";
    if (content.includes(delimitStart) && content.includes(delimitEnd)) {
      var startSplit = content.split(delimitStart);
      var excerpt = startSplit[1].split(delimitEnd)
      return excerpt[0];
    }
    return "";
}
  
  