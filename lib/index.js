var fs = require('fs');
var mkdirp = require('mkdirp');
var request = require('request');
var dom = require('jsdom');
var utility = require('./utility');

exports.scrap = function (url, prg) {
    var imageDir = prg.directory || 'img';
    var imageSavedResult = [];

    utility.wrapUrl(url, function (url) {
        if (utility.checkUrl(url)) {
            // prepare directory
            mkdirp.sync(imageDir);

            // get page
            dom.env(
                url, ["http://code.jquery.com/jquery.js"],
                function (errors, window) {
                    console.log("there have been", window.$("img").length, "images embeded.");
                    // get title for filename
                    var title = window.$('title').text().replace(/\s/g, '') || 'newTitle';

                    // save images
                    window.$('img').each(function (index) {
                        var imgTitle = prg.title || title;

//                        var imgUrl = window.$('img').eq(index).attr('src');
                        var imgUrl = window.$(this).attr('src');
                        var imgFile = imgUrl.split('.');
                        var imgExt = imgFile.length > 1 ? imgFile.pop() : 'jpg';
                        imgExt = utility.checkImgExt(imgExt) ? imgExt : 'jpg';

                        var newImageUrl = imageDir + '/' + imgTitle + '_' + index + '.' + imgExt;

                        var requestImageUrl = utility.wrapImageUrl(imgUrl, url);

                        request(requestImageUrl).pipe(fs.createWriteStream(newImageUrl));

                        imageSavedResult.push(requestImageUrl + ' >> ' + newImageUrl);

                        window.$('img').eq(index).attr('src', newImageUrl);
                    });

                    console.log(window.$('body').html());
                    console.log(imageSavedResult);
                }
            );
        } else {
            console.error(Error('skrapper: no correct url passed'));
        }
    });
};
