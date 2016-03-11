define(function (require) {
    var View = require('./view'),
        Model = require('./model');

    function NotificationController(options) {
        this.$el = options.$el;
        this.model = new Model();
        this.view = new View({
            $el: this.$el
        });
    }

    NotificationController.prototype.appendUserError = function () {
        this.model.appendError(this.view.USER_ERROR_MESSAGE);
    };

    NotificationController.prototype.appendServerError = function (text) {
        this.model.appendError(text);
    };

    NotificationController.prototype.showSuccess = function (text) {
        this.model.resetErrors();
        this.view.showSuccessNotification(text);
    };

    NotificationController.prototype.showErrors = function (data) {
        this.view.showNewError(data);
    };

    return NotificationController;
});
