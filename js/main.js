require.config({
    paths: {
        jquery: 'vendors/jquery.min',
        underscore: 'vendors/underscore-min',
        text: 'vendors/text',
        crossroads: 'vendors/crossroads.min',
        signals: 'vendors/signals.min',
        global: 'components/common/global',
        EventEmitter: 'vendors/EventEmitter.min'
    }
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require([
    'components/router'
], function (router) {

    router.init();
});
