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
            case "posts":
              return false;
          }
  
          return true;
        });
  
        for (const tag of tags) {
            if (tagMap.has(tag)) {
                cnt = tagMap.get(tag);
                tagMap.set(tag, cnt+1);
            } else {
                tagMap.set(tag, 1);
            }
        }
      }
    });
    //key sort asc
    return new Map([...tagMap.entries()].sort()); 
 
  };