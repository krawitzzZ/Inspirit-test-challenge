define([], function () {

    var thirdTaskModel = {

        USER_ERROR: 'user error',
        ERROR: 'error',
        SUCCESS: 'success',
        ALERT_ERROR: 'alert alert-danger',
        ALERT_SUCCESS: 'alert alert-success',
        MAX_NOTICE_COUNT: 5,
        currentNoticeCount: 0,
        buttonText: 'Submit',
        inputData: {},
        noticeMessage: '',
        noticeClasses: '',
        incrementNotices: function () {
            if (this.currentNoticeCount >= this.MAX_NOTICE_COUNT) {
                return;
            }
            this.currentNoticeCount++;
            this.buttonText = 'Resubmit';
        },
        resetNoticeCount: function () {
            this.currentNoticeCount = 0;
            this.buttonText = 'Submit';
        },
        checkInputValue: function (inputValue) {
            if (!inputValue) {
                this.typeOfNotice = this.USER_ERROR;
                this.noticeMessage = 'Oops! Something wrong here..';
                this.noticeClasses = this.ALERT_ERROR;
                this.incrementNotices();
                return false;
            }
            this.inputData.request = inputValue;
            return true;
        },
        checkServerResponse: function (status, statusText, responseText) {
            if (status != 200) {
                this.incrementNotices();
                this.typeOfNotice = this.ERROR;
                this.noticeMessage = statusText;
                this.noticeClasses = this.ALERT_ERROR;
                return;
            }
            this.resetNoticeCount();
            this.typeOfNotice = this.SUCCESS;
            this.noticeMessage = responseText;
            this.noticeClasses = this.ALERT_SUCCESS;
        }
    };
    return thirdTaskModel;
});
