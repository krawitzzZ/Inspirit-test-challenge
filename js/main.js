require.config({
    paths: {
        jquery: 'vendors/jquery/dist/jquery.min',
        underscore: 'vendors/underscore/underscore-min',
        text: 'vendors/text/text',
        crossroads: 'vendors/crossroads.js/dist/crossroads.min',
        signals: 'vendors/js-signals/dist/signals.min',
        global: 'components/common/global',
        EventEmitter: 'vendors/eventEmitter/EventEmitter.min'
    },
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};

require(['components/router'], function (router) {
    router.init();
});
