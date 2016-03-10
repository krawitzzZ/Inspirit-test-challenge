define(function (require) {
    var crossroads = require('crossroads'),
        global = require('global'),
        //controllerFactory = require('components/common/controller_factory'),
        MainView = require('./common/main_view'),
        View1 = require('./firstTask/view'),
        Model1 = require('./firstTask/model');

    var mainView;

    return {
        init: function () {
            global.addEventListener('hashchange', function () {
                var route = '/';
                var hash = global.location.hash;
                if (hash.length > 0) {
                    route = hash.split('#').pop();
                }
                crossroads.parse(route);
            });

            // trigger hashchange on first page load
            global.dispatchEvent(new CustomEvent('hashchange'));


            mainView = new MainView();

            crossroads.addRoute('/first', function () {
                var model = new Model1();
                console.log(model);
                var view = new View1({
                    model: model
                });
                mainView.showView(view);
            });

            crossroads.addRoute('/second', function () {
                alert(2);
            });

            crossroads.addRoute('/third', function () {
                alert(3);
            });

            //this.routes = config.TaskFilter;
            //this.checkHash();
            //window.onhashchange = this.renderHash.bind(this);
        }
        // checkHash: function () {
        //     if (location.hash) {
        //         location.hash = '';
        //     }
        //     this.renderHash();
        // },
        // renderHash: function () {
        //     if (location.hash === this.routes.first) {
        //         firstTaskController.init();
        //     }
        //     if (location.hash === this.routes.second) {
        //         secondTaskController.init();
        //     }
        //     if (location.hash === this.routes.third) {
        //         thirdTaskController.init();
        //     }
        // }
    };
});


/*

  first: '#firstTask',
            second: '#secondTask',
            third: '#thirdTask'

window.addEventListener('hashchange', function () {
        var route = '/';
        var hash = window.location.hash;
        if (hash.length > 0) {
            route = hash.split('#').pop();
        }
        crossroads.parse(route);
    });

    // trigger hashchange on first page load
    window.dispatchEvent(new CustomEvent('hashchange'));

 */

