require.config({
    paths: {
        jquery: 'vendors/jquery',
        underscore: 'vendors/underscore',
        text: 'vendors/text'
    }
});

require([
    'components/router',
    'components/common/navigation',
    'components/secondTask/view'
], function (router, navigation, secondTask) {

    router.init();
    navigation();

});