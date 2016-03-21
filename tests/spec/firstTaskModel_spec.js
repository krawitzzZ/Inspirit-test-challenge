define(function (require) {
    describe('First task model class', function () {
        var Model = require('../../js/components/firstTask/model');

        it('Create an instance with default properties', function () {
            var model = new Model();
            expect(model).toBeDefined();
        });

        it('get() returns deferred promise with methods done, fail and always', function () {
            var model = new Model();
            expect(typeof model.get().done).toBe('function');
            expect(typeof model.get().fail).toBe('function');
            expect(typeof model.get().always).toBe('function');
        });
    });
});
