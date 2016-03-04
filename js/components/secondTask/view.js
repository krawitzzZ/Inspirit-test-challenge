define([
    'underscore',
    'text!components/secondTask/template.html',
    'components/secondTask/model',
    '../../config'
], function (_, template, model, config) {

    var secondTaskView = {
        compileTemplate: _.template(template),
        render: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate({
                wrapperColor: model.wrapperColor,
                successes: model.successes,
                failures: model.failures,
                failureSinceLastSuccess: model.failureSinceLastSuccess,
                failuresPercentage: model.failuresPercentage
            }));
        }
    };
    return secondTaskView;
});