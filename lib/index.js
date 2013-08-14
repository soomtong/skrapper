var fs = require('fs');
var mkdirp = require('mkdirp');
var request = require('request');
var dom = require('cheerio');
var utility = require('./utility');

exports.scrap = function (url, prg) {
    var imageDir = prg.directory || 'img';
    var imageSavedResult = [];

    utility.wrapUrl(url, function (url) {
        if (utility.checkUrl(url)) {
            // prepare directory
            mkdirp.sync(imageDir);

            // get page
            request(url, function (error, response, body) {
                var $ = dom.load(body);

                console.log("There have been", $("img", 'body').length, "images embedded.");

                var title = prg.title || $('title').text().replace(/\s/g, '') || 'newTitle';

                var selector = prg.element || 'body';
                // save images
                $('img', selector).each(function (index) {
                        var imgUrl = $(this).attr('src');
                        var imgExt = utility.getImgExt(imgUrl);

                        var newImageUrl = imageDir + '/' + title + '_' + index + '.' + imgExt;
                        var requestImageUrl = utility.wrapImageUrl(imgUrl, url);

                        request(requestImageUrl).pipe(fs.createWriteStream(newImageUrl));

                        // replace url
                        $('img').eq(index).attr('src', newImageUrl);

                        // stack changes
                        imageSavedResult.push(requestImageUrl + ' >> ' + newImageUrl);

                        process.stdout.write(".");
                    }
                );

                fs.writeFile(title + '.txt', imageSavedResult);
                fs.writeFile(title + '.html', $(selector).html());body

                console.log('\nplease check out');
                console.log(' ', title + '.txt');
                console.log(' ', title + '.html');
                console.log('  and', imageDir,'directory!');
                console.log('\nprocess almost done...\n');
            });
        } else {
            console.error(Error('skrapper: no correct url passed'));
        }
    });
};
