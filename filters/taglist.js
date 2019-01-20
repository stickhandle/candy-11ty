module.exports = function(collection) {
    let tagMap = new Map();
    collection.getAllSorted().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;
        if( typeof tags === "string" ) {
          tags = [tags];
        }
  
        tags = tags.filter(function(item) {
          switch(item) {
            case "all":
            case "nav":
            case "post":
            case "photo":
            case "posts":
              return false;
          }
  
          return true;
        });
  
        for (const tag of tags) {
            if (!tagMap.has(tag)) {
                tagMap.set(tag, collection.getFilteredByTag(tag).reverse());
            }
        }
      }
    });
    //key sort asc
    return new Map([...tagMap.entries()].sort()); 
 
  };