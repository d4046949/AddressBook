(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardList = /** @class */ (function () {
    function CardList() {
        //this.cardLists = document.querySelectorAll('[data-button-type="card-button"]');
        //console.log(this.cardLists);
        //for (const button of this.cardLists) {
        //    button.addEventListener('click', function (e: any) {
        //        console.log(this, e);
        //    });
        //}
    }
    return CardList;
}());
exports.CardList = CardList;
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modal_1 = require("./modal");
var cardList_1 = require("./cardList");
var eventbus_1 = require("./eventbus");
var utils_1 = require("./utils");
var modal = new modal_1.Modal();
var cardList = new cardList_1.CardList();
var eBus = new eventbus_1.EventBus();
var utils = new utils_1.Utils();
modal.initialize();
//let id = eBus.subscribe('test', function () { console.log(); });
//let id2 = eBus.subscribe('test', function () { console.log('2'); });
//let id3 = eBus.subscribe('test', function () { console.log('3'); });
//console.log('id', id);
//console.log('id', id2);
//console.log('id', id3);
//eBus.trigger('test', {'key': 1});
//eBus.unsubscribe(id);
//eBus.trigger('test', {});
},{"./cardList":1,"./eventbus":2,"./modal":4,"./utils":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventbus_1 = require("./eventbus");
var Modal = /** @class */ (function () {
    function Modal() {
        var _this = this;
        this.initialize = function () {
            _this.listenForLoadEvents();
        };
        this.listenForLoadEvents = function () {
            var self = _this;
            _this.cardLists = $('[data-ajax-modal-url]');
            for (var _i = 0, _a = _this.cardLists; _i < _a.length; _i++) {
                var button = _a[_i];
                button.addEventListener('click', function (e) {
                    var url = this.getAttribute('data-ajax-modal-url');
                    /* move to axios */
                    $.get(url, function (data) {
                        alert();
                        self.modal.html(data.responseText);
                        self.show();
                    });
                });
            }
        };
        this.show = function () {
            _this.modalplaceholder.removeClass('hide');
            _this.modalbackdrop.removeClass('hide');
            var self = _this;
            _this.modalbackdrop.on('click', function () {
                self.hide();
            });
        };
        this.hide = function () {
            _this.modalplaceholder.addClass('hide');
            _this.modalbackdrop.addClass('hide');
            _this.modalplaceholder.click = null;
        };
        this.modal = $('#modal');
        this.modalbackdrop = $('#backdrop');
        this.modalplaceholder = $('#modal-placeholder');
        eventbus_1.bus.subscribe("modal:show", function () { alert('modal recieved event'); });
    }
    return Modal;
}());
exports.Modal = Modal;
},{"./eventbus":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewPerson = /** @class */ (function () {
    function NewPerson() {
        var _this = this;
        this.init = function () {
            _this.dateOfBirth = $('#DateOfBirth');
            _this.dateOfBirth.keypress(function (e) {
                if (_this.dateOfBirth.val().toString().length == 2 || _this.dateOfBirth.val().toString().length == 5) {
                    _this.dateOfBirth.val(_this.dateOfBirth.val() + '/');
                }
                console.log(_this.dateOfBirth.val());
            });
        };
    }
    return NewPerson;
}());
exports.NewPerson = NewPerson;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var newperson_1 = require("./newperson");
var Utils = /** @class */ (function () {
    function Utils() {
        $("[data-ajax-url]").on('click', function (event) {
            event.preventDefault();
            var sidebar = $('.sidebar2');
            $.ajax({
                url: $(this).data("ajax-url"),
                type: 'GET',
                success: function (response) {
                    sidebar.html(response);
                    $.validator.unobtrusive.parse('form');
                    sidebar.addClass('open');
                    new newperson_1.NewPerson().init();
                }
            });
        });
    }
    return Utils;
}());
exports.Utils = Utils;
},{"./newperson":5}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9jYXJkTGlzdC50cyIsInRzL2V2ZW50YnVzLnRzIiwidHMvbWFpbi50cyIsInRzL21vZGFsLnRzIiwidHMvbmV3cGVyc29uLnRzIiwidHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBR0k7UUFDSSxpRkFBaUY7UUFDakYsOEJBQThCO1FBQzlCLHdDQUF3QztRQUN4QywwREFBMEQ7UUFDMUQsK0JBQStCO1FBQy9CLFNBQVM7UUFDVCxHQUFHO0lBQ1AsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQVpBLEFBWUMsSUFBQTtBQVpZLDRCQUFROzs7O0FDRnBCO0lBSUcsb0JBQW1CLFNBQWlCLEVBQUUsS0FBb0I7UUFBMUQsaUJBRUM7UUFGa0IsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUY1QixnQkFBVyxHQUF5QixJQUFJLEtBQUssRUFBaUIsQ0FBQztRQU12RSxXQUFNLEdBQUcsVUFBQyxJQUFRO1lBQ2QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFtQjtnQkFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVELFFBQUcsR0FBRyxVQUFDLFlBQTJCLElBQWEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFckYsV0FBTSxHQUFHLFVBQUMsRUFBVTtZQUNoQixJQUFJLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQWdCLElBQUssT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztZQUVqRixJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDckIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFN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QyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxLQUFLO1lBQzVDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDSCxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQzdCLElBQUksRUFBRSxLQUFLO2dCQUNYLE9BQU8sRUFBRSxVQUFVLFFBQVE7b0JBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekIsSUFBSSxxQkFBUyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzNCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTCxZQUFDO0FBQUQsQ0FuQkEsQUFtQkMsSUFBQTtBQW5CWSxzQkFBSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7v2ltcG9ydCB7IENhcmQgfSBmcm9tICcuL2NhcmQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhcmRMaXN0IHtcclxuICAgIGNhcmRMaXN0czogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vdGhpcy5jYXJkTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1idXR0b24tdHlwZT1cImNhcmQtYnV0dG9uXCJdJyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNhcmRMaXN0cyk7XHJcbiAgICAgICAgLy9mb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmNhcmRMaXN0cykge1xyXG4gICAgICAgIC8vICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2codGhpcywgZSk7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn0iLCLvu79jbGFzcyBFdmVudFRvcGljIHtcclxuXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZXJzOiBBcnJheTxJRXZlbnREZXRhaWxzPiA9IG5ldyBBcnJheTxJRXZlbnREZXRhaWxzPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBldmVudE5hbWU6IHN0cmluZywgZXZlbnQ6IElFdmVudERldGFpbHMpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnB1c2goZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeSA9IChhcmdzOiB7fSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogSUV2ZW50RGV0YWlscykge1xyXG4gICAgICAgICAgICBpdGVtLmNhbGxiYWNrKGFyZ3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZCA9IChldmVudERldGFpbHM6IElFdmVudERldGFpbHMpOiB2b2lkID0+IHsgdGhpcy5zdWJzY3JpYmVycy5wdXNoKGV2ZW50RGV0YWlscyk7IH1cclxuXHJcbiAgICByZW1vdmUgPSAoaWQ6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLnN1YnNjcmliZXJzLmZpbmRJbmRleCgoeDogSUV2ZW50RGV0YWlscykgPT4geC5pZCA9PT0gaWQpO1xyXG5cclxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnNwbGljZShzdWJzY3JpcHRpb24sIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignY2FudCBmaW5kIGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUV2ZW50RGV0YWlscyB7XHJcbiAgICBpZDogbnVtYmVyLFxyXG4gICAgY2FsbGJhY2s6YW55XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudEJ1cyB7XHJcbiAgICBsaXN0ZW5lcjogQXJyYXk8RXZlbnRUb3BpYz4gPSBuZXcgQXJyYXk8RXZlbnRUb3BpYz4oKTtcclxuXHJcbiAgICB0cmlnZ2VyID0gKG5hbWU6IHN0cmluZywgYXJncz86IHt9KTogdm9pZCA9PiB7XHJcbiAgICAgICAgbGV0IHN1YnNjcmlwdG9yID0gdGhpcy5saXN0ZW5lci5maW5kKHggPT4geC5ldmVudE5hbWUgPT09IG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWJzY3JpcHRvcikge1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRvci5ub3RpZnkoYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZSA9ICh0b3BpYzogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgbGV0IHVuaXF1aWVJZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb20oKTtcclxuICAgICAgICBsZXQgc3Vic2NyaXB0b3IgPSB0aGlzLmxpc3RlbmVyLmZpbmQoeCA9PiB4LmV2ZW50TmFtZSA9PT0gdG9waWMpO1xyXG4gICAgICAgIHN1YnNjcmlwdG9yXHJcbiAgICAgICAgICAgID8gc3Vic2NyaXB0b3IuYWRkKHsgaWQ6IHVuaXF1aWVJZCwgY2FsbGJhY2s6IGNhbGxiYWNrIH0pXHJcbiAgICAgICAgICAgIDogdGhpcy5saXN0ZW5lci5wdXNoKG5ldyBFdmVudFRvcGljKHRvcGljLCB7IGlkOiB1bmlxdWllSWQsIGNhbGxiYWNrOiBjYWxsYmFjayB9KSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlxdWllSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdW5zdWJzY3JpYmUgPSAoaWQ6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogRXZlbnRUb3BpYykge1xyXG4gICAgICAgICAgICBpdGVtLnJlbW92ZShpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICBwcml2YXRlIGdlbmVyYXRlUmFuZG9tID0gKCk6IG51bWJlciA9PiBEYXRlLm5vdygpO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBsZXQgYnVzID0gbmV3IEV2ZW50QnVzKCk7Iiwi77u/aW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL21vZGFsJztcclxuaW1wb3J0IHsgQ2FyZExpc3QgfSBmcm9tICcuL2NhcmRMaXN0JztcclxuaW1wb3J0IHsgRXZlbnRCdXMgfSBmcm9tICcuL2V2ZW50YnVzJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbnZhciBtb2RhbCA9IG5ldyBNb2RhbCgpO1xyXG52YXIgY2FyZExpc3QgPSBuZXcgQ2FyZExpc3QoKTtcclxudmFyIGVCdXMgPSBuZXcgRXZlbnRCdXMoKTtcclxudmFyIHV0aWxzID0gbmV3IFV0aWxzKCk7XHJcblxyXG5tb2RhbC5pbml0aWFsaXplKCk7XHJcblxyXG4vL2xldCBpZCA9IGVCdXMuc3Vic2NyaWJlKCd0ZXN0JywgZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygpOyB9KTtcclxuLy9sZXQgaWQyID0gZUJ1cy5zdWJzY3JpYmUoJ3Rlc3QnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCcyJyk7IH0pO1xyXG4vL2xldCBpZDMgPSBlQnVzLnN1YnNjcmliZSgndGVzdCcsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJzMnKTsgfSk7XHJcblxyXG5cclxuLy9jb25zb2xlLmxvZygnaWQnLCBpZCk7XHJcbi8vY29uc29sZS5sb2coJ2lkJywgaWQyKTtcclxuLy9jb25zb2xlLmxvZygnaWQnLCBpZDMpO1xyXG5cclxuLy9lQnVzLnRyaWdnZXIoJ3Rlc3QnLCB7J2tleSc6IDF9KTtcclxuXHJcbi8vZUJ1cy51bnN1YnNjcmliZShpZCk7XHJcblxyXG4vL2VCdXMudHJpZ2dlcigndGVzdCcsIHt9KTtcclxuXHJcbiIsIu+7v2ltcG9ydCB7IGJ1cyB9IGZyb20gJy4vZXZlbnRidXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGFsIHtcclxuICAgIG1vZGFsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgbW9kYWxiYWNrZHJvcDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgIG1vZGFscGxhY2Vob2xkZXI6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICBjYXJkTGlzdHM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGFsID0gJCgnI21vZGFsJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wID0gJCgnI2JhY2tkcm9wJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyID0gJCgnI21vZGFsLXBsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgYnVzLnN1YnNjcmliZShcIm1vZGFsOnNob3dcIiwgKCkgPT4geyBhbGVydCgnbW9kYWwgcmVjaWV2ZWQgZXZlbnQnKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmxpc3RlbkZvckxvYWRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZW5Gb3JMb2FkRXZlbnRzID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmNhcmRMaXN0cyA9ICQoJ1tkYXRhLWFqYXgtbW9kYWwtdXJsXScpO1xyXG4gICAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuY2FyZExpc3RzKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFqYXgtbW9kYWwtdXJsJyk7XHJcbiAgICAgICAgICAgICAgICAvKiBtb3ZlIHRvIGF4aW9zICovXHJcbiAgICAgICAgICAgICAgICAkLmdldCh1cmwsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1vZGFsLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubW9kYWxwbGFjZWhvbGRlci5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICAgIHRoaXMubW9kYWxiYWNrZHJvcC5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLm1vZGFsYmFja2Ryb3Aub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubW9kYWxwbGFjZWhvbGRlci5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgIHRoaXMubW9kYWxiYWNrZHJvcC5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgIHRoaXMubW9kYWxwbGFjZWhvbGRlci5jbGljayA9IG51bGw7XHJcbiAgICB9XHJcbn0iLCLvu79pbXBvcnQgeyBidXMgfSBmcm9tICcuL2V2ZW50YnVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOZXdQZXJzb24ge1xyXG4gICAgZGF0ZU9mQmlydGg6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmRhdGVPZkJpcnRoID0gJCgnI0RhdGVPZkJpcnRoJyk7XHJcbiAgICAgICAgdGhpcy5kYXRlT2ZCaXJ0aC5rZXlwcmVzcygoZTogSlF1ZXJ5LkV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGVPZkJpcnRoLnZhbCgpLnRvU3RyaW5nKCkubGVuZ3RoID09IDIgfHwgdGhpcy5kYXRlT2ZCaXJ0aC52YWwoKS50b1N0cmluZygpLmxlbmd0aCA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVPZkJpcnRoLnZhbCh0aGlzLmRhdGVPZkJpcnRoLnZhbCgpICsgJy8nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGVPZkJpcnRoLnZhbCgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCLvu79pbXBvcnQgeyBidXMgfSBmcm9tICcuL2V2ZW50YnVzJztcclxuaW1wb3J0IHsgTmV3UGVyc29uIH0gZnJvbSAnLi9uZXdwZXJzb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAkKFwiW2RhdGEtYWpheC11cmxdXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgc2lkZWJhciA9ICQoJy5zaWRlYmFyMicpO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAkKHRoaXMpLmRhdGEoXCJhamF4LXVybFwiKSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5odG1sKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAkLnZhbGlkYXRvci51bm9idHJ1c2l2ZS5wYXJzZSgnZm9ybScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgTmV3UGVyc29uKCkuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59Il19
