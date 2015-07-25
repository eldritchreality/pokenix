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
    assert = require("assert"),
    addName = require("./cardify/addText.js").addName;
    addAbility = require("./cardify/addText.js").addAbility;


var testImage = "./img/pokemon/001Bulbasaur.png",
    testBlank = "./img/Blanks/Grass.png",
    defaultName = "Cutie",
    defaultAbility = "Squee",
    defaultAbilityDescription = "Makes high-pitched noises when it sees another of its kind.",
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

function buildCard (image,blank,name,ability,abilityDescription,outputFolder) {
    
    image = image || testImage;
    blank = blank || testBlank;
    outputFolder = outputFolder || defaultOutputFolder;
    name = name || defaultName;
    ability = ability || defaultAbility;
    abilityDescription = abilityDescription || defaultAbilityDescription;
    
    
    assert.equal(typeof image,"string");
    assert.equal(typeof blank,"string");
    assert.equal(typeof name, "string");
    assert.equal(typeof ability, "string");
    assert.equal(typeof abilityDescription, "string");
    assert.equal(typeof outputFolder,"string");
    
    checkArguments(image,blank);
    checkForAndCreateOutputFolder(outputFolder);
  
    image = wrapImage(image);
    blank = wrapImage(blank);

    //Build and return card
    return Q(blank)
             .then(_.partial(addPicture,image,outputFolder)) //add picture to card
             .then(_.partial(addName,name))
             .then(_.partial(addAbility,ability,abilityDescription))
             .then(_.partial(write,outputFolder)) //write card to filesystem
             .done();
};
