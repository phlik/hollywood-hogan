var assert = require("assert");
describe("operation ", function(){
    var ops;
    var worker;
    beforeEach(function(){
        ops = require("../lib/operations.js");
        worker = ops.create({nameSpace :"", baseFolderPath : ""});
    });
    it("should contain an create function", function(){
        assert.equal('function', typeof ops.create);
    });
    it("should contain an createDirectoryString function", function(){
        assert.equal('function', typeof worker.createDirectoryString);
    });
    it("should contain an createTemplateString function", function(){
        assert.equal('function', typeof worker.createTemplateString);
    });

    it("createDirectoryString should return the a pramaterised string", function(done){
        worker.createDirectoryString("root",{name:"directory"}, function(err, res){
            assert.equal(err, null,"the error should be null");
            assert.equal(res, 'templatesroot["directory"] = {}', 'the dictionary string shoudl look like templatesroot["directory"] = {}');
            done();
        });
    });


});




