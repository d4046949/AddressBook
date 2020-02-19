"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventTopic = /** @class */ (function () {
    function EventTopic(eventName, event) {
        var _this = this;
        this.eventName = eventName;
        this.subscribers = new Array();
        this.notify = function (args) {
            _this.subscribers.forEach(function (item) {
                item.callback(args);
            });
        };
        this.add = function (eventDetails) { _this.subscribers.push(eventDetails); };
        this.remove = function (id) {
            var subscription = _this.subscribers.findIndex(function (x) { return x.id === id; });
            if (subscription !== -1) {
                _this.subscribers.splice(subscription, 1);
            }
            else {
                console.warn('cant find id');
            }
        };
        this.subscribers.push(event);
    }
    return EventTopic;
}());
var EventBus = /** @class */ (function () {
    function EventBus() {
        var _this = this;
        this.listener = new Array();
        this.trigger = function (name, args) {
            var subscriptor = _this.listener.find(function (x) { return x.eventName === name; });
            if (subscriptor) {
                subscriptor.notify(args);
            }
        };
        this.subscribe = function (topic, callback) {
            var uniquieId = _this.generateRandom();
            var subscriptor = _this.listener.find(function (x) { return x.eventName === topic; });
            subscriptor
                ? subscriptor.add({ id: uniquieId, callback: callback })
                : _this.listener.push(new EventTopic(topic, { id: uniquieId, callback: callback }));
            return uniquieId;
        };
        this.unsubscribe = function (id) {
            _this.listener.forEach(function (item) {
                item.remove(id);
            });
        };
        this.generateRandom = function () { return Date.now(); };
    }
    return EventBus;
}());
exports.EventBus = EventBus;
exports.bus = new EventBus();
//# sourceMappingURL=eventbus.js.map