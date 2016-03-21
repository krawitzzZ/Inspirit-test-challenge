define(function (require) {
    describe('Second task view class', function () {
        var Model = require('../../js/components/secondTask/model');
        var View = require('../../js/components/secondTask/view');
        var BaseView = require('../../js/components/common/base_view');
        var global = require('global');
        var $ = require('jquery');


        it('Create an instance with called options', function () {
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

            var elemBeforeRender = global.document.getElementById('btn-get-second');
            expect(elemBeforeRender).toBe(null);

            view.render();

            var elemAfterRender = global.document.getElementById('btn-get-second');
            expect(elemAfterRender).not.toBe(null);
            expect(elemAfterRender).not.toBe(undefined);
            expect(typeof view.getResponse).toBe('function');
        });

        it('getResponse() receives response from server and render new state of model', function () {
            var model = new Model();
            var view = new View({
                model: model,
                $el: '#main'
            });

            view.render();

            var defer = $.Deferred();
            defer.resolve({
                result: true
            });

            spyOn(view.model, 'get').and.callFake(function () {
                return defer.promise();
            });
            spyOn(view.model, 'renderData').and.callThrough();
            spyOn(view, 'render').and.callThrough();


            var elem = global.document.getElementById('btn-get-second');
            var event = new MouseEvent('click');
            elem.dispatchEvent(event);
            expect(view.model.renderData).toHaveBeenCalled();
            expect(view.render).toHaveBeenCalled();
            expect(view.model.clickCount).toBe(1);
            expect(view.model.successes).toBe(1);
            expect(view.model.failures).toBe(0);
            expect(view.model.failureSinceLastSuccess).toBe(0);
            expect(view.model.failuresPercentage).toBe((0).toFixed(2));
            expect(view.model.wrapperColor).toBe('green');
        });
    });
});
