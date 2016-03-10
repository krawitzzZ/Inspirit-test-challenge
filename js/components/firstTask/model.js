define(function (require) {
    var $ = require('jquery'),
        API = require('components/common/network/api');

    function Model() {

    }

    Model.prototype.get = function (value) {
        //var defer = $.Deferred();
        
        return API.postResponse(value);

        //API.postResponse(value).done(function (data, textStatus, jqXHR) {
        //    if (jqXHR.status === 200) {
        //        defer.resolve(data);
        //    }
        //    else if (jqXHR.status === 204) {
        //        defer.reject(jqXHR.statusText);
        //    }
        //}).fail(function (jqXHR, textStatus, errorThrown) {
        //    console.log(arguments);
        //    defer.reject('Unknown error');
        //});
        //return defer.promise();
    };

    return Model;


    // var firstTaskModel = {

    //     USER_ERROR: 'user error',
    //     ERROR: 'error',
    //     SUCCESS: 'success',
    //     ALERT_ERROR: 'alert alert-danger',
    //     ALERT_SUCCESS: 'alert alert-success',
    //     MAX_NOTICE_COUNT: 5,
    //     currentNoticeCount: 0,
    //     buttonText: 'Submit',
    //     noticeMessage: '',
    //     noticeClasses: '',
    //     inputData: {},
    //     incrementNotices: function () {
    //         if (this.currentNoticeCount >= this.MAX_NOTICE_COUNT) {
    //             return;
    //         }
    //         this.currentNoticeCount++;
    //         this.buttonText = 'Resubmit';
    //     },
    //     resetNoticeCount: function () {
    //         this.currentNoticeCount = 0;
    //         this.buttonText = 'Submit';
    //     },
    //     checkInputValue: function (inputValue) {
    //         if (!inputValue) {
    //             this.typeOfNotice = this.USER_ERROR;
    //             this.noticeMessage = 'Oops! Something wrong here..';
    //             this.noticeClasses = this.ALERT_ERROR;
    //             this.incrementNotices();
    //             return false;
    //         }
    //         this.inputData.request = inputValue;
    //         return true;
    //     },
    //     checkServerResponse: function (serverResponse) {
    //         if ((typeof serverResponse !== 'object') || !serverResponse.hasOwnProperty('status')) {
    //             this.incrementNotices();
    //             this.typeOfNotice = this.ERROR;
    //             this.noticeMessage = 'An internal error occurred';
    //             this.noticeClasses = this.ALERT_ERROR;
    //             return;
    //         }
    //         if (serverResponse.status !== 200) {
    //             this.incrementNotices();
    //             this.typeOfNotice = this.ERROR;
    //             this.noticeMessage = serverResponse.statusText;
    //             this.noticeClasses = this.ALERT_ERROR;
    //             return;
    //         }
    //         this.resetNoticeCount();
    //         this.typeOfNotice = this.SUCCESS;
    //         this.noticeMessage = serverResponse.responseText;
    //         this.noticeClasses = this.ALERT_SUCCESS;
    //     }
    // };
    // return firstTaskModel;
});
