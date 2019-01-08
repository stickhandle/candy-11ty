module.exports = function(collection) {
    let tagSet = new Map();
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
            if (tagSet.has(tag)) {
                cnt = tagSet.get(tag);
                tagSet.set(tag, cnt+1);
            } else {
                tagSet.set(tag, 1);
            }
        }
      }
    });
    //key sort asc
    //return new Map([...tagSet.entries()].sort()); 
    //val sort desc
    return new Map([...tagSet.entries()].sort((a, b) => b[1] - a[1])); 

  };