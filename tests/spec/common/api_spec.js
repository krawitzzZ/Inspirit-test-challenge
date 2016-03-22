define(function (require) {
    describe('Ajax API', function () {
        var api = require('../../../js/components/common/network/api');

        it('postResponse() returns promise with server response and methods done, fail and always', function () {
            expect(typeof api.postResponse()).toBe('object');
            expect(typeof api.postResponse().done).toBe('function');
            expect(typeof api.postResponse().fail).toBe('function');
            expect(typeof api.postResponse().always).toBe('function');
        });

        it('responseCodes() returns promise with server response and methods done, fail and always', function () {
            expect(typeof api.responseCodes()).toBe('object');
            expect(typeof api.responseCodes().done).toBe('function');
            expect(typeof api.responseCodes().fail).toBe('function');
            expect(typeof api.responseCodes().always).toBe('function');
        });

        it('dataSet() returns promise with server response and methods done, fail and always', function () {
            expect(typeof api.dataSet()).toBe('object');
            expect(typeof api.dataSet().done).toBe('function');
            expect(typeof api.dataSet().fail).toBe('function');
            expect(typeof api.dataSet().always).toBe('function');
        });
    });
});
