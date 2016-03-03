define([
    'components/common/ajaxAPI',
    'components/secondTask/model',
    'components/secondTask/view'
], function (ajax, model, view) {

    var secondTaskController = {
        init: function () {
            document.body.addEventListener('click', function (event) {
                if (!event.target.classList.contains('secondTaskButton')) {
                    return;
                }
                event.preventDefault();
                event.target.setAttribute('disable', 'true');
                ajax.send({url: 'response_codes'}, function (response) {
                    var serverResponse = response.data;
                    console.log(serverResponse.result);
                    model.paintWrapper(serverResponse.result);
                    model.clickCounter(serverResponse.result);
                    model.successCounter(serverResponse.result);
                    model.failCounter(serverResponse.result);
                    model.failSinceSuccessCounter(serverResponse.result);
                    model.failPercentageCounter(serverResponse.result);
                    //view.render();
                    event.target.removeAttribute('disable');
                });

            });
        }
    };
    return secondTaskController;
});