var mocha = require("mocha"),
    should = require("chai").should(),
    gm = require("gm");

describe("The Wrapurl module", function(){    
    var filepath = "../lib/cardify/wrapurl.js",
        testImg = "./test/img/001Bulbasaur.png";
    
    var testModule = require(filepath);
 
    
    it("should take a link to an image and return an imageMagick object for manipulating that image", function(){
             testModule(testImg).should.be.an.instanceOf(gm);
    });
});
