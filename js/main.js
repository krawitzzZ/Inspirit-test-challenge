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
    'components/secondTask/controller'
], function (router, navigation) {

    router.init();
    navigation();

});