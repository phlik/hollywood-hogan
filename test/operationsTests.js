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

    it("createTemplateString should return a string that creates the template", function(done){
        worker.createTemplateString(".", {name:"test.mustache"}, function(err, data){
            var checkString = 'templates.["test"] = new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");_.b("<strong>");_.b(_.v(_.f("test",c,p,0)));_.b("</strong>");return _.fl();;});';
            assert.equal(err, null,"the error should be null");
            assert.equal(data, checkString, "the check string should match the following: " + checkString);
            done();
        });
    });

    it("createTemplateString should return a string that creates the template", function(done){
        worker.createTemplateString(".", {name:"test2.mustache"}, function(err, data){
            assert.notEqual(err, null,"the error should not be null");
            done();
        });
    });
});




