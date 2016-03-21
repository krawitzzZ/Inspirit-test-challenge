define(function (require) {
    describe('First task subModel class', function () {
        var Model = require('../../js/components/firstTask/notifications/model');
        var EventEmitter = require('EventEmitter');

        it('Create an instance with default properties', function () {
            var model = new Model();
            expect(model).toBeDefined();
            expect(model.notices).toEqual([]);
        });

        it('Inherits from EventEmitter', function () {
            var model = new Model(),
                eventEmitter = new EventEmitter();

            expect(model.prototype).toBe(eventEmitter.prototype);
        });
        it('appendNotification() append new notification to notices array', function () {
            var model = new Model();

            var newNotice = {
                noticeClass: 'alert-success',
                text: 'All is fine'
            };

            model.appendNotification(newNotice);
            expect(model.notices.length).toEqual(1);
            expect(model.notices).toEqual([{
                    noticeClass: 'alert-success',
                    text: 'All is fine'
                }]);
        });

        it('resetNotifications() reset all notifications in notices array', function () {
            var model = new Model();

            var newNotice = {
                noticeClass: 'alert-success',
                text: 'All is fine'
            };

            model.appendNotification(newNotice);
            expect(model.notices.length).toEqual(1);
            expect(model.notices).toEqual([{
                noticeClass: 'alert-success',
                text: 'All is fine'
            }]);
            model.resetNotifications();
            expect(model.notices).toEqual([]);
        });
    });
});
