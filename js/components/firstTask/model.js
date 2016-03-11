define(function (require) {
    var API = require('components/common/network/api');

    function Model() {
    }

    Model.prototype.get = function (value) {
        return API.postResponse(value);
    };

    return Model;
});
