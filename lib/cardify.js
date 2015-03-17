//exports
module.exports = buildCard;

//load modules
var checkArguments = require("./cardify/checkarguments.js"),
    checkForAndCreateOutputFolder = require("./cardify/checkforoutputloc.js"),
    writeOut = require("./cardify/writeouttostream.js"),
    wrapImage = require("./cardify/wrapurl.js"),
    Q = require("q"),
    fs = require("fs"),
    addPictureFunction = require("./cardify/addpicture.js");

//set defaults
var testImage = "./img/pokemon/001Bulbasaur.png",
    testBlank = "./img/Blanks/Grass.png",
    defaultOutputLoc = "./output/";

var testImageBuffer = fs.readFileSync(testImage),
    testBlankBuffer = fs.readFileSync(testBlank);

//actual code
function buildCard (inputImage,inputBlank,outputFolder) {
    var pokemonFileOutput, image, blank;
    
    //input defaults
    inputImage = inputImage || testImage;
    inputBlank = inputImage || testBlank;
    outputFolder = outputFolder || defaultOutputLoc;
    
    pokemonFileOutput = outputFolder + "pokemon.png";
   
    //partially applied wrapper functions
    function write (picture) {
        return writeOut(picture,outputFolder);
    }    
    
    function addPicture (card) {
        return addPictureFunction(card,image,outputFolder);
    }
   
    //sanity checks
    if ("string" == typeof inputImage && "string" == typeof inputBlank) {
        checkArguments(inputImage,inputBlank)
    };
    
    checkForAndCreateOutputFolder(outputFolder);

    //parse arguments with imageimageMagick
    image = wrapImage(inputImage);
    blank = wrapImage(inputBlank);

    //Build and return card
    return Q(blank).then(addPicture).then(write).done();
    
};
