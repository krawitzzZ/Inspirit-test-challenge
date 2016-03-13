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

    NotificationController.prototype.appendNewSuccess = function (text) {
        this.model.appendSuccess(text);
    };

    NotificationController.prototype.showSuccess = function () {
        this.model.resetErrors();
        this.view.showSuccessNotification(this.model);
    };

    NotificationController.prototype.showErrors = function () {
        this.model.resetSuccesses();
        this.view.showNewError(this.model);
    };

    return NotificationController;
});
