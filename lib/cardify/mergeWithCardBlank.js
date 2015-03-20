/**
 * Export `mergePictureWithCardBlank`
 */

module.exports = mergePictureWithCardBlank;

/**
 * Import modules
 */

var imageMagick = require("gm"),
    Q = require("q");

/**
 * Merges a picture into a pre-existing card
 * 
 * @param {GraphicsMagic} picture
 * @param {GraphicsMagic} cardBlank
 * 
 * @api public
 * @return {Promise}
 */

function mergePictureWithCardBlank(picture, cardBlank) {
    var pokemonPictureYOffset = "+80",
        pokemonPictureXOffset = "+0",
        internalStream;

  
    function doMerge () {
    
    var cardBoxWidth = 424,
        cardBoxHeight = 256;

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
    
    return Q().then(doMerge).fail(function(err) {console.err(err)});
}
