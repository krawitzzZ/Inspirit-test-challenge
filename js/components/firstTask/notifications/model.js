define(function (require) {
    var EventEmitter = require('EventEmitter');

    function NotificationModel() {
        EventEmitter.apply(this, arguments);
        this.notices = [];
    }

    NotificationModel.prototype = Object.create(EventEmitter.prototype);
    NotificationModel.prototype.constructor = NotificationModel;

    NotificationModel.prototype.appendNotification = function (options) {
        this.notices.unshift({
            noticeClass: options.noticeClass,
            text: options.text
        });
        this.emitEvent('change');
    };

    NotificationModel.prototype.resetNotifications = function () {
        this.notices = [];
    };

    return NotificationModel;
});
