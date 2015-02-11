var imageMagick = require("gm"),
    Q = require("q");

function mergePictureWithCardBlank(picture, cardBlank) {
    var pokemonPictureYOffset = "+80",
        pokemonPictureXOffset = "+0",
        internalStream;

  
    function doMerge (cardBlankSize) {
    
    var cardBoxWidth = cardBlankSize.width,
        cardBoxHeight = cardBlankSize.height;

    //merge picture with blank card
    internalStream = cardBlank
                      .composite(picture)
                      .compose("DstOver")
                      .gravity("North")
                      .geometry(cardBoxWidth + "x" + cardBoxHeight + pokemonPictureXOffset + pokemonPictureYOffset)
                      .stream("png");
    
    
    //flatten to remove transparencies
    return imageMagick(internalStream,"card.png").options({ imageMagick: true }).mosaic().stream();  //returns a stream
    };
    
    
    if ("string" !== typeof picture) {throw new Error("The picture must be a valid file path");}
    if ("object" !== typeof cardBlank) {throw new Error("The cardBlank must be a valid file path");}
    
    return Q.ninvoke(cardBlank,"size").then(doMerge);
}

module.exports = mergePictureWithCardBlank;