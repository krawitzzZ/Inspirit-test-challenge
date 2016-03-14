define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        tmpl = require('text!./template.html'),
        BaseView = require('components/common/base_view'),
        Model = require('./model');

    function View() {
        BaseView.call(this, {
            model: new Model(),
            template: _.template(tmpl),
            $el: $('#main'),
            events: {
                'click #getFetch': 'getFetch',
                'click #clearFetch': 'clearFetch'
            }
        });
    }

    View.prototype = Object.create(BaseView.prototype);
    View.prototype.constructor = View;

    View.prototype.getFetch = function (e) {
        var $btnGet = $(e.target),
            that = this;

        e.preventDefault();
        $btnGet.attr('disabled', 'true');

        that.model.get()
        .done(function () {
            that.render();
        })
        .always(function () {
            $btnGet.removeAttr('disabled');
        });
    };

    View.prototype.clearFetch = function (e) {
        e.preventDefault();
        this.model.clearProducts();
        this.render();
    };

    return View;
});
