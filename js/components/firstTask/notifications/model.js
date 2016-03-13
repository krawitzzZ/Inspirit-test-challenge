define(function (require) {

    function NotificationModel() {
        this.errors = [];
        this.successes = [];
    }

    NotificationModel.prototype.appendError = function (errorText) {
        this.errors.push(errorText);
    };

    NotificationModel.prototype.resetErrors = function () {
        this.errors = [];
    };

    NotificationModel.prototype.appendSuccess = function (successText) {
        this.successes.push(successText);
    };

    NotificationModel.prototype.resetSuccesses = function () {
        this.successes = [];
    };

    return NotificationModel;
});
