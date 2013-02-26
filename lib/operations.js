/**
 * User: ehouston
 */
;!function(exports){
    var hogan = require("hogan.js"),
        fs = require('fs');
    var nameSpace,
        base;
    function buildRootPath(root, nameSpace){
        return root.replace(base,nameSpace).replace('/','.');
    }

    function buildTemplateName(fileName){
        var fileParts = fileName.split('.'),
            templatePath = fileParts.slice(0,fileParts.length-1).join('_');
        return templatePath;
    }

    // remove utf-8 byte order mark, http://en.wikipedia.org/wiki/Byte_order_mark
    function removeByteOrderMark(text) {
        if (text.charCodeAt(0) === 0xfeff) {
            return text.substring(1);
        }
        return text;
    }


    function createTemplateString(root, stat, callback){
        var result,
            templateKey = buildRootPath(root, nameSpace) + '["' + buildTemplateName(stat.name) +'"] = ';

        fs.readFile(root + '/' + stat.name, 'utf-8', function(err, data){
            if(!err){
                result = templateKey + 'new Hogan.Template('  + hogan.compile(removeByteOrderMark(data), { asString: 1 }) + ');';
            }
            callback(err, result);
        });
    }

    function createDirectoryString(root, stat, callback){
        var templateKey = buildRootPath(root, nameSpace) + '["' + stat.name +'"] = {}';
        callback(null, templateKey);
    }

    var operations = {
        createDirectoryString : function( root, stat, callback){
            createDirectoryString(root, stat, callback)
        },
        createTemplateString : function(root, stat, callback){
            createTemplateString(root, stat, callback);
        },
        init: function(options){
            nameSpace = options.nameSpace || 'templates';
            base = options.baseFolderPath || '';
            return this;
        }
    };

    exports.operations = operations;



}(typeof process !== 'undefined' && typeof process.title !== 'undefined' && typeof exports !== 'undefined' ? exports : window);
