define([
    'jquery',
    'underscore',
    'text!components/firstTask/template.html',
    'components/firstTask/model',
    '../../config'
], function ($, _, template, model, config) {

    var firstTaskView = {
        compileTemplate: _.template(template),
        init: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate());
            this.$notificationBlock = $('.notificationBlock');
            this.$button = $('.firstTaskButton').text(model.buttonText);
        },
        throwNotification: function () {
            if (this.$notificationBlock.children().size() === model.MAX_NOTICE_COUNT) {
                this.$notificationBlock.children().last().remove();
            }
            var $newNotification = $('<div>').addClass(model.noticeClasses).text(model.noticeMessage);

            switch (model.typeOfNotice) {
                case model.USER_ERROR:
                    this.$notificationBlock.prepend($newNotification);
                    break;
                case model.ERROR:
                    this.$notificationBlock.prepend($newNotification);
                    break;
                case model.SUCCESS:
                    this.$notificationBlock.children().remove();
                    this.$notificationBlock.prepend($newNotification);
                    this.$notificationBlock.children().delay(900).fadeOut('normal', function () {
                        $(this).remove();
                    });
                    break;
                default:
                    $newNotification = $('<div>').addClass(model.ALERT_ERROR).text('An internal error occurred');
                    this.$notificationBlock.prepend($newNotification);
            }
            this.$button.text(model.buttonText);
        }
    };
    return firstTaskView;
});