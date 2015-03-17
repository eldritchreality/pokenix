var imageMagick = require("gm");


function wrapUrl (image) {
    //returns an imageimageMagick object wrapping the image
    return imageMagick(image).options({ imageMagick: true });
}

module.exports = wrapUrl;