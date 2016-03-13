var firstTaskModel = {

    USER_ERROR: 'user error',
    ERROR: 'error',
    SUCCESS: 'success',
    ALERT_ERROR: 'alert alert-danger',
    ALERT_SUCCESS: 'alert alert-success',
    MAX_NOTICE_COUNT: 5,
    currentNoticeCount: 0,
    buttonText: 'Submit',
    noticeMessage: '',
    noticeClasses: '',
    inputData: {},
    incrementNotices: function () {
        if (this.currentNoticeCount >= this.MAX_ERRORS_COUNT) {
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
    checkServerResponse: function (serverResponse) {
        if ((typeof serverResponse !== 'object') || !serverResponse.hasOwnProperty('status')) {
            this.incrementNotices();
            this.typeOfNotice = this.ERROR;
            this.noticeMessage = 'An internal error occurred';
            this.noticeClasses = this.ALERT_ERROR;
            return;
        }
        if (serverResponse.status !== 200) {
            this.incrementNotices();
            this.typeOfNotice = this.ERROR;
            this.noticeMessage = serverResponse.statusText;
            this.noticeClasses = this.ALERT_ERROR;
            return;
        }
        this.resetNoticeCount();
        this.typeOfNotice = this.SUCCESS;
        this.noticeMessage = serverResponse.responseText;
        this.noticeClasses = this.ALERT_SUCCESS;
    }
};
