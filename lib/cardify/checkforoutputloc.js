/**
 * Export `createOutputFolder`
 */
module.exports = createOutputFolder;

/**
 * Import modules
 */

var fs = require("fs");

/**
 * Checks to see if the folder exists, and creates it if it doesn't
 * 
 * @param {String} folder
 * @api public
 */

function createOutputFolder (folder) {
    
    if ("string" !== typeof folder) {throw new Error(folder + ' must be a valid path');}
    if (!fs.existsSync(folder)) {fs.mkdirSync(folder)};
    
}
