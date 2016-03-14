define(function (require) {
    var API = require('components/common/network/api');

    function Model() {
        this.clickCount = 0;
        this.successes = 0;
        this.failures = 0;
        this.failureSinceLastSuccess = 0;
        this.failuresPercentage = 0;
        this.wrapperColor = '';
    }

    Model.prototype.get = function () {
        return API.responseCodes();
    };

    Model.prototype.renderData = function (serverResponse) {
        this.paintWrapper(serverResponse);
        this.clickCounter();
        this.failCounter(serverResponse);
        this.failSinceSuccessCounter(serverResponse);
        this.failPercentageCounter(serverResponse);
    };

    Model.prototype.paintWrapper = function (serverResponse) {
        if (serverResponse) {
            this.wrapperColor = 'green';
        } else {
            this.wrapperColor = 'red';
        }
    };

    Model.prototype.clickCounter = function () {
        this.clickCount++;
    };

    Model.prototype.failCounter = function (serverResponse) {
        if (!serverResponse) {
            this.failures++;
        }
        else {
            this.successes++;
        }
    };

    Model.prototype.failSinceSuccessCounter = function (serverResponse) {
        if (!serverResponse) {
            this.failureSinceLastSuccess++;
        } else {
            this.failureSinceLastSuccess = 0;
        }
    };

    Model.prototype.failPercentageCounter = function () {
        this.failuresPercentage = ((this.failures * 100) / this.clickCount).toFixed(2);
    };

    return Model;
});
