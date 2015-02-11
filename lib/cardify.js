var imageMagick = require("gm"),
    fs = require("fs"),
    checkArguments = require("./cardify/checkarguments.js"),
    checkForAndCreateOutputFolder = require("./cardify/checkforoutputloc.js"),
    fitToCardBox = require("./cardify/fittocardbox.js"),
    mergePictureWithCardBlank = require("./cardify/mergeWithCardBlank.js"),
    writeOut = require("./cardify/writeouttostream.js"),
    wrapUrl = require("./cardify/wrapurl.js"),
    Q = require("q");


var testImage = "./img/pokemon/001Bulbasaur.png",
    testBlank = "./img/Blanks/Grass.png",
    defaultOutputLoc = "./output/";


function buildCard (inputImage,inputBlank,outputFolder) {
    var pokemonFileOutput, image, blank;
    
    //input defaults
    inputImage = inputImage || testImage;
    inputBlank = inputImage || testBlank;
    outputFolder = outputFolder || defaultOutputLoc;
    
    pokemonFileOutput = outputFolder + "pokemon.png";
    
    function createIntermediaryPicture (image) {
        return Q.ninvoke(image,"write",pokemonFileOutput)
    }
   
    function write (picture) {
        return writeOut(picture,outputFolder);
    }    
    
    function mergePictures() {
        return mergePictureWithCardBlank(pokemonFileOutput, blank); 
    }
    
    //sanity checks
    checkArguments(inputImage,inputBlank);    
    checkForAndCreateOutputFolder(outputFolder);

    //parse arguments with imageimageMagick
    image = wrapUrl(inputImage);
    blank = wrapUrl(inputBlank);

    return fitToCardBox(image,blank).then(createIntermediaryPicture).then(mergePictures).then(write).done();
    
};

module.exports = buildCard;