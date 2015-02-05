var fs = require("fs");

function checkForAndCreateOutputFolder (folder) {
    
    if ("string" !== typeof folder) {throw new Error(folder + ' must be a valid path');}
    if (!fs.existsSync(folder)) {fs.mkdirSync(folder)};
    
}

module.exports = checkForAndCreateOutputFolder;