define([
    'jquery',
    'underscore',
    'text!components/firstTask/template.html',
    '../../config'
], function ($, _, template, config) {

    var firstTaskView;
    firstTaskView = {
        compileTemplate: _.template(template),
        render: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate())
        }
    };
    return firstTaskView;
});