var fs = require("fs");

function writeOut(pictureStream,outputFolder) {
            var outputStream = fs.createWriteStream(outputFolder + "complete_card.png");
            outputStream.on("finish", function() {
                console.log("Final Writeout of Card Complete");
            });
            pictureStream.pipe(outputStream);
}

module.exports = writeOut;