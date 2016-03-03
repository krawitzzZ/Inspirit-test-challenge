define(['jquery'], function ($) {

    var ajaxRequest = {
        send: function (options, callback) {
            $.ajax({
                url: 'http://careers.intspirit.com/endpoint/' + options.url,
                type: options.method || 'GET',
                processData: false,
                contentType: 'application/json',
                data: JSON.stringify(options.data),
                success: function (data, textStatus, xhr) {
                    return callback({data: data, xhr: xhr});
                },
                error: function (xhr, textStatus) {
                    console.log(textStatus);
                }
            });
        }
    };
    return ajaxRequest;
});