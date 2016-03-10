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
        return $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            contentType: 'application/json',
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

    // var ajaxRequest = {
    //     send: function (options, callback) {
    //         return $.ajax({
    //             url: 'http://careers.intspirit.com/endpoint/' + options.url,
    //             type: options.method || 'GET',
    //             processData: false,
    //             contentType: 'application/json',
    //             data: JSON.stringify(options.data)
    //         });
    //     }
    // };
    // return ajaxRequest;
});
