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
    'config'
], function (router, navigation, config) {

    router.init();
    navigation();

});