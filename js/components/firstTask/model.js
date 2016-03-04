define([], function () {

    var thirdTaskModel = {

        buttonText: 'Submit',
        currentNoticeCount: 0,
        MAX_NOTICE_COUNT: 5,
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
                this.noticeMessage = 'Oops! Something wrong here..';
                this.noticeClasses = 'alert alert-danger';
                this.incrementNotices();
                return false;
            }
            this.inputData.request = inputValue;
            return true;
        },
        checkServerResponse: function (status, statusText, responseText) {
            if (status != 200) {
                this.incrementNotices();
                this.noticeMessage = statusText;
                this.noticeClasses = 'alert alert-danger';
                return;
            }
            this.resetNoticeCount();
            this.noticeMessage = responseText;
            this.noticeClasses = 'alert alert-success';
        }
    };
    return thirdTaskModel;
});