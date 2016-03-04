define([
    'components/common/ajaxAPI',
    'components/secondTask/model',
    'components/secondTask/view'
], function (ajax, model, view) {

    var secondTaskController = {
        init: function () {
            view.render();
            this.bindEvents();
        },
        bindEvents: function () {
            this.getSuccessOrFail();
        },
        getSuccessOrFail: function () {
            document.body.onclick = function (event) {
                if (event.target.classList.contains('secondTaskButton')) {
                    event.preventDefault();
                    event.target.setAttribute('disable', 'true');
                    ajax.send({url: 'response_codes'}, function (response) {
                        var serverResponse = response.data.result;
                        model.paintWrapper(serverResponse);
                        model.clickCounter(serverResponse);
                        model.successCounter(serverResponse);
                        model.failCounter(serverResponse);
                        model.failSinceSuccessCounter(serverResponse);
                        model.failPercentageCounter(serverResponse);
                        view.render();
                        event.target.removeAttribute('disable');
                    });
                }
            };
        }
    };
    return secondTaskController;
});