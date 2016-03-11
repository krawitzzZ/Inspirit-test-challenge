define(['jquery'], function ($) {
    var that = {};

    that.get = function (url) {
        return $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            contentType: 'application/json'
        });
    };

    that.post = function (url, data) {
        console.log(JSON.stringify(data));
        return $.ajax({
            type: 'POST',
            url: url,
            data: data || {}
        });
    };

    that.put = function (url, data) {
        return $.ajax({
            type: 'PUT',
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            data: data || {}
        });
    };

    that.del = function (url) {
        return $.ajax({
            type: 'DELETE',
            url: url,
            dataType: 'json',
            contentType: 'application/json'
        });
    };

    return that;
});
