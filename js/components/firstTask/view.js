define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        tmpl = require('text!./template.html'),
        BaseView = require('components/common/base_view'),
        SubView = require('./subComponents/subView'),
        Model = require('./model'),
        SubModel = require('./subComponents/subModel');

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

        this.subView = new SubView({
            model: new SubModel(),
            $el: this.noticeBlock
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


                    that.subView.showSuccess(text);
                    // cases
                    // 1. error -> success
                    // 2. success -> success
                    // TODO: call something private that handle success only

                    // reset sub views model
                    // render sub view

                })
                .fail(function (text) {

                    that.subView.addError(text);



                    // 1. error -> error
                    // 2. success -> error
                    // TODO: call something private that handle error only
                })
                .always(function () {
                    $btnSubmit.removeAttr('disabled');
                });
        } else {

            that.subView.addError(that.subView.userErrorMsg);













            // 1. error -> error
            // 2. success -> error
            // TODO: call something private that handle error only
        }
    };

    return View;
});

    //function SubModel() {
    //    this.errors = [];
    //}
    //
    //SubModel.prototype.reset = function () {
    //    this.errors = [];
    //};
    //
    //SubModel.prototype.append = function (text) {
    //    this.errors.push(text);
    //};
    //
    //
    //var subView = {
    //    showSuccess: function () {
    //        this.model.reset();
    //        this.render();
    //    },
    //
    //    appendError: function (text) {
    //        this.model.append(text);
    //        this.render();
    //    }
    //};






    // var firstTaskView = {
    //     compileTemplate: _.template(template),
    //     init: function () {
    //         config.mainPageSelectors.$parentEl.html(this.compileTemplate());
    //         this.$notificationBlock = $('.notificationBlock');
    //         this.$button = $('.firstTaskButton').text(model.buttonText);
    //     },
    //     throwNotification: function () {
    //         if (this.$notificationBlock.children().size() === model.MAX_NOTICE_COUNT) {
    //             this.$notificationBlock.children().last().remove();
    //         }
    //         var $newNotification = $('<div>').addClass(model.noticeClasses).text(model.noticeMessage);

    //         switch (model.typeOfNotice) {
    //             case model.USER_ERROR:
    //                 this.$notificationBlock.prepend($newNotification);
    //                 break;
    //             case model.ERROR:
    //                 this.$notificationBlock.prepend($newNotification);
    //                 break;
    //             case model.SUCCESS:
    //                 this.$notificationBlock.children().remove();
    //                 this.$notificationBlock.prepend($newNotification);
    //                 this.$notificationBlock.children().delay(900).fadeOut('normal', function () {
    //                     $(this).remove();
    //                 });
    //                 break;
    //             default:
    //                 this.$notificationBlock.prepend($newNotification);
    //         }
    //         this.$button.text(model.buttonText);
    //     }
    // };
    // return firstTaskView;

