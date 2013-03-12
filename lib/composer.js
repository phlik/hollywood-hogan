(function (module) {
    "use strict";
    function create(options){
        var nameSpace = options.nameSpace || 'templates',
            base = options.baseFolderPath || '',
            filter = new RegExp(options.filter || '.*','i' ),
            walk = require("walk").walk,
            compiler = require("./operations.js"),
            output,
            counter,
            loadComplete,
            walker,
            onComplete,
            errors;

        function registerLine(){
            counter++;
        }
        function completeLine(content){
            counter--;
            output.push(content);
            presentTemplates();
        }
        function presentTemplates(){
            if(counter === 0 && loadComplete === true){
                var retText = output.join('\n');
                if(onComplete && typeof onComplete === 'function'){
                    onComplete(errors,   retText);
                }
            }
        }
        function completeError(error){
            counter--;
            errors.push(error);
            presentTemplates();
        }

        function compileTemplates(callback){
            var ops = compiler.create({
                nameSpace : nameSpace,
                baseFolderPath: base
            });
            onComplete = callback
            output = [];
            errors = [];
            counter = 0;
            loadComplete = false;
            walker = walk(base);
            walker.on('file', function(root, stat, next){
                if(filter.test(stat.name)){
                    registerLine();
                    ops.createTemplateString(root, stat, function(err,line){
                        if(err){
                            completeError(err);
                            return;
                        }
                        completeLine(line);
                    });
                }
                next();
            });
            walker.on('directory', function(root, stat, next){
                registerLine();
                ops.createDirectoryString( root, stat, function(err,line){
                    if(err){
                        completeError(err);
                        return;
                    }
                    completeLine(line);

                });
                next();
            });
            walker.on('end', function(){
                loadComplete = true;
                presentTemplates();
            });
        }

        return {
            compileTemplates: function(callback){
                compileTemplates(callback);
            }
        };
    }

    var operations = {
        create: function (options){
            return create(options);
        }
    };

    module.exports = operations;

}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? module : window));