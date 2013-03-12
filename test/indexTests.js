var assert = require("assert");
describe("index ", function(){
    var index;
    beforeEach(function(){
        index = require("../index.js");
    });
    it("should contain an create function", function(){
        assert.equal('function', typeof index.compileTemplates);
    });

    describe("the created object",function(){
        it("should compile a set of functions based on the data in the test folder", function(done){
            index.compileTemplates({nameSpace :"test", baseFolderPath : "./", filter:'.*\\.mustache'}, function(err, data){
                assert.equal(data.length > 0, true);
                done();
            });
        });
    });



});