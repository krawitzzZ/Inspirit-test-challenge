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
                'click #btn-get-second': 'getResponse'
            }
        });
    }

    View.prototype = Object.create(BaseView.prototype);
    View.prototype.constructor = View;

    View.prototype.getResponse = function (e) {
        var $btnGet = $(e.target),
            that = this;

        e.preventDefault();
        $btnGet.attr('disabled', 'true');

        that.model.get()
            .done(function (serverResponse) {
                that.model.renderData(serverResponse);
                that.render();
            })
            .fail(function (serverResponse) {
                that.model.renderData(serverResponse);
                that.render();
            })
            .always(function () {
                $btnGet.removeAttr('disabled');
            });
    };

    return View;
});
