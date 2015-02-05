var imageMagick = require("gm");


function wrapUrl (imageUrl) {
    //returns an imageimageMagick object wrapping the image
    return imageMagick(imageUrl).options({ imageMagick: true });
}

module.exports = wrapUrl;