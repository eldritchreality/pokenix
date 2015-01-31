var should = require("chai").should(),
    fs = require("fs");

describe("The pokemon personality types data file", function(){
    var filepath = "./data/personalities.json"
    
    it('should exist',function(done){
       var dataFileExists = fs.existsSync(filepath);
       
       dataFileExists.should.be.true;
       done();
   });
    
   it('should load', function(done){
       fs.readFile(filepath,done);
       
   });
    
   it('should parse as valid JSON', function(done){
       fs.readFile(filepath,function(err,data){
           var parsedDate = null;
           if (err) throw new Error(err);
           parsedData = JSON.parse(data.toString());
           parsedData.should.satisfy(function(mightBeArray){return typeof mightBeArray.length == "number" && mightBeArray.length > 0});
           done();
       })
       
       
   })
    
    
    
});

