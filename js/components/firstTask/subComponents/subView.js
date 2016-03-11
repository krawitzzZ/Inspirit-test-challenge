define(function (require) {
    var $ = require('jquery'),
        BaseView = require('components/common/base_view');

    function SubView(options) {
        BaseView.apply(this, arguments);

        this.typeOfNotice = {
            USER_ERROR: 'user error',
            ERROR: 'error',
            SUCCESS: 'success'
        };

        this.noticeClasses = {
            ALERT_ERROR: 'alert alert-danger',
            ALERT_SUCCESS: 'alert alert-success'
        };

        this.userErrorMsg = 'Input field bust be filled';
        this.MAX_NOTICE_COUNT = 5;
    }

    SubView.prototype = Object.create(BaseView.prototype);
    SubView.prototype.constructor = SubView;

    SubView.prototype.addError = function (text) {
        this.model.appendError(text);
    };

    SubView.prototype.showErrors = function () {
        if (this.model.errors.length >= this.MAX_NOTICE_COUNT) {

        }
    };

    SubView.prototype.showSuccess = function (text) {

    };









    return SubView;

});
