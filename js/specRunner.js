require.config({
    paths: {
        jquery: 'vendors/jquery.min',
        underscore: 'vendors/underscore-min',
        text: 'vendors/text',
        crossroads: 'vendors/crossroads.min',
        signals: 'vendors/signals.min',
        global: 'components/common/global',
        EventEmitter: 'vendors/EventEmitter.min',
        //jasmine paths =====
        'jasmine': ['../tests/lib/jasmine'],
        'jasmine-html': ['../tests/lib/jasmine-html'],
        'jasmine-boot': ['../tests/lib/boot']
    },
    shim: {
        'jasmine-html': {
            deps : ['jasmine']
        },
        'jasmine-boot': {
            deps : ['jasmine', 'jasmine-html']
        }
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
    'global',
    'jasmine-boot'
], function (global) {

    //init jasmine specs =====
    require([
        '../tests/spec/firstTask_spec'
    ], function(){
        global.onload();
    });

});
