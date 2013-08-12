var util = require('../lib/utility');

exports['check url'] = function (test) {
    test.expect(2);
    test.equal(true, util.checkUrl('http://helloworld.com/?id=1'), 'that should be good url');
    test.ok(!util.checkUrl('hello'), 'the string is not url');
    test.done();
};
