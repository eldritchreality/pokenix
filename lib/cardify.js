/**
 * Export `buildCard`
 */

module.exports = buildCard;

/**
 * Import modules
 */

var checkArguments = require("./cardify/checkarguments.js"),
    checkForAndCreateOutputFolder = require("./cardify/checkforoutputloc.js"),
    write = require("./cardify/writeouttostream.js"),
    wrapImage = require("./cardify/wrapurl.js"),
    Q = require("q"),
    fs = require("fs"),
    addPicture = require("./cardify/addpicture.js"),
    _ = require("underscore"),
    assert = require("assert");

var testImage = "./img/pokemon/001Bulbasaur.png",
    testBlank = "./img/Blanks/Grass.png",
    defaultOutputFolder = "./output/";

var testImageBuffer = fs.readFileSync(testImage),
    testBlankBuffer = fs.readFileSync(testBlank);

/**
 * Builds up a card from a blank and an image
 * 
 * @param {String} image
 * @param {String} blank
 * @param {String} outFolder
 * 
 * @return {Promise}
 * @api public
 */

function buildCard (image,blank,outputFolder) {
    
    image = image || testImage;
    blank = blank || testBlank;
    outputFolder = outputFolder || defaultOutputFolder;
    
    assert.equal(typeof image,"string");
    assert.equal(typeof blank,"string");
    assert.equal(typeof outputFolder,"string");
    
    checkArguments(image,blank);
    checkForAndCreateOutputFolder(outputFolder);
  
    image = wrapImage(image);
    blank = wrapImage(blank);

    //Build and return card
    return Q(blank)
             .then(_.partial(addPicture,image,outputFolder)) //add picture to card
             .then(_.partial(write,outputFolder)) //write card to filesystem
             .done();
};
