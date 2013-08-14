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

                console.log("there have been", $("img", 'body').length, "images embedded.");

                var title = $('title').text().replace(/\s/g, '') || 'newTitle';

                // save images
                $('img', 'body').each(function (index) {
                        var imgTitle = prg.title || title;

                        var imgUrl = $(this).attr('src');
                        var imgExt = utility.getImgExt(imgUrl);

                        var newImageUrl = imageDir + '/' + imgTitle + '_' + index + '.' + imgExt;
                        var requestImageUrl = utility.wrapImageUrl(imgUrl, url);

                        request(requestImageUrl).pipe(fs.createWriteStream(newImageUrl));

                        // replace url
                        $('img').eq(index).attr('src', newImageUrl);

                        // stack changes
                        imageSavedResult.push(requestImageUrl + ' >> ' + newImageUrl);
                    }
                );

                console.log($('body').html());
                console.log(imageSavedResult);

            });
        } else {
            console.error(Error('skrapper: no correct url passed'));
        }
    });
};
