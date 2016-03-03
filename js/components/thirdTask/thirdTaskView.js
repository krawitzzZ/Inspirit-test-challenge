define([
    'jquery',
    'underscore',
    'text!components/thirdTask/thirdTaskTemplate.html',
    'commonConfig'
], function ($, _, thirdTaskTemplate, commonConfig) {

    var thirdTaskView;
    thirdTaskView = {
        compileTemplate: _.template(thirdTaskTemplate),
        render: function () {
            commonConfig.queries.$parentEl.html(this.compileTemplate())
        }
    };
    return thirdTaskView;
});