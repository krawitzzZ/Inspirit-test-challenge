define([
    'jquery',
    'underscore',
    'text!components/thirdTask/template.html',
    'components/thirdTask/model',
    '../../config'
], function ($, _, template, model, config) {

    var thirdTaskView = {
        compileTemplate: _.template(template),
        render: function () {
            config.mainPageSelectors.$parentEl.html(this.compileTemplate({
                products: model.productsExist,
                fruits: model.fruits,
                vegetables: model.vegetables
            }));
        }
    };
    return thirdTaskView;
});