var mocha = require("mocha"),
    should = require("chai").should();


describe("The check arguments module",function(){
    var filepath = "../lib/cardify/checkarguments.js",
        testImg = "./test/img/001Bulbasaur.png",
        testBlank = "./test/img/Grass.png";
    
    var testModule = require(filepath);
    
    it("should return true when passed two existing images", function(){
        testModule(testImg,testBlank).should.be.true; 
    });
    
    it("should throw an exception when passed nonexistant images", function () {
        should.Throw(function(){
            testModule("./nonexistant/"+testImg,testBlank);
        });
        
        should.Throw(function(){
            testModule(testImg,"nonexistant/"+testBlank);
        });
        
        should.Throw(function(){
            testModule("./nonexistant/"+testImg,"nonexistant/"+testBlank);
        });
    });
})