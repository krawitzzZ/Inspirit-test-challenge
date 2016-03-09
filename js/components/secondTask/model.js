define([], function () {
    var secondTaskModel = {
        successes: 0,
        failures: 0,
        failureSinceLastSuccess: 0,
        failuresPercentage: 0,
        clickCount: 0,
        wrapperColor: '',
        paintWrapper: function (serverResponse) {
            if (typeof serverResponse !== 'boolean') {
                return;
            }
            if (serverResponse) {
                this.wrapperColor = 'green';
            } else {
                this.wrapperColor = 'red';
            }
        },
        successCounter: function (serverResponse) {
            if (typeof serverResponse !== 'boolean') {
                return;
            }
            if (serverResponse) {
                this.successes++;
            }
        },
        failCounter: function (serverResponse) {
            if (typeof serverResponse !== 'boolean') {
                return;
            }
            if (!serverResponse) {
                this.failures++;
            }
        },
        failSinceSuccessCounter: function (serverResponse) {
            if (typeof serverResponse !== 'boolean') {
                return;
            }
            if (!serverResponse) {
                this.failureSinceLastSuccess++;
            } else {
                this.failureSinceLastSuccess = 0;
            }
        },
        failPercentageCounter: function () {
            this.failuresPercentage = ((this.failures * 100) / this.clickCount).toFixed(2);
        },
        clickCounter: function () {
            this.clickCount++;
        }
    };
    return secondTaskModel;
});