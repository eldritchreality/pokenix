/**
 * Export `writeOut`
 */
module.exports = writeOut;

/**
 * Import modules
 */

var fs = require("fs");

/**
 * Writes the stream to a specified output folder
 * 
 * @param {String} outputFolder
 * @param {Stream} pictureStream
 * 
 * @api public
 */

function writeOut(outputFolder,pictureStream) {
            var outputFilePath = outputFolder + "complete_card.png";
            var outputStream = fs.createWriteStream(outputFilePath);
    
            console.log("Writing Card to:",outputFilePath);
               
            outputStream.on("finish", function() {
                console.log("Card Written");
            });
            pictureStream.pipe(outputStream);
}
