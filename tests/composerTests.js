var assert = require("assert");
describe("operation ", function(){
    var composer;
    var worker;
    beforeEach(function(){
        composer = require("../lib/composer.js");
        worker = composer.create({nameSpace :"", baseFolderPath : ""});
    });
    it("should contain an create function", function(){
        assert.equal('function', typeof composer.create);
    });

    describe("the created object",function(){
        it("should have a function called compileTemplates", function(){
            assert.equal('function', typeof worker.compileTemplates);
        });
    });



});