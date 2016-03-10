require.config({
    paths: {
        jquery: 'vendors/jquery/dist/jquery.min',
        underscore: 'vendors/underscore/underscore-min',
        text: 'vendors/text/text'
    }
});

require([
    'components/router',
    'components/common/navigation'
], function (router, navigation) {

    router.init();
    navigation();
});