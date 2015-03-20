/**
 * Export `wrapUrl`
 */

module.exports = wrapUrl;

/**
 * Import modules
 */

var imageMagick = require("gm");

/**
 * Return a graphicsMagic object from an image url
 *
 * @param {String} image
 * @return {graphicsMagic} 
 * @api public
 */
  
function wrapUrl (image) {
    //returns an imageimageMagick object wrapping the image
    return imageMagick(image).options({ imageMagick: true });
}
