define(function (require) {
    describe('First task specification', function () {
        var MainView = require('../../js/components/common/main_view'),
            View1 = require('../../js/components/firstTask/view'),
            Model1 = require('../../js/components/firstTask/model'),
            SubView1 = require('../../js/components/firstTask/notifications/view'),
            SubModel1 = require('../../js/components/firstTask/notifications/model');

        var mainView = new MainView(),
            model = new Model1(),
            subModel = new SubModel1(),
            subView = new SubView1({
                model: subModel,
                $el: '.notificationBlock'
            }),
            view = new View1({
                model: model,
                subView: subView,
                $el: '#main'
            });

        mainView.showView(view);

        it('View instance should be defined', function () {
            expect(view).toBeDefined();
        });

        it('View instance should have model, template, subView and $el', function () {
            expect(view.model).toBeDefined();
            expect(view.subView).toBeDefined();
            expect(view.template).toBeDefined();
            expect(view.$el).toBeDefined();
        });

        it('View instance should have own methods', function () {
            expect(typeof view.render).toEqual('function');
            expect(typeof view.dispose).toEqual('function');
            expect(typeof view.submit).toEqual('function');
        });

        it('View\'s instance\'s subView should have own methods', function () {
            expect(typeof view.subView.render).toEqual('function');
            expect(typeof view.subView.dispose).toEqual('function');
            expect(typeof view.subView.appendSuccess).toEqual('function');
            expect(typeof view.subView.appendServerError).toEqual('function');
            expect(typeof view.subView.appendUserError).toEqual('function');
            expect(typeof view.subView.isSuccessesExist).toEqual('function');
        });

        it('On append success subView\'s model should append notification', function () {
            spyOn(view.subView.model, 'appendNotification');
            view.subView.appendSuccess('test');
            expect(view.subView.model.appendNotification).toHaveBeenCalled();
        });

        it('On append user error subView\'s model should append notification', function () {
            spyOn(view.subView.model, 'appendNotification');
            view.subView.appendUserError();
            expect(view.subView.model.appendNotification).toHaveBeenCalled();
        });

        it('On append server error subView\'s model should append notification', function () {
            spyOn(view.subView.model, 'appendNotification');
            view.subView.appendServerError('test');
            expect(view.subView.model.appendNotification).toHaveBeenCalled();
        });

        it('On append success when errors are exists subView\'s model should remove errors', function () {
            spyOn(view.subView.model, 'resetNotifications');
            view.subView.appendServerError('test');
            view.subView.appendSuccess('test');
            expect(view.subView.model.resetNotifications).toHaveBeenCalled();
        });

        it('On append error when successes are exists subView\'s model should remove successes', function () {
            spyOn(view.subView.model, 'resetNotifications');
            view.subView.appendSuccess('test');
            view.subView.appendServerError('test');
            expect(view.subView.model.resetNotifications).toHaveBeenCalled();
        });

    });
});
