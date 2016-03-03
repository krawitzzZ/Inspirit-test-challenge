define([
    'components/common/ajaxAPI',
    'components/secondTask/model',
    'components/secondTask/view'
], function (ajax, model, view) {

    var clickHandler = document.body.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('secondTaskButton')) {
            event.preventDefault();
            ajax.send('response_codes', function (xhr, data) {
                console.log(xhr);
            });
        }



        //event.target.setAttribute('disabled', 'true');
    });
    return clickHandler;
});