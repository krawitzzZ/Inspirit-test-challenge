define(function (require) {
    var crossroads = require('crossroads'),
        global = require('global'),
        MainView = require('./common/main_view'),
        View1 = require('./firstTask/view'),
        View2 = require('./secondTask/view');

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
                var view = new View1();
                mainView.showView(view);
            });

            crossroads.addRoute('/second', function () {
                var view = new View2();
                mainView.showView(view);
            });

            crossroads.addRoute('/third', function () {
                console.log(3);
            });
        }
    };
});
