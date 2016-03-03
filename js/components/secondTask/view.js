define([
    'jquery',
    'underscore',
    'text!components/secondTask/template.html',
    'components/secondTask/model',
    'components/secondTask/controller',
    '../../config'
], function ($, _, template, model, controller, config) {

    var secondTaskView = {
        compileTemplate: _.template(template),
        init: function () {
            this.render();
            controller.init();
        },
        render: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate({
                wrapperColor: model.wrapperColor,
                successes: model.successes,
                failures: model.failures,
                failureSinceLastSuccess: model.failureSinceLastSuccess,
                failuresPercentage: model.failuresPercentage
            }))
        }
    };
    return secondTaskView;
});