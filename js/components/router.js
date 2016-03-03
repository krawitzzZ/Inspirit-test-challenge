define([
    '../config',
    'components/firstTask/view',
    'components/secondTask/controller',
    'components/thirdTask/view'
], function (config, firstTaskView, secondTaskController, thirdTaskView) {

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
                firstTaskView.render();
            }
            if (location.hash === this.routes.second) {
                secondTaskController.init();
            }
            if (location.hash === this.routes.third) {
                thirdTaskView.render();
            }
        }
    };
    return router;
});

