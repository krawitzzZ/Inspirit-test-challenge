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
                    return callback(xhr, data);
                },
                error: function (xhr, textStatus) {
                    console.log(textStatus);
                }
            });
        }
    };
    return ajaxRequest;
});