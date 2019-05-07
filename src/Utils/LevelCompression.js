const LevelCompression = (function(){
  const testLevelText = `[{"id":6,"name":"Burger","map":[[false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,{"width":1,"hp":5,"density":1,"type":"basic","row":3,"col":3,"color":"rgba(128, 114, 76)"},false,{"width":1,"hp":5,"density":1,"type":"basic","row":3,"col":5,"color":"rgba(145, 131, 93)"},false,false,false,false,false,false],[false,false,false,{"width":1,"hp":5,"density":1,"type":"basic","row":4,"col":3,"color":"rgba(145, 131, 93)"},{"width":1,"hp":5,"density":1,"type":"basic","row":4,"col":4,"color":"rgba(128, 114, 76)"},{"width":1,"hp":5,"density":1,"type":"basic","row":4,"col":5,"color":"rgba(145, 131, 93)"},false,false,{"width":1,"hp":5,"density":1,"type":"strong","row":4,"col":8,"color":"rgba(219, 206, 152)"},false,false,false],[false,false,{"width":1,"hp":5,"density":1,"type":"basic","row":5,"col":2,"color":"rgb`;
  
  const conversionKeys = {
    '{"id":' : `&`,
    ',"name":' : `~`,
    ',"map":[[' : `?`,
    'false,' : `#`,
    '{"width":1,"hp":5,"density":1,"type":"basic","row":' : `$`,
    '{"width":1,"hp":5,"density":1,"type":"strong","row":' : `@`,
    '{"width":1,"hp":5,"density":1,"type":"healer","row":' : `;`,
    ',"col":' : `!`,
    ',"color":"rgba(' : `^`,
    ')"},' : `*`
  }

  const regexpKeys = {
    '{"id":' : new RegExp('\{"id":', 'g'),
    ',"name":' : new RegExp(',"name":', 'g'),
    ',"map":[[' : new RegExp(',"map":\\[\\[', 'g'),
    'false,' : new RegExp('false,', 'g'),
    '{"width":1,"hp":5,"density":1,"type":"basic","row":' : new RegExp('\{"width":1,"hp":5,"density":1,"type":"basic","row":', 'g'),
    '{"width":1,"hp":5,"density":1,"type":"strong","row":' : new RegExp('\{"width":1,"hp":5,"density":1,"type":"strong","row":', 'g'),
    '{"width":1,"hp":5,"density":1,"type":"healer","row":' : new RegExp('\{"width":1,"hp":5,"density":1,"type":"healer","row":', 'g'),
    ',"col":' : new RegExp(',"col":', 'g'),
    ',"color":"rgba(' : new RegExp(',"color":"rgba\\(', 'g'),
    ')"},' : new RegExp('\\)"\},', 'g')
  }

  const regexpProps = {
    '&' : new RegExp(`\\&`, 'g'),
    '~' : new RegExp(`~`, 'g'),
    '?' : new RegExp(`\\?`, 'g'),
    '#' : new RegExp(`#`, 'g'),
    '$' : new RegExp(`\\$`, 'g'),
    '@' : new RegExp(`@`, 'g'),
    ';' : new RegExp(`;`, 'g'),
    '!' : new RegExp(`!`, 'g'),
    '^' : new RegExp(`\\^`, 'g'),
    '*' : new RegExp(`\\*`, 'g')
  }

  return {
    compressLevelText: function(text) {
      let newText = text;
      
      Object.entries(conversionKeys).forEach(key => {
        const keyRegExp = regexpKeys[key[0]];
        console.log(keyRegExp);
        
        const filteredText = newText.replace(keyRegExp, key[1]);
        console.log(filteredText);
        
        newText = filteredText;
      });
      
      return newText;
    },

    decompressLevelText: function(text) {
      let newText = text;

      newText = newText.replace(/\\/g, '');
      Object.entries(conversionKeys).forEach(key => {
        
        const keyRegExp = regexpProps[key[1]];
        const filteredText = newText.replace(keyRegExp, key[0]);
      
        newText = filteredText;
      });

      return newText;
    },

    getTestText: function() {
      
      return testLevelText;
    }
  }
}());


export default LevelCompression;