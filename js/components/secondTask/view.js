define([
    'jquery',
    'underscore',
    'text!components/secondTask/template.html',
    '../../config'
], function ($, _, template, config) {

    var secondTaskView;
    secondTaskView = {
        compileTemplate: _.template(template),
        render: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate())
        }
    };
    return secondTaskView;
});