var skrapper = require('../lib/index');

exports['scrap url'] = function (test) {
    test.expect(1);
    test.equal(Error(), skrapper.scrap('http://helloworld.com/?id=1'), 'that should be good url');
    test.done();
};
