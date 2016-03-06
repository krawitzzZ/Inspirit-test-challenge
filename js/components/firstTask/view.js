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
            if (this.$notificationBlock.children().size() == model.MAX_NOTICE_COUNT) {
                this.$notificationBlock.children().last().remove();
            }
            var $newNotification = $('<div>').addClass(model.noticeClasses).text(model.noticeMessage);
            this.$notificationBlock.prepend($newNotification);
            this.$button.text(model.buttonText);
        }
    };
    return firstTaskView;
});


//1. сделать общий конфиг с константами, где будут текстовые названия узлов
//2. в модель добить typeOfNotification: 'userError' || 'error' || 'success'
//и в зависимости от этого во view сделать switch в throwNotification
