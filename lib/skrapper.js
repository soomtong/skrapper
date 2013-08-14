#!/usr/bin/env node

// prepare command
var program = require('commander');

program
    .version('0.0.1')
    .usage('[url] [options]')
    .option('-t, --title <title>', 'image name for crawling images')
    .option('-e, --element <element>', 'element for jquery style selector')
    .option('-d, --directory <directory>', 'specify save directory');
//    .option('-f, --file <file>', 'specify automatic configuration file');

program.on('--help', function(){
    console.log('  Example: ');
    console.log('');
    console.log('  $ index.js "http://helloworld.com?id=1" -e #hello');
    console.log('');
});

program.parse(process.argv);

var url = program.args.shift();

if (!url) program.help();

// Exception Handler 등록
process.on('uncaughtException', function (err) {
    console.error('Caught exception: ' + err);
});

// call process
require('./').scrap(url, program);
