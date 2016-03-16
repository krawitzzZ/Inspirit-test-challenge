define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        tmpl = require('text!./template.html'),
        BaseView = require('components/common/base_view');

    function NotificationView(options) {
        BaseView.call(this, {
            model: options.model,
            template: _.template(tmpl),
            $el: options.$el,
            events: {
                'change model': 'render'
            }
        });

        this.USER_ERROR_MESSAGE = 'Input field must be filled';
        this.MAX_ERRORS_COUNT = 5;
        this.noticeClasses = {
            success: 'alert-success',
            error: 'alert-danger'
        };
    }

    NotificationView.prototype = Object.create(BaseView.prototype);
    NotificationView.prototype.constructor = NotificationView;

    NotificationView.prototype.render = function () {
        var that = this,
            el = $(that.$el),
            noticesForShow = {};


        if (that.model.notices.length > that.MAX_ERRORS_COUNT) {
            noticesForShow.notices = _.first(that.model.notices, that.MAX_ERRORS_COUNT);
            el.html(that.template(noticesForShow));
        } else {
            el.html(that.template(that.model));
        }

        _.each(that.events, function (value, key) {
            var meta = key.split(' '),
                eventName = meta[0],
                selector = that[meta[1]],
                handler = that[value];

            if (!eventName) {
                throw new Error('no event name');
            }

            if (!selector) {
                throw new Error('no selector');
            }

            if (!handler) {
                throw new Error('no handler');
            }

            selector.once(eventName, $.proxy(handler, that));
        });
    };

    NotificationView.prototype.appendSuccess = function (text) {
        if (!this.isSuccessesExist()) {
            this.model.resetNotifications();
        }

        this.model.appendNotification({
            noticeClass: this.noticeClasses.success,
            text: text
        });
    };

    NotificationView.prototype.appendServerError = function (text) {
        if (this.isSuccessesExist()) {
            this.model.resetNotifications();
        }

        this.model.appendNotification({
            noticeClass: this.noticeClasses.error,
            text: text
        });
    };

    NotificationView.prototype.appendUserError = function () {
        if (this.isSuccessesExist()) {
            this.model.resetNotifications();
        }

        this.model.appendNotification({
            noticeClass: this.noticeClasses.error,
            text: this.USER_ERROR_MESSAGE
        });
    };

    NotificationView.prototype.isSuccessesExist = function () {
        var that = this,
            isExists = [];

        _.each(that.model.notices, function (notice) {
            if (notice.noticeClass === that.noticeClasses.success) {
                isExists.push(true);
            }
        });

        if (isExists.length > 0) {
            return true;
        } else {
            return false;
        }
    };

    return NotificationView;
});
