

// dependencies
var wood  = require('../index.js');
var nopt   = require('nopt');

function printHelp(){
    console.log('bla bla bla');
}

function printVersion(){
    console.log('verson bla bla bla');
}

// locals
var options = {
        'namespace': String,
        'directory': String,
        'filter':String,
        'version': true,
        'help': true
    };
var shortHand = {
        'n': ['--namespace'],
        'd': ['--directory'],
        'f': ['--filter'],
        'h': ['--help'],
        'v': ['--version']
    };


// options
options = nopt(options, shortHand);

if(options.version){
    printVersion();
}

if(options.help){
    printHelp();
}


var opt = {
    nameSpace :options.namespace || "templates",
    baseFolderPath : options.directory || "./",
    filter: options.filter || '.*'
};

wood.compileTemplates(opt, function(err, data){
    if(err && err.length > 0){
        console.log('errors', err);
    }
    if(data){
        console.log('');
        console.log(data);
    }
});



