define(function (require) {
    var crossroads = require('crossroads'),
        global = require('global'),
        MainView = require('./common/main_view'),
        View1 = require('./firstTask/view'),
        View2 = require('./secondTask/view'),
        View3 = require('./thirdTask/view'),
        Model1 = require('./firstTask/model'),
        Model2 = require('./secondTask/model'),
        Model3 = require('./thirdTask/model'),
        SubView1 = require('./firstTask/notifications/view'),
        SubModel1 = require('./firstTask/notifications/model');

    var mainView;

    return {
        init: function () {
            this.clearHash = (function() {
                history.pushState('', '', global.location.pathname);
            })();

            global.addEventListener('hashchange', function () {
                var route = '/';
                var hash = global.location.hash;
                if (hash.length > 0) {
                    route = hash.split('#').pop();
                }
                crossroads.parse(route);
            });

            mainView = new MainView();

            crossroads.addRoute('/first', function () {
                var model = new Model1(),
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
            });

            crossroads.addRoute('/second', function () {
                var model = new Model2(),
                    view = new View2({
                        model: model,
                        $el: '#main'
                    });

                mainView.showView(view);
            });

            crossroads.addRoute('/third', function () {
                var model = new Model3(),
                    view = new View3({
                        model: model,
                        $el: '#main'
                    });

                mainView.showView(view);
            });
        }
    };
});
