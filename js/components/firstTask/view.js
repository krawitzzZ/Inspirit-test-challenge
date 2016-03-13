define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        tmpl = require('text!./template.html'),
        BaseView = require('components/common/base_view'),
        Model = require('./model'),
        ErrorController = require('./notifications/controller');

    function View() {
        BaseView.call(this, {
            model: new Model(),
            template: _.template(tmpl),
            $el: $('#main'),
            events: {
                'click #btn-submit-first': 'submit'
            }
        });

        this.$ = {
            input: '#firstTaskInput',
            btn: '#btn-submit-first',
            noticeBlock: '.notificationBlock'
        };

        this.errorController = new ErrorController({
            $el: this.$.noticeBlock
        });
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
                    that.errorController.appendNewSuccess(text);
                    that.errorController.showSuccess();
                })
                .fail(function (text) {
                    $btnSubmit.text('Resubmit');
                    that.errorController.appendServerError(text);
                    that.errorController.showErrors();
                })
                .always(function () {
                    $btnSubmit.removeAttr('disabled');
                });
        } else {
            $btnSubmit.text('Resubmit');
            that.errorController.appendUserError();
            that.errorController.showErrors();
        }
    };

    return View;
});
