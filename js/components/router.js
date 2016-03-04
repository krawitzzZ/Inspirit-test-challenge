define([
    '../config',
    'components/firstTask/controller',
    'components/secondTask/controller',
    'components/thirdTask/controller'
], function (config, firstTaskController, secondTaskController, thirdTaskController) {

    var router;
    router = {
        init: function () {
            this.routes = config.TaskFilter;
            this.checkHash();
            window.onhashchange = this.renderHash.bind(this);
        },
        checkHash: function () {
            if (location.hash) {
                location.hash = '';
            }
            this.renderHash();
        },
        renderHash: function () {
            if (location.hash === this.routes.first) {
                firstTaskController.init();
            }
            if (location.hash === this.routes.second) {
                secondTaskController.init();
            }
            if (location.hash === this.routes.third) {
                thirdTaskController.init();
            }
        }
    };
    return router;
});

