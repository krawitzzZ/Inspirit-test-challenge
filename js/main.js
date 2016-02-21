$(document).ready(function () {
(function () {

    /////////////////////////////////
    ///Classes
    /////////////////////////////////

///first task class constructor
    function NotificationManager(parentDivForNoticesAsObject) {
        this.parentDivAsObj = parentDivForNoticesAsObject;
        this._noticeDivAsObj = $('.errorBlock');
        this._notificationDiv = '<div class="errorBlock child"></div>';
        this._errorCount = 0;
    }

///and his methods in prototype
    NotificationManager.prototype = {
        constructor : NotificationManager,

    ///show error notification
        showErrorNotification : function (text) {

            var _this = this,
                error = '<div class="error">' + text + '</div>';

        ///add parent div and error message if they are not visible in DOM
            if (!this._noticeDivAsObj.is(':visible')) {

                this.parentDivAsObj.append(this._notificationDiv);
                this._noticeDivAsObj = $('.errorBlock');
                this._noticeDivAsObj.prepend(error);
                this._errorCount++;
                this.parentDivAsObj.find('button').removeAttr('disabled');

            } else {

            ///add more error messages until they are 5 in sum
                if (this._errorCount < 5) {

                    this._noticeDivAsObj.prepend(error);
                    this._errorCount++;
                    this.parentDivAsObj.find('button').removeAttr('disabled');

                } else {

                ///hide the oldest error and add new one
                    var errorBlock = $('.error');
                    errorBlock.eq(4).css({"transform" : "translateX(850px)"})
                                    .animate({"opacity" : 1}, 350).queue(function () {
                                        $(this).detach();
                                        $(this).dequeue();
                                    });

                    setTimeout(function () {
                        _this._noticeDivAsObj.prepend(error);
                        _this._errorCount = 5;
                        _this.parentDivAsObj.find('button').removeAttr('disabled');
                    }, 350);

                }
            }
        },

    ///show success notification
        showSuccessNotification : function (text) {

            var _this = this,
                input = this.parentDivAsObj.find('input'),
                success = '<div class="success">' + text + '</div>';

        ///clear input
            input.val('');

        ///add parent div and success message if they are not visible in DOM
            if (!this._noticeDivAsObj.is(':visible')) {

                this.parentDivAsObj.append(this._notificationDiv);
                this._noticeDivAsObj = $('.errorBlock');
                this._noticeDivAsObj.prepend(success);

            ///hide success notification with delay in 2 seconds
                hideSuccess();

            } else {

                var oddErrors = $('.error:odd'),
                    evenErrors = $('.error:even');

                this.parentDivAsObj.find('button').text('Submit');

            ///hide error notifications, show success message and then hide it
                evenErrors.css({"transform" : "translateX(850px)"})
                    .animate({"opacity" : 1}, 350).queue(function () {
                        $(this).detach();
                        $(this).dequeue();
                    });
                oddErrors.css({"transform" : "translateX(-850px)"})
                    .animate({"opacity" : 1}, 350).queue(function () {
                        $(this).detach();
                        $(this).dequeue();
                    });

                setTimeout(function () {
                    _this._noticeDivAsObj.prepend(success);
                }, 350);

                hideSuccess();

            }

        ///private function for hiding success message
            function hideSuccess() {

                setTimeout(function () {
                    var successMessage = $('.success');
                    successMessage.css({"transform" : "translateY(1350px)"})
                        .animate({"opacity" : 1}, 600).queue(function () {
                            $(this).detach();
                            _this._noticeDivAsObj.detach();
                            _this.parentDivAsObj.find('button').removeAttr('disabled');
                            $(this).dequeue();
                        });
                }, 2000);

            }
        }
    };

///second task class constructor
    function ErrorCounter() {
        this.successes = 0;
        this.errors = 0;
        this.errorsSinceLastSuccess = 0;
        this.failsPercents = '0%';
        this._clickCount = 0;
    }

///and his methods in prototype
    ErrorCounter.prototype = {
        constructor : ErrorCounter,

    ///count successes
        countSuccesses : function (bool) {
            if (bool) {
                this.successes++;
                this._clickCount++;
            }
        },

    ///count errors
        countErrors : function (bool) {
            if (!bool) {
                this.errors++;
                this._clickCount++;
            }
        },

    ///count errors since last success
        countErrorsSinceLastSuccess : function (bool) {
            if (!bool) {
                this.errorsSinceLastSuccess++;
            } else {
                this.errorsSinceLastSuccess = 0;
            }
        },

    ///calculate failures percents
        calculateFailsPercents : function () {
            this.failsPercents = ((this.errors * 100) / this._clickCount).toFixed(2) + '%';
        }
    };

///third task class constructor
    function FetchCounter(parentDivForFetchData) {
        this.parentDivForFetchDataAsObj = parentDivForFetchData;
        this._fetchListAsObj = $('.fetchList');
        this._fetchList = '<ul class="fetchList">' +
                              '<li>Fruit' +
                                  '<ul class="fruitList">' +
                                  '</ul>' +
                              '<li>Vegetables' +
                                  '<ul class="vegetableList">' +
                                  '</ul>' +
                              '</li>' +
                          '</ul>';
        this._fruitListAsObj = $('.fruitList');
        this._vegetableListAsObj = $('.vegetableList');
        this.cindOfProvision = [];
    }

///and his methods in prototype
    FetchCounter.prototype = {
        constructor : FetchCounter,

    ///show ul with 2 lists: fruits and vegetables if he is not visible in DOM
        showFetchList : function () {

            if (!this._fetchListAsObj.is(':visible')) {

                this.parentDivForFetchDataAsObj.append(this._fetchList);

            ///declare subLists
                this._fetchListAsObj = $('.fetchList');
                this._fruitListAsObj = $('.fruitList');
                this._vegetableListAsObj = $('.vegetableList');

            }
        },

    ///count and show fetch items after server response
        countAndShowFetchData : function (item, type) {

            var thisItem = $('.' + item),
                itemName = item.charAt(0).toUpperCase() + item.substr(1),
                manyItemsName = itemName;

            if (!(itemName.lastIndexOf('s') == itemName.length - 1)) {
                manyItemsName = itemName + 's';
            }

            if (!thisItem.is(':visible')) {

                this.cindOfProvision[item] = 1;

                switch (type) {
                    case 'fruit' : this._fruitListAsObj
                        .append('<li class="' + item + '">1 ' + itemName + '</li>');
                        break;
                    case 'vegetable' : this._vegetableListAsObj
                        .append('<li class="' + item + '">1 ' + itemName + '</li>');
                        break;
                }

            } else {
                this.cindOfProvision[item]++;
                thisItem.text(this.cindOfProvision[item] + ' ' + manyItemsName);
            }
        },

    ///hide fetchList and reset his counts
        hideFetchList : function () {
            this._fetchListAsObj.detach();
            this.cindOfProvision = [];
        }
    };

    /////////////////////////////////
    ///Variables
    /////////////////////////////////

///first challenge variables
    var formButton = $('#postResponse'),
        input = $('#simpleInput'),
        parentDivForNotices = $('#firstChallenge'),
        inputData = {},
        regExp = /^error$/i,
        notificationManager = new NotificationManager(parentDivForNotices);

///second challenge variables
    var buttonWrapper = $('#btnWrapper'),
        coloringButton = $('#responseCodes'),
        successList = $('#successes'),
        errorList = $('#fails'),
        errorsSinceSuccessList = $('#failsSinceSuccess'),
        failsPercentage = $('#failsPercentage'),
        response = {},
        counter = new ErrorCounter();

///third challenge variables
    var getFetchButton = $('#getFetch'),
        clearFetchButton = $('#clearFetch'),
        parentDivForFetch = $('#thirdChallenge'),
        fetchCounter = new FetchCounter(parentDivForFetch),
        fetchResponse = {};

    /////////////////////////////////
    ///Handlers
    /////////////////////////////////

///first challenge handler
    formButton.on('click', function (event) {
        event.preventDefault();
        $(this).attr('disabled', 'true');

        var inputValue = input.val();

        if (!inputValue) {
            $(this).text('Resubmit');
            notificationManager.showErrorNotification('Oops! Something wrong here.. try type "error"');                                                                                     //удалить потом
        } else {

            inputData.request = "any text";

            if (inputValue.search(regExp) == 0) {
                $(this).text('Resubmit');
                inputData.request = "error";
            }

            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var xhr = new XHR;
            xhr.open('POST', 'http://careers.intspirit.com/endpoint/post_response', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(inputData));
            xhr.onreadystatechange = function () {

            ///call errorNotification method depend on status of server response
                if (this.readyState != 4) return;
                switch (this.status) {
                    case 200 : notificationManager.showSuccessNotification(this.responseText);
                        break;
                    case 204 : notificationManager.showErrorNotification(this.statusText);
                        break;
                    default : notificationManager.showErrorNotification(this.status + ': ' + this.statusText);
                }
            }
        }
    }); ///end of postButton click

///second challenge handler
    coloringButton.on('click', function (event) {
        event.preventDefault();
        $(this).attr('disabled', 'true');

        $.ajax({
            url: 'http://careers.intspirit.com/endpoint/response_codes',
            dataType: 'json',
            success: function (data) {
                response = data;

                ///change div wrapper color depend on server response
                    buttonWrapper.removeClass('red green');
                    if (!response.result) buttonWrapper.addClass('red');
                    buttonWrapper.addClass('green');

                ///calculating errors, successes etc.
                    counter.countSuccesses(response.result);
                    counter.countErrors(response.result);
                    counter.countErrorsSinceLastSuccess(response.result);
                    counter.calculateFailsPercents();

                ///show errors, successes etc.
                    successList.text(counter.successes);
                    errorList.text(counter.errors);
                    errorsSinceSuccessList.text(counter.errorsSinceLastSuccess);
                    failsPercentage.text(counter.failsPercents);

                    coloringButton.removeAttr('disabled');
                }
            });
    }); ///end of coloringButton click

///third challenge handler
    getFetchButton.on('click', function (event) {
        event.preventDefault();
        $(this).attr('disabled', 'true');

        $.ajax({
            url: 'http://careers.intspirit.com/endpoint/data_set',
            dataType: 'json',
            success: function (data) {

                fetchResponse = data;

            ///show list with fruits and vegetables
                fetchCounter.showFetchList();
                fetchCounter.countAndShowFetchData(fetchResponse.item, fetchResponse.type);
                getFetchButton.removeAttr('disabled');

            }
        });
    }); ///end of getFetchButton click

///remove list with fruits and vegetables and they counts
    clearFetchButton.on('click', function (event) {
        event.preventDefault();
        fetchCounter.hideFetchList();
    }); ///end of clearFetchButton click

})(); ///end of script
}); ///end of document.ready
