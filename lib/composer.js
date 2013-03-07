(function (module) {
    "use strict";
    function create(options){
        var base = 'c:/templates',
            nameSpace = 'fbiTemplates',
            walk = require("walk").walk,
            ops = require("./operations.js").create({
                nameSpace : nameSpace,
                baseFolderPath: base
            }),
            output = [],
            counter = 0,
            loadComplete = false,
            walker;

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
                console.log(output.join('\n'));
            }
        }
        function completeError(error){
            counter--;
            console.error('error', error);
            presentTemplates();
        }

        function compileTemplates(callback){
            walker = walk(base);
            walker.on('file', function(root, stat, next){
                registerLine();
                ops.createTemplateString(root, stat, function(err,line){
                    if(err){
                        completeError(err);
                        return;
                    }
                    completeLine(line);
                });
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