define(function (require) {
    var crossroads = require('crossroads'),
        global = require('global'),
        MainView = require('./common/main_view'),
        View1 = require('./firstTask/view'),
        Model1 = require('./firstTask/model');

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
                var model = new Model1();
                var view = new View1({
                    model: model
                });
                mainView.showView(view);
            });

            crossroads.addRoute('/second', function () {
                console.log(2);
            });

            crossroads.addRoute('/third', function () {
                console.log(3);
            });
        }
    }
});
