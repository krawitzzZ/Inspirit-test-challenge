define([
    'components/common/ajaxAPI',
    'components/thirdTask/model',
    'components/thirdTask/view'
], function (ajax, model, view) {

    var thirdTaskController = {
        init: function () {
            view.render();
            this.bindEvents();
        },
        bindEvents: function () {
            this.showFetchData();
        },
        showFetchData: function () {
            document.body.onclick = function (event) {
                if (event.target.classList.contains('getFetch')) {
                    event.preventDefault();
                    event.target.setAttribute('disable', 'true');
                    ajax.send({url: 'data_set'}, function (response) {
                        var serverResponse = response.data;
                        model.addProduct(serverResponse.type, serverResponse.item);
                        view.render();
                        event.target.removeAttribute('disable');
                    });
                }
                if (event.target.classList.contains('clearFetch')) {
                    model.clearProducts();
                    view.render();
                }
            };
        }
    };
    return thirdTaskController;
});