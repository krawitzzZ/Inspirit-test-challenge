define([
    'jquery',
    'underscore',
    'text!components/secondTask/secondTaskTemplate.html',
    'commonConfig'
], function ($, _, secondTaskTemplate, commonConfig) {

    var secondTaskView;
    secondTaskView = {
        compileTemplate: _.template(secondTaskTemplate),
        render: function () {
            commonConfig.queries.$parentEl.html(this.compileTemplate())
        }
    };
    return secondTaskView;
});