define([
    'jquery',
    '../../config'
], function ($, navBar) {
    var navigation;
    navigation = function () {
            navBar.mainPageSelectors.$navBar.on('click', function () {
                navBar.mainPageSelectors.$navBar.removeClass('active');
                $(this).addClass('active');
            })
        };
    return navigation
});