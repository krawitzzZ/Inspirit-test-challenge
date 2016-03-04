define([
    'components/common/ajaxAPI',
    'components/firstTask/model',
    'components/firstTask/view'
], function (ajax, model, view) {

    var firstTaskController = {
        init: function () {
            view.init();
            this.bindEvents();
        },
        bindEvents: function () {
            this.sendForm();
        },
        sendForm: function () {
            document.body.onclick = function (event) {
                if (event.target.classList.contains('firstTaskButton')) {
                    event.preventDefault();
                    event.target.setAttribute('disable', 'true');

                    var inputValue = document.getElementById('firstTaskInput').value;

                    if (!model.checkInputValue(inputValue)) {
                        view.throwNotification();
                        view.render();

                        //console.log(inputValue);
                        //console.log(model.currentNoticeCount);
                        //console.log(model.noticeClasses);
                        //console.log(model.noticeMessage);
                        return;
                    }


                    ajax.send({url: 'post_response', method: 'POST', data: model.inputData}, function (response) {
                        var serverResponse = response.xhr;
                        model.checkServerResponse(serverResponse.status, serverResponse.statusText, serverResponse.responseText);
                        //console.log(serverResponse.status, serverResponse.responseText, serverResponse.statusText);
                        //console.log(model.currentNoticeCount);
                        //console.log(model.noticeClasses);
                        //console.log(model.noticeMessage);

                        view.throwNotification();
                        view.render();
                        event.target.removeAttribute('disable');
                    });
                }
            };
        }
    };
    return firstTaskController;
});