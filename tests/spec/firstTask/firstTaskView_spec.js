define(function (require) {
    describe('First task view class', function () {
        var Model = require('../../../js/components/firstTask/model');
        var View = require('../../../js/components/firstTask/view');
        var SubModel = require('../../../js/components/firstTask/notifications/model');
        var SubView = require('../../../js/components/firstTask/notifications/view');
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
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '.notificationBlock'
            });
            var view = new View({
                model: model,
                subView: subView,
                $el: '#main'
            });
            spyOn(view, 'submit');

            var elemBeforeRender = global.document.getElementById('btn-submit-first');
            expect(elemBeforeRender).toBe(null);

            view.render();

            var elemAfterRender = global.document.getElementById('btn-submit-first');
            expect(elemAfterRender).not.toBe(null);

            $('#btn-submit-first').triggerHandler('click');

            expect(view.submit).toHaveBeenCalled();
        });

        it('submit() checks input value and changes state of subView model depends on server response', function () {
            var model = new Model();
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '.notificationBlock'
            });
            var view = new View({
                model: model,
                subView: subView,
                $el: '#main'
            });
            spyOn(view.subView, 'appendSuccess');
            spyOn(view.model, 'get').and.callFake(function () {
                var defer = $.Deferred();
                defer.resolve('success server response received');
                return defer.promise();
            });

            view.render();

            var input = $(view.$.input);
            input.val('qwe');

            $('#btn-submit-first').triggerHandler('click');
            expect(view.subView.appendSuccess).toHaveBeenCalled();
        });

        it('submit() if input value is null appends user error to subView\'s model', function () {
            var model = new Model();
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '.notificationBlock'
            });
            var view = new View({
                model: model,
                subView: subView,
                $el: '#main'
            });
            spyOn(view.subView, 'appendUserError');

            view.render();

            $('#btn-submit-first').triggerHandler('click');
            expect(view.subView.appendUserError).toHaveBeenCalled();
        });
    });
});
