var skrapper = require('../lib/index');

exports['check url'] = function (test) {
    test.expect(1);
    test.equal(true, skrapper.scrap('http://helloworld.com/?id=1'), 'that should be good url');
    test.done();
};
