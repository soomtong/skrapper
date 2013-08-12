var fs = require('fs');
var request = require('request');
var dom = require('jsdom');
var utility = require('./utility');

exports.scrap = function (url, prg) {

    return utility.checkUrl(url);
};

