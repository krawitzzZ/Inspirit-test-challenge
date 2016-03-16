define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        tmpl = require('text!./template.html'),
        BaseView = require('components/common/base_view');

    function View(options) {
        BaseView.call(this, {
            model: options.model,
            subView: options.subView,
            template: _.template(tmpl),
            $el: $(options.$el),
            events: {
                'click #btn-submit-first': 'submit'
            }
        });

        this.$ = {
            input: '#firstTaskInput'
        };
    }

    View.prototype = Object.create(BaseView.prototype);
    View.prototype.constructor = View;

    View.prototype.submit = function (e) {
        var $btnSubmit = $(e.target),
            that = this,
            value;

        e.preventDefault();

        value = $(that.$.input).val().trim();

        if (value) {
            $btnSubmit.attr('disabled', 'true');
            that.model.get(value)
            .done(function (text) {
                $btnSubmit.text('Submit');
                $(that.$.input).val('');
                that.subView.appendSuccess(text);
            })
            .fail(function (text) {
                $btnSubmit.text('Resubmit');
                that.subView.appendServerError(text);
            })
            .always(function () {
                $btnSubmit.removeAttr('disabled');
            });
        } else {
            $btnSubmit.text('Resubmit');
            that.subView.appendUserError();
        }
    };

    return View;
});
