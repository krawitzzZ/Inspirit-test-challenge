define(function (require) {
    describe('Base view class', function () {
        var EventEmitter = require('EventEmitter');
        var BaseView = require('../../../js/components/common/base_view');
        var $ = require('jquery');
        var _ = require('underscore');

        it('Creates an instance with called options', function () {
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

        it('render() renders view\'s template and bind events', function () {
            var baseView = new BaseView({
                model: {},
                template: _.template(''),
                $el: $('#main'),
                events: {
                    'click #main': 'dispose'
                }
            });
            spyOn(baseView, 'dispose');

            baseView.render();

            baseView.$el.triggerHandler('click');

            expect(baseView.dispose).toHaveBeenCalled();
        });

        it('If instance has subView(s) it renders them (after main view)', function () {
            var subView1 = {};
            var subView2 = {};
            subView1.render = subView2.render = function () {};

            var baseView = new BaseView({
                subView: [subView1, subView2],
                template: _.template(''),
                $el: $('#main')
            });
            spyOn(subView1, 'render');
            spyOn(subView2, 'render');

            baseView.render();

            expect(subView1.render).toHaveBeenCalled();
            expect(subView2.render).toHaveBeenCalled();
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
