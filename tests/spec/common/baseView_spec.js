define(function (require) {
    describe('Base view class', function () {
        var EventEmitter = require('EventEmitter');
        var BaseView = require('../../../js/components/common/base_view');

        it('Create an instance with called options', function () {
            var baseView = new BaseView({});

            expect(typeof baseView.model).toBe('object');
            expect(typeof baseView.subView).toBe('object');
            expect(typeof baseView.template).toBe('string');
            expect(typeof baseView.$el).toBe('object');
            expect(typeof baseView.events).toBe('object');
            expect(typeof baseView.render).toBe('function');
            expect(typeof baseView.dispose).toBe('function');
        });

        it('Inherits from EventEmitter', function () {
            var baseView = new BaseView({});
            var eventEmitter = new EventEmitter();

            expect(baseView.prototype).toBe(eventEmitter.prototype);
        });

        it('dispose() deletes own properties', function () {
            var baseView = new BaseView({});

            expect(typeof baseView.model).toBe('object');
            expect(typeof baseView.subView).toBe('object');
            expect(typeof baseView.template).toBe('string');
            expect(typeof baseView.$el).toBe('object');
            expect(typeof baseView.events).toBe('object');

            baseView.dispose();

            expect(baseView.model).toBe(undefined);
            expect(baseView.subView).toBe(undefined);
            expect(baseView.template).toBe(undefined);
            expect(baseView.$el).toBe(undefined);
            expect(baseView.events).toBe(undefined);
        });
    });
});
