define(function (require) {
    var $ = require('jquery');

    function NotificationView(options) {

        this.$el = options.$el;

        this.noticeClasses = {
            ALERT_ERROR: 'alert alert-danger',
            ALERT_SUCCESS: 'alert alert-success'
        };

        this.USER_ERROR_MESSAGE = 'Input field bust be filled';
        this.MAX_NOTICE_COUNT = 5;
    }

    NotificationView.prototype.showSuccessNotification = function (text) {
        var successNotification = $('<div>')
            .addClass(this.noticeClasses.ALERT_SUCCESS).text(text),
            el = $(this.$el);

        if (el.children().size() > 0) {
            el.children().remove();
        }

        el.append(successNotification);
        el.children().delay(1200).fadeOut('normal', function () {
            $(this).remove();
        });
    };

    NotificationView.prototype.showNewError = function (data) {
        var errors = data.errors,
            currentError = errors[errors.length - 1],
            errorNotification = $('<div>')
                .addClass(this.noticeClasses.ALERT_ERROR).text(currentError),
            el = $(this.$el);

        if (el.children().size() === this.MAX_NOTICE_COUNT) {
            el.children().last().remove();
        }

        el.prepend(errorNotification);
    };

    return NotificationView;
});
