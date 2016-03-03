define([
    'jquery',
    'commonConfig'
], function ($, navBar) {
    var navigation;
    navigation = function () {
            navBar.queries.$navBar.on('click', function () {
                navBar.queries.$navBar.removeClass('active');
                $(this).addClass('active');
            })
        };
    return navigation
});