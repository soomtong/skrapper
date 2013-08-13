var util = require('../lib/utility');

exports['check url'] = function (test) {
    test.expect(2);
    test.equal(true, util.checkUrl('http://helloworld.com/?id=1'), 'that should be good url');
    test.ok(!util.checkUrl('hello'), 'the string is not url');
    test.done();
};

exports['wrap url'] = function (test) {
    util.wrapUrl('helloworld.com', function (url) {
        test.expect(1);
        test.equal('http://helloworld.com', url, 'url modifid fail');
        test.done();
    });
};

exports['no wrap url'] = function (test) {
    util.wrapUrl('http://helloworld.com', function (url) {
        test.expect(1);
        test.equal('http://helloworld.com', url, 'return no equal string');
        test.done();
    });
};