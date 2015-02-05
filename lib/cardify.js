var imageMagick = require("gm"),
    fs = require("fs"),
    checkArguments = require("./cardify/checkarguments.js"),
    checkForAndCreateOutputFolder = require("./cardify/checkforoutputloc.js"),
    wrapUrl = require("./cardify/wrapurl.js");


var testImage = "./img/pokemon/001Bulbasaur.png",
    testBlank = "./img/Blanks/Grass.png",
    outputLoc = "./output/";

var cardBoxWidth  = 424,
    cardBoxHeight = 256;

function mergePictureWithCardBlank(picture, cardBlank) {
    var pokemonPictureYOffset = "+80",
        pokemonPictureXOffset = "+0",
        internalStream;

   
    if ("string" !== typeof picture) {throw new Error("The picture must be a valid file path");}
    

    //merge picture with blank card
    internalStream = cardBlank
                      .composite(picture)
                      .compose("DstOver")
                      .gravity("North")
                      .geometry(cardBoxWidth + "x" + cardBoxHeight + pokemonPictureXOffset + pokemonPictureYOffset)
                      .stream("png");
    
    
    //flatten to remove transparencies
    return imageMagick(internalStream,"card.png").options({ imageMagick: true }).mosaic().stream();  //returns a stream
}


function fitToCardBox(image) {
    var paddingWidth = 50,
        paddingHeight = 30;

    return image.resize(cardBoxWidth-paddingWidth, cardBoxHeight-paddingHeight);
}   

function buildCard (inputImage,inputBlank,outputFolder) {
    var pokemonFileOutput = outputFolder + "pokemon.png",
        image, blank, composite, outputStream;

    //sanity checks
    checkArguments(inputImage,inputBlank);    
    checkForAndCreateOutputFolder(outputFolder);

    //parse arguments with imageimageMagick
    image = wrapUrl(inputImage);
    blank = wrapUrl(inputBlank);

    //convert the pokemon picture to the right size
    image = fitToCardBox(image);
    //output the completed pokemon picture
    image.write(pokemonFileOutput, function(err) {
        if(err) throw err;
        console.log("Intermediary Pokemon Picture Written");

        //composite the output pokemon with the card blank.
        composite = mergePictureWithCardBlank(pokemonFileOutput,blank);

        //write output
        outputStream = fs.createWriteStream(outputFolder+"complete_card.png");
        outputStream.on("finish",function() {console.log("Final Writeout of Card Complete");});

        composite.pipe(outputStream);

    });
};

function export_wrapper (inputImage,inputBlank) {
    inputImage = inputImage || testImage;
    inputBlank = inputImage || testBlank;
    
    return buildCard(testImage,testBlank,outputLoc);
}

module.exports = export_wrapper;