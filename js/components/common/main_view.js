define(function (require) {
    var $ = require('jquery');

    function MainView() {
        this.view = null;
        this.$navBar = $('.nav li');

        var that = this;
        this.$navBar.on('click', function () {
            that.$navBar.removeClass('active');
            $(this).addClass('active');
        });
    }

    MainView.prototype.showView = function (view) {
        if (this.view) {
            this.view.dispose();
        }

        this.view = view;

        this.view.render();
    };

    return MainView;
});
