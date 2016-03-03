define(['jquery'], function ($) {

    var ajaxRequest = {
        send: function (url, method, data, callback) {
            $.ajax({
                url: 'http://careers.intspirit.com/endpoint/' + url,
                type: method || 'GET',
                processData: false,
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (data, textStatus, xhr) {
                    return callback(data, textStatus, xhr);
                },
                error: function (xhr, textStatus, errorThrown) {
                    return callback(xhr, textStatus, errorThrown);
                }
            });
        }
    };
    return ajaxRequest;
});