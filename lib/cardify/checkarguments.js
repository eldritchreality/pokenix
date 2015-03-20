/**
 * Export `checkArguments`
 */

module.exports = checkArguments;

/**
 * Import modules
 */

var fs = require("fs");

/**
 * Checks if the passed in files actually exist on the filesystem;
 * 
 * @param {String} image
 * @param {String} blank
 * 
 * @return {Boolean}
 * @api public
 */

function checkArguments(image,blank) {
    var imageExists = false,
        blankExists = false;
    
    imageExists = fs.existsSync(image);
    blankExists = fs.existsSync(blank);
    
    if (!imageExists) {throw new Error("The image file " + image + " doesn't exist");}
    if (!blankExists) {throw new Error("The card blank file " + blank + " doesn't exist");}
    
    return imageExists && blankExists;
    
}
