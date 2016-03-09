describe("Second task model test", function () {

    beforeEach(function () {
        secondTaskModel.successes = 0;
        secondTaskModel.failures = 0;
        secondTaskModel.failureSinceLastSuccess = 0;
        secondTaskModel.failuresPercentage = 0;
        secondTaskModel.clickCount = 0;
        secondTaskModel.wrapperColor = '';
    });

    it("if response equal 'true', color wrapper must be green", function () {
        secondTaskModel.paintWrapper(true);
        expect(secondTaskModel.wrapperColor).toEqual('green');
        expect(secondTaskModel.wrapperColor).not.toEqual('red');
        secondTaskModel.paintWrapper(undefined);
        expect(secondTaskModel.wrapperColor).toEqual('green');
    });

    it("if response equal 'false', color wrapper must be red", function () {
        secondTaskModel.paintWrapper(false);
        expect(secondTaskModel.wrapperColor).toEqual('red');
        expect(secondTaskModel.wrapperColor).not.toEqual('green');
        secondTaskModel.paintWrapper(undefined);
        expect(secondTaskModel.wrapperColor).toEqual('red');
    });

    it("success iteration must be with step equal 1, success iteration do not affects failures", function () {
        secondTaskModel.successCounter(true);
        expect(secondTaskModel.successes).toEqual(1);
        expect(secondTaskModel.successes).not.toEqual(2);
        expect(secondTaskModel.failures).toEqual(0);
        secondTaskModel.successCounter(undefined);
        expect(secondTaskModel.successes).toEqual(1);
        expect(secondTaskModel.failures).toEqual(0);
    });

    it("fails iteration must be with step equal 1, success iteration do not affects successes", function () {
        secondTaskModel.failCounter(false);
        expect(secondTaskModel.failures).toEqual(1);
        expect(secondTaskModel.failures).not.toEqual(2);
        expect(secondTaskModel.successes).toEqual(0);
        secondTaskModel.failCounter(undefined);
        expect(secondTaskModel.successes).toEqual(0);
        expect(secondTaskModel.failures).toEqual(1);
    });

    it("When response is 'true' fails since last success counter must reset itself", function () {
        secondTaskModel.failureSinceLastSuccess = 5;
        secondTaskModel.failSinceSuccessCounter(true);
        expect(secondTaskModel.failureSinceLastSuccess).toEqual(0);
        secondTaskModel.failSinceSuccessCounter(undefined);
        expect(secondTaskModel.failureSinceLastSuccess).toEqual(0);
    });

});

describe("First task model tests", function () {

    beforeEach(function () {
        firstTaskModel.currentNoticeCount = 0;
        firstTaskModel.buttonText = 'Submit';
        firstTaskModel.noticeMessage = '';
        firstTaskModel.noticeClasses = '';
    });

    it("If response is 'undefined' or do not have property 'status' - increment errors", function () {
        firstTaskModel.checkServerResponse(undefined);
        expect(firstTaskModel.currentNoticeCount).toEqual(1);
        expect(firstTaskModel.typeOfNotice).toEqual(firstTaskModel.ERROR);
        expect(firstTaskModel.noticeClasses).toEqual(firstTaskModel.ALERT_ERROR);
        expect(firstTaskModel.noticeMessage).toEqual('An internal error occurred');

        firstTaskModel.checkServerResponse({statusText: '123'});
        expect(firstTaskModel.currentNoticeCount).toEqual(2);
        expect(firstTaskModel.typeOfNotice).toEqual(firstTaskModel.ERROR);
        expect(firstTaskModel.noticeClasses).toEqual(firstTaskModel.ALERT_ERROR);
        expect(firstTaskModel.noticeMessage).toEqual('An internal error occurred');
    });

});