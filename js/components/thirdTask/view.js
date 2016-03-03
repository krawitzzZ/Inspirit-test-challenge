define([
    'jquery',
    'underscore',
    'text!components/thirdTask/template.html',
    '../../config'
], function ($, _, template, config) {

    var thirdTaskView;
    thirdTaskView = {
        compileTemplate: _.template(template),
        render: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate())
        }
    };
    return thirdTaskView;
});