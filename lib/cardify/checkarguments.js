var fs = require("fs");


function checkArguments(image,blank) {
//check if arguments exist
    var imageExists = false,
        blankExists = false;
    
    imageExists = fs.existsSync(image);
    blankExists = fs.existsSync(blank);
    
    console.log("Image is:", image);
    console.log("Does the Image Exist?", imageExists? "yes" : "no");
    console.log("Blank is:", blank);
    console.log("Does the Blank Exist?", blankExists? "yes" : "no");
    
    if (!imageExists) {throw new Error("The image file",image,"doesn't exist");}
    if (!blankExists) {throw new Error("The card blank file",blank,"doesn't exist");}
    
    return imageExists && blankExists;
    
}

module.exports = checkArguments;