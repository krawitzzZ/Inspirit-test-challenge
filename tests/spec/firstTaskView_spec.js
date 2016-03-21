define(function (require) {
    describe('First task view class', function () {
        var Model = require('../../js/components/firstTask/model');
        var View = require('../../js/components/firstTask/view');
        var SubModel = require('../../js/components/firstTask/notifications/model');
        var SubView = require('../../js/components/firstTask/notifications/view');
        var BaseView = require('../../js/components/common/base_view');
        var global = require('global');
        var $ = require('jquery');

        it('Create an instance with called options', function () {
            var view = new View({}),
                eventsCount = 0;

            for (var key in view.events) {
                eventsCount++;
            }

            expect(typeof view.model).toBe('object');
            expect(typeof view.template).toBe('function');
            expect(typeof view.$el).toBe('object');
            expect(typeof view.events).toBe('object');
            expect(eventsCount).toEqual(1);
        });

        it('Inherits from BaseView', function () {
            var view = new View({}),
                baseView = new BaseView({});

            expect(view.prototype).toBe(baseView.prototype);
        });

        it('render() renders view\'s template and bind events', function () {
            var model = new Model();
            var subModel = new SubModel();
            var subView = new SubView({
                model: subModel,
                $el: '.notificationBlock'
            });
            var view = new View({
                model: model,
                subView: subView,
                $el: '#main'
            });

            var elemBeforeRender = global.document.getElementById('btn-submit-first');
            expect(elemBeforeRender).toBe(null);

            view.render();

            var elemAfterRender = global.document.getElementById('btn-submit-first');
            expect(elemAfterRender).not.toBe(null);
            expect(elemAfterRender).not.toBe(undefined);
            expect(typeof view.submit).toBe('function');
        });

        //it('submit() if input is filled receives response from server and change state of subView model', function () {
        //    var model = new Model();
        //    var subModel = new SubModel();
        //    var subView = new SubView({
        //        model: subModel,
        //        $el: '.notificationBlock'
        //    });
        //    var view = new View({
        //        model: model,
        //        subView: subView,
        //        $el: '#main'
        //    });
        //
        //    view.render();
        //
        //    var input = $(view.$.input);
        //    input.val('qwe');
        //
        //    spyOn(view.model, 'get').and.callFake(function () {
        //        var defer = $.Deferred();
        //        defer.resolve('success server response received');
        //        return defer.promise();
        //    });
        //
        //    spyOn(view.subView, 'appendSuccess');
        //
        //    var elem = global.document.getElementById('btn-submit-first');
        //    var event = new MouseEvent('click');
        //    elem.dispatchEvent(event);
        //    expect(view.subView.appendSuccess).toHaveBeenCalled();
        //});
    });
});
