var fs = require("fs");

function writeOut(outputFolder,pictureStream) {
            var outputFilePath = outputFolder + "complete_card.png";
            var outputStream = fs.createWriteStream(outputFilePath);
    
            console.log("Writing Card to:",outputFilePath);
               
            outputStream.on("finish", function() {
                console.log("Card Written");
            });
            pictureStream.pipe(outputStream);
}

module.exports = writeOut;