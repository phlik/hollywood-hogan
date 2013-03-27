var wood  = require('../index.js');
var nopt   = require('nopt');

function printHelp(){
    var help = "'-n' or '--namespace' sets the name space.\n'-d' or '--directory' sets the directory to run under.\n'-f' or '--filter' sets the filter \n'-h' or '--help' prints this message\n'-v' or '--version' will print the version.\n";
    console.log(help);
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
} else if(options.help || options.argv.cooked.length === 0){
    printHelp();
} else {
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
}



