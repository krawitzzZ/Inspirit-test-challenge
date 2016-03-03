define([
    'jquery',
    'underscore',
    'text!components/firstTask/firstTaskTemplate.html',
    'commonConfig'
], function ($, _, firstTaskTemplate, commonConfig) {

    var firstTaskView;
    firstTaskView = {
        compileTemplate: _.template(firstTaskTemplate),
        render: function () {
            commonConfig.queries.$parentEl.html(this.compileTemplate())
        }
    };
    return firstTaskView;
});