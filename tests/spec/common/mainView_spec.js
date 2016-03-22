define(function (require) {
    describe('Main view class', function () {
        var MainView = require('../../../js/components/common/main_view');
        var View = require('../../../js/components/secondTask/view');
        var Model = require('../../../js/components/secondTask/model');

        it('Create an instance of class and event listener on navigation elements', function () {
            var mainView = new MainView();

            expect(mainView.view).toBe(null);
            expect(typeof mainView.$navBar).toBe('object');
            expect(mainView.$navBar.hasClass('active')).toBe(false);

            mainView.$navBar.trigger('click');
            expect(mainView.$navBar.hasClass('active')).toBe(true);
        });

        it('showView() disposes current view if exists and renders new view as own', function () {
            var model = new Model();
            var view = new View({
                model: model,
                $el: '#main'
            });
            var mainView = new MainView();

            expect(mainView.view).toBe(null);

            mainView.showView(view);

            expect(mainView.view).not.toBe(null);
            expect(typeof mainView.view.render).toBe('function');

        });
    });
});
