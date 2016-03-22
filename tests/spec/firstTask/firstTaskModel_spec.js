define(function (require) {
    describe('First task model class', function () {
        var Model = require('../../../js/components/firstTask/model');

        it('Creates an instance with default properties', function () {
            var model = new Model();
            expect(model).toBeDefined();
        });

        it('get() returns promise with server response and methods done, fail and always', function () {
            var model = new Model();
            expect(typeof model.get().done).toBe('function');
            expect(typeof model.get().fail).toBe('function');
            expect(typeof model.get().always).toBe('function');
        });
    });
});
