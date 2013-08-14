exports.checkUrl = function (url) {
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

    return !!(regex.test(url));
};

exports.checkImgExt = function (extName) {
    var regex = /(gif|jpg|jpeg|tiff|png)$/i;

    return !!(regex.test(extName));
};

exports.getImgExt = function (filename) {
    var regex = /(gif|jpg|jpeg|tiff|png)$/i;

    var imgFile = filename.split('.');
    var imgExt = imgFile.length > 1 ? imgFile.pop() : 'jpg';

    return !!(regex.test(imgExt)) ? imgExt : 'jpg';
};

exports.wrapUrl = function (url, callback) {
    if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
        url = 'http://' + url;
    }
    callback(url);
};

exports.wrapImageUrl = function (imageUrl, url) {
    if (imageUrl.indexOf('http://') < 0 && imageUrl.indexOf('https://') < 0) {
        imageUrl = url + imageUrl;
    }

    return imageUrl;
};
