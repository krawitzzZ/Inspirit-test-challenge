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

    return that;
});

//1. Find error with AJAX "No Content" : done
//2. Hash - routes : done
//3. Success/error - view/model  - array of strings - sub views
