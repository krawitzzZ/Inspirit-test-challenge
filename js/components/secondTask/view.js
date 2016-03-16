define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        tmpl = require('text!./template.html'),
        BaseView = require('components/common/base_view');

    function View(options) {
        BaseView.call(this, {
            model: options.model,
            template: _.template(tmpl),
            $el: $(options.$el),
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
