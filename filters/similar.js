module.exports = function(collection, sametags, noturl, maxcount) {
    let scored = new Set();
    let simtags = sametags;
    if( typeof simtags === "string" ) {
      simtags = [simtags];
    }
    simtags = simtags.filter(function(tag) {
        switch(tag) {
          case "all":
          case "nav":
          case "post":
          case "photo":
          case "posts":
          case "star":
          case "untagged":
            return false;
        }
        return true;
    });

    collection.forEach(function(item) {
      let score = 0;
      if (item.url != noturl) {
        let itemtags = item.data.tags;
        if( typeof itemtags === "string" ) {
          itemtags = [itemtags];
        }
        itemtags.forEach(function(itemtag) {
          if( itemtag == "star") {
            score = score+1;
          } else {
            if( simtags.indexOf(itemtag) > -1 ) {
              score = score+2;
            }
          }
        });
        if (score > 0) {
          item.similarScore = score;
          scored.add(item);
        }
      }
    });
    scoredArr = [...scored].sort((a, b) => b.similarScore - a.similarScore);
    return new Set(scoredArr.slice(0, maxcount-1));
  };