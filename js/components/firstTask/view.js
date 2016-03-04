define([
    'jquery',
    'underscore',
    'text!components/firstTask/template.html',
    'components/firstTask/model',
    '../../config'
], function ($, _, template, model, config) {

    var firstTaskView = {
        compileTemplate: _.template(template),
        throwNotification: function () { //check mistakes
            var $newNotification = $('<div>');
            $newNotification.addClass(model.noticeClasses);
            $newNotification.text(model.noticeMessage);
            this.$notificationBlock.prepend($newNotification);
        },
        init: function () {
            this.$notificationBlock = $('.notificationBlock');
            config.mainPageSelectors.$parentEl.html(this.compileTemplate({buttonText: model.buttonText}));
        },
        render: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate({
                buttonText: model.buttonText
            }));
        }
    };
    return firstTaskView;
});