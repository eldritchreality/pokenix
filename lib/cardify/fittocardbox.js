var Q = require("q");

function fitToCardBox(image,blank) {
    
   var paddingWidth = 50,
        paddingHeight = 30;
    
   return Q.ninvoke(blank,"size").then(function(blankSize) {
        return image.resize(blankSize.width-paddingWidth, blankSize.height-paddingHeight);
    });
}

module.exports = fitToCardBox;