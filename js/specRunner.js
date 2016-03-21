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
        '../tests/spec/firstTaskModel_spec',
        '../tests/spec/firstTaskView_spec',
        '../tests/spec/firstTaskSubModel_spec',
        '../tests/spec/firstTaskSubView_spec',
        '../tests/spec/secondTaskModel_spec',
        '../tests/spec/secondTaskView_spec',
        '../tests/spec/thirdTaskModel_spec',
        '../tests/spec/thirdTaskView_spec'
    ], function(){
        global.onload();
    });

});
