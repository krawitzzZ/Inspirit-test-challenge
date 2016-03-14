define(function (require) {
    var $ = require('jquery'),
        ajax = require('./ajax'),
        baseUrl = 'http://careers.intspirit.com/endpoint';
    
    var that = {};

    that.postResponse = function (value) {
        var defer = $.Deferred();

        ajax.post(baseUrl + '/post_response', {
            request: value
        }).done(function (data, textStatus, jqXHR) {
            if (jqXHR.status === 200) {
                defer.resolve(data);
            }
            else if (jqXHR.status === 204) {
                defer.reject(jqXHR.statusText);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(arguments);
            defer.reject('Unknown error');
        });

        return defer.promise();
    };

    that.responseCodes = function () {
        var defer = $.Deferred();

        ajax.get(baseUrl + '/response_codes')
        .done(function (data) {
            if (data.result === true) {
                defer.resolve(true);
            }
            else if (data.result === false) {
                defer.reject(false);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(arguments);
            defer.reject('Unknown error');
        });

        return defer.promise();
    };

    that.dataSet = function () {
        var defer = $.Deferred();

        ajax.get(baseUrl + '/data_set')
            .done(function (data) {
                defer.resolve(data);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(arguments);
                defer.reject('Unknown error');
        });

        return defer.promise();
    };

    return that;
});
