define(function (require) {
    describe('First task subView class', function () {
        var SubModel = require('../../../js/components/firstTask/notifications/model');
        var SubView = require('../../../js/components/firstTask/notifications/view');
        var BaseView = require('../../../js/components/common/base_view');
        var global = require('global');

        it('Creates an instance with called options', function () {
            var view = new SubView({}),
                eventsCount = 0;

            for (var key in view.events) {
                eventsCount++;
            }

            expect(typeof view.model).toBe('object');
            expect(typeof view.template).toBe('function');
            expect(typeof view.$el).toBe('object');
            expect(typeof view.events).toBe('object');
            expect(eventsCount).toEqual(1);
            expect(view.USER_ERROR_MESSAGE).toEqual('Input field must be filled');
            expect(view.MAX_ERRORS_COUNT).toEqual(5);
            expect(typeof view.noticeClasses).toBe('object');
        });

        it('Inherits from BaseView', function () {
            var subView = new SubView({}),
                baseView = new BaseView({});

            expect(subView.prototype).toBe(baseView.prototype);
        });

        it('render() renders view\'s template and bind events', function () {
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '#main'
            });
            spyOn(subView, 'render');

            subView.render();
            subView.model.emitEvent('change');

            expect(subView.render).toHaveBeenCalled();
        });

        it('appendSuccess() appends success notice with server response to subView\'s model', function () {
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '#main'
            });

            subView.render();

            subView.appendSuccess('success');
            expect(subView.model.notices).toEqual([{
                noticeClass: 'alert-success',
                text: 'success'
            }]);
        });

        it('appendServerError() appends error notice with server response to subView\'s model', function () {
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '#main'
            });

            subView.render();

            subView.appendServerError('fail');
            expect(subView.model.notices).toEqual([{
                noticeClass: 'alert-danger',
                text: 'fail'
            }]);
        });

        it('appendUserError() appends user error notice to subView\'s model', function () {
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '#main'
            });

            subView.render();

            subView.appendUserError();
            expect(subView.model.notices).toEqual([{
                noticeClass: 'alert-danger',
                text: 'Input field must be filled'
            }]);
        });

        it('isSuccessesExist() is a helper method that checks exists of success notices in model', function () {
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '#main'
            });

            subView.render();

            subView.appendUserError();
            expect(subView.isSuccessesExist()).toBe(false);
            subView.appendSuccess('success');
            expect(subView.isSuccessesExist()).toBe(true);
        });
    });
});
