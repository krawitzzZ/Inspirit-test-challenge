define(function (require) {

    function NotificationModel() {
        this.errors = [];
    }

    NotificationModel.prototype.appendError = function (errorText) {
        this.errors.push(errorText);
    };

    NotificationModel.prototype.resetErrors = function () {
        this.errors = [];
    };

    return NotificationModel;
});
