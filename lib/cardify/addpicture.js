/**
 * Export `addPicture`
 */
module.exports = addPicture;

/**
 * Import modules
 */

var mergePictureWithCard = require("./mergeWithCardBlank.js"),
    fitToCardBox = require("./fittocardbox.js"),
    Q = require("q"),
    _ = require("underscore");
        
/**
 * Add a picture to a pokemon card blank
 * 
 * @param {GraphicsMagic} image
 * @param {String} outputFolder
 * @param {GraphicsMagic} card
 * 
 * @return {Promise}
 * @api public
 */
        
function addPicture(image, outputFolder, card) {
        
    var intermediaryImageOutput = outputFolder + "pokemon.png";


    function writeIntermediaryPicture(image) {
        return Q.ninvoke(image, "write",intermediaryImageOutput);
    }   
    
    function mergePictures() {
        return mergePictureWithCard(intermediaryImageOutput, card);
    }
  
    console.log("Adding picture To card");
    
    return Q(image).then(fitToCardBox).then(writeIntermediaryPicture).then(mergePictures);
    
}
