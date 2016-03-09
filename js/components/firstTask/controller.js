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
                    event.target.setAttribute('disabled', 'true');

                    var inputValue = document.getElementById('firstTaskInput').value;

                    if (!model.checkInputValue(inputValue)) {
                        view.throwNotification();
                        event.target.removeAttribute('disabled');
                        return;
                    }

                    ajax.send({url: 'post_response', method: 'POST', data: model.inputData}, function (response) {
                        var serverResponse = response.xhr;
                        model.checkServerResponse(serverResponse.status, serverResponse.statusText, serverResponse.responseText);
                        view.throwNotification();
                        event.target.removeAttribute('disabled');
                    });
                }
            };
        }
    };
    return firstTaskController;
});
