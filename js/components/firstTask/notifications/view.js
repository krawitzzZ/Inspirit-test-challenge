define(function (require) {
    var $ = require('jquery');

    function NotificationView(options) {

        this.$el = options.$el;

        this.noticeClasses = {
            ALERT_ERROR: 'alert alert-danger',
            ALERT_SUCCESS: 'alert alert-success'
        };

        this.USER_ERROR_MESSAGE = 'Input field bust be filled';
        this.MAX_ERRORS_COUNT = 5;
        this.MAX_SUCCESSES_COUNT = 3;
    }

    NotificationView.prototype.showSuccessNotification = function (model) {
        var el = $(this.$el),
            successes = model.successes,
            currentSuccess = successes[successes.length - 1],
            successNotification = $('<div>')
            .addClass(this.noticeClasses.ALERT_SUCCESS).text(currentSuccess);

        //remove error notices
        el.children('.alert-danger').remove();

        if (el.children().size() === this.MAX_SUCCESSES_COUNT) {
            el.children().last().remove();
        }

        el.prepend(successNotification);
        el.children().delay(1200).fadeOut('normal', function () {
            $(this).remove();
        });
    };

    NotificationView.prototype.showNewError = function (model) {
        var el = $(this.$el),
            errors = model.errors,
            currentError = errors[errors.length - 1],
            errorNotification = $('<div>')
                .addClass(this.noticeClasses.ALERT_ERROR).text(currentError);

        if (el.children().size() === this.MAX_ERRORS_COUNT) {
            el.children().last().remove();
        }

        el.prepend(errorNotification);
    };

    return NotificationView;
});
