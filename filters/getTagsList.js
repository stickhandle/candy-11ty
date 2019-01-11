module.exports = function(collection) {
    let tagCountMap = new Map();
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
            if (tagCountMap.has(tag)) {
                cnt = tagCountMap.get(tag);
                tagCountMap.set(tag, cnt+1);
            } else {
                tagCountMap.set(tag, 1);
            }
        }
      }
    });
    //key sort asc
    //return new Map([...tagCountMap.entries()].sort()); 
    //val sort desc
    return new Map([...tagCountMap.entries()].sort((a, b) => b[1] - a[1])); 

  };