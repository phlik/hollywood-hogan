;!function(module){
    var composer = require("./lib/composer.js");

    var ret = {
        compileTemplates:function(options, callback){
            var compiler = composer.create(options);
            compiler.compileTemplates(callback) ;
        }
    };
    module.exports = ret;

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? module : window);