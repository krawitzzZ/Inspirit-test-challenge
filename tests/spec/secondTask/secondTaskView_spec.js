define(function (require) {
    describe('Second task view class', function () {
        var Model = require('../../../js/components/secondTask/model');
        var View = require('../../../js/components/secondTask/view');
        var BaseView = require('../../../js/components/common/base_view');
        var global = require('global');
        var $ = require('jquery');

        it('Creates an instance with called options', function () {
            var view = new View({}),
                eventsCount = 0;

            for (var key in view.events) {
                eventsCount++;
            }

            expect(typeof view.model).toBe('object');
            expect(typeof view.template).toBe('function');
            expect(typeof view.$el).toBe('object');
            expect(typeof view.events).toBe('object');
            expect(eventsCount).toEqual(1);
        });

        it('Inherits from BaseView', function () {
            var view = new View({}),
                baseView = new BaseView({});

            expect(view.prototype).toBe(baseView.prototype);
        });

        it('render() renders view\'s template and bind events', function () {
            var model = new Model();
            var view = new View({
                model: model,
                $el: '#main'
            });
            spyOn(view, 'getResponse');

            var elemBeforeRender = global.document.getElementById('btn-get-second');
            expect(elemBeforeRender).toBe(null);

            view.render();

            var elemAfterRender = global.document.getElementById('btn-get-second');
            expect(elemAfterRender).not.toBe(null);

            $('#btn-get-second').triggerHandler('click');

            expect(view.getResponse).toHaveBeenCalled();
        });

        it('getResponse() receives response from server and renders new state of model', function () {
            var model = new Model();
            var view = new View({
                model: model,
                $el: '#main'
            });
            spyOn(view, 'render').and.callThrough();
            spyOn(view.model, 'renderData').and.callThrough();
            spyOn(view.model, 'get').and.callFake(function () {
                var defer = $.Deferred();
                defer.resolve({
                    result: true
                });
                return defer.promise();
            });

            view.render();

            $('#btn-get-second').trigger('click');
            expect(view.render.calls.count()).toEqual(2);
            expect(view.model.renderData).toHaveBeenCalled();
            expect(view.model.clickCount).toBe(1);
            expect(view.model.successes).toBe(1);
            expect(view.model.failures).toBe(0);
            expect(view.model.failureSinceLastSuccess).toBe(0);
            expect(view.model.failuresPercentage).toBe((0).toFixed(2));
            expect(view.model.wrapperColor).toBe('green');
        });
    });
});
