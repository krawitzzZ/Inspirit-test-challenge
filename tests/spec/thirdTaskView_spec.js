define(function (require) {
    describe('Third task view class', function () {
        var Model = require('../../js/components/thirdTask/model');
        var View = require('../../js/components/thirdTask/view');
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
            expect(eventsCount).toEqual(2);
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

            spyOn(view, 'getFetch');
            spyOn(view, 'clearFetch');

            var elemBeforeRender = global.document.getElementById('getFetch');
            expect(elemBeforeRender).toBe(null);

            view.render();

            var elem1AfterRender = global.document.getElementById('getFetch');
            var elem2AfterRender = global.document.getElementById('clearFetch');
            expect(elem1AfterRender).not.toBe(null);
            expect(elem2AfterRender).not.toBe(undefined);

            var event1 = new MouseEvent('click', {
                target: '<button id="getFetch"></button>'
            });
            elem1AfterRender.dispatchEvent(event1);
            expect(view.getFetch).toHaveBeenCalled();

            var event2 = new MouseEvent('click', {
                target: '<button id="clearFetch"></button>'
            });
            elem2AfterRender.dispatchEvent(event2);
            expect(view.clearFetch).toHaveBeenCalled();
        });

        it('getFetch() receives response from server and render new count of products', function () {
            var model = new Model();
            var view = new View({
                model: model,
                $el: '#main'
            });

            view.render();

            var defer = $.Deferred();
            defer.resolve({
                type: 'fruit',
                item: 'apple'
            });

            spyOn(view.model, 'addProduct');
            spyOn(view, 'render');
            spyOn(view.model, 'get').and.callFake(function () {
                return defer;
            });

            var elem = global.document.getElementById('getFetch');
            var event = new MouseEvent('click', {
                target: '<button id="getFetch"></button>'
            });
            elem.dispatchEvent(event);
            expect(view.model.addProduct).toHaveBeenCalled();
            expect(view.render).toHaveBeenCalled();





        });





    });
});
