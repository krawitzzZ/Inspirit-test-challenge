$(document).ready(function () {
(function () {

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

    ///method for show error notification
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

    ///method for show success notification
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






///first challenge variables
    var postButton = $('#postResponse'),
        input = $('#simpleInput'),
        parentDivForNotices = $('#firstChallenge'),
        inputData = {},
        regExp = /^error$/i,
        notificationManager = new NotificationManager(parentDivForNotices);

///first challenge handler
    postButton.on('click', function (event) {
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

})(); ///end of script
}); ///end of document.ready
