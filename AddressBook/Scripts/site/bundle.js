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
},{"./cardList":1,"./eventbus":2,"./modal":4,"./utils":5}],4:[function(require,module,exports){
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
var Utils = /** @class */ (function () {
    function Utils() {
        var _this = this;
        this.loaded = false;
        this.expanded = false;
        this.setupEvents = function () {
            $("[data-ajax-url]").on('click', function (event) {
                event.preventDefault();
                _this.panel = $(event.currentTarget);
                _this.panel.unbind('click');
                if (!_this.expanded) {
                    _this.expand();
                    _this.expanded = true;
                }
                else {
                    _this.collapse();
                    _this.expanded = false;
                }
            });
        };
        this.expand = function () {
            _this.panel.addClass('open');
            _this.panel.find('.icon')
                .children()
                .first()
                .removeClass('fas fa-chevron-circle-left')
                .addClass('fas fa-chevron-circle-right');
            _this.panel.find('[data-id]').hide();
        };
        this.collapse = function () {
            _this.panel.find('.fa-chevron-circle-right').on('click', function () {
                console.log('clicked');
                this.panel.removeClass('open');
                console.log('**', parent);
                this.panel.find('.icon')
                    .children()
                    .first()
                    .removeClass('fas fa-chevron-circle-right')
                    .addClass('fas fa-chevron-circle-left');
            });
        };
        this.setupEvents();
        //var parent = $(event.currentTarget);
        //});
        //if (!this.loaded) {
        //    $.ajax({
        //        url: parent.data("ajax-url"),
        //        type: 'GET',
        //        success: (response) => {
        //            parent.find('#new-content-placeholder').html(response);
        //            $.validator.unobtrusive.parse('form');
        //            new NewPerson().init();
        //        }
        //    });
        //}
        $('.new-bar').hover(function () {
            console.log('enter');
            $('.icon').css('display', 'block');
        }, function () { $('.icon').css('display', 'none'); });
    }
    return Utils;
}());
exports.Utils = Utils;
},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9jYXJkTGlzdC50cyIsInRzL2V2ZW50YnVzLnRzIiwidHMvbWFpbi50cyIsInRzL21vZGFsLnRzIiwidHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBR0k7UUFDSSxpRkFBaUY7UUFDakYsOEJBQThCO1FBQzlCLHdDQUF3QztRQUN4QywwREFBMEQ7UUFDMUQsK0JBQStCO1FBQy9CLFNBQVM7UUFDVCxHQUFHO0lBQ1AsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQVpBLEFBWUMsSUFBQTtBQVpZLDRCQUFROzs7O0FDRnBCO0lBSUcsb0JBQW1CLFNBQWlCLEVBQUUsS0FBb0I7UUFBMUQsaUJBRUM7UUFGa0IsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUY1QixnQkFBVyxHQUF5QixJQUFJLEtBQUssRUFBaUIsQ0FBQztRQU12RSxXQUFNLEdBQUcsVUFBQyxJQUFRO1lBQ2QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFtQjtnQkFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQUVELFFBQUcsR0FBRyxVQUFDLFlBQTJCLElBQWEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFckYsV0FBTSxHQUFHLFVBQUMsRUFBVTtZQUNoQixJQUFJLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQWdCLElBQUssT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztZQUVqRixJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDckIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENB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QUM7WUFDckIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDdEMsQ0FBQyxFQUFFLGNBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUdwRCxDQUFDO0lBNENMLFlBQUM7QUFBRCxDQS9FQSxBQStFQyxJQUFBO0FBL0VZLHNCQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/aW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4vY2FyZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FyZExpc3Qge1xyXG4gICAgY2FyZExpc3RzOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy90aGlzLmNhcmRMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiY2FyZC1idXR0b25cIl0nKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY2FyZExpc3RzKTtcclxuICAgICAgICAvL2ZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuY2FyZExpc3RzKSB7XHJcbiAgICAgICAgLy8gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGU6IGFueSkge1xyXG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyh0aGlzLCBlKTtcclxuICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvL31cclxuICAgIH1cclxufSIsIu+7v2NsYXNzIEV2ZW50VG9waWMge1xyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlcnM6IEFycmF5PElFdmVudERldGFpbHM+ID0gbmV3IEFycmF5PElFdmVudERldGFpbHM+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogSUV2ZW50RGV0YWlscykge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5ID0gKGFyZ3M6IHt9KTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBJRXZlbnREZXRhaWxzKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY2FsbGJhY2soYXJncyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkID0gKGV2ZW50RGV0YWlsczogSUV2ZW50RGV0YWlscyk6IHZvaWQgPT4geyB0aGlzLnN1YnNjcmliZXJzLnB1c2goZXZlbnREZXRhaWxzKTsgfVxyXG5cclxuICAgIHJlbW92ZSA9IChpZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlcnMuZmluZEluZGV4KCh4OiBJRXZlbnREZXRhaWxzKSA9PiB4LmlkID09PSBpZCk7XHJcblxyXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24gIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuc3BsaWNlKHN1YnNjcmlwdGlvbiwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdjYW50IGZpbmQgaWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRXZlbnREZXRhaWxzIHtcclxuICAgIGlkOiBudW1iZXIsXHJcbiAgICBjYWxsYmFjazphbnlcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50QnVzIHtcclxuICAgIGxpc3RlbmVyOiBBcnJheTxFdmVudFRvcGljPiA9IG5ldyBBcnJheTxFdmVudFRvcGljPigpO1xyXG5cclxuICAgIHRyaWdnZXIgPSAobmFtZTogc3RyaW5nLCBhcmdzPzoge30pOiB2b2lkID0+IHtcclxuICAgICAgICBsZXQgc3Vic2NyaXB0b3IgPSB0aGlzLmxpc3RlbmVyLmZpbmQoeCA9PiB4LmV2ZW50TmFtZSA9PT0gbmFtZSk7XHJcbiAgICAgICAgaWYgKHN1YnNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdG9yLm5vdGlmeShhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3Vic2NyaWJlID0gKHRvcGljOiBzdHJpbmcsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogbnVtYmVyID0+IHtcclxuICAgICAgICBsZXQgdW5pcXVpZUlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbSgpO1xyXG4gICAgICAgIGxldCBzdWJzY3JpcHRvciA9IHRoaXMubGlzdGVuZXIuZmluZCh4ID0+IHguZXZlbnROYW1lID09PSB0b3BpYyk7XHJcbiAgICAgICAgc3Vic2NyaXB0b3JcclxuICAgICAgICAgICAgPyBzdWJzY3JpcHRvci5hZGQoeyBpZDogdW5pcXVpZUlkLCBjYWxsYmFjazogY2FsbGJhY2sgfSlcclxuICAgICAgICAgICAgOiB0aGlzLmxpc3RlbmVyLnB1c2gobmV3IEV2ZW50VG9waWModG9waWMsIHsgaWQ6IHVuaXF1aWVJZCwgY2FsbGJhY2s6IGNhbGxiYWNrIH0pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaXF1aWVJZDtcclxuICAgIH1cclxuXHJcbiAgICB1bnN1YnNjcmliZSA9IChpZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBFdmVudFRvcGljKSB7XHJcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgIHByaXZhdGUgZ2VuZXJhdGVSYW5kb20gPSAoKTogbnVtYmVyID0+IERhdGUubm93KCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGxldCBidXMgPSBuZXcgRXZlbnRCdXMoKTsiLCLvu79pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xyXG5pbXBvcnQgeyBDYXJkTGlzdCB9IGZyb20gJy4vY2FyZExpc3QnO1xyXG5pbXBvcnQgeyBFdmVudEJ1cyB9IGZyb20gJy4vZXZlbnRidXMnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4vdXRpbHMnO1xyXG5cclxudmFyIG1vZGFsID0gbmV3IE1vZGFsKCk7XHJcbnZhciBjYXJkTGlzdCA9IG5ldyBDYXJkTGlzdCgpO1xyXG52YXIgZUJ1cyA9IG5ldyBFdmVudEJ1cygpO1xyXG52YXIgdXRpbHMgPSBuZXcgVXRpbHMoKTtcclxuXHJcbm1vZGFsLmluaXRpYWxpemUoKTtcclxuXHJcbi8vbGV0IGlkID0gZUJ1cy5zdWJzY3JpYmUoJ3Rlc3QnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCk7IH0pO1xyXG4vL2xldCBpZDIgPSBlQnVzLnN1YnNjcmliZSgndGVzdCcsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJzInKTsgfSk7XHJcbi8vbGV0IGlkMyA9IGVCdXMuc3Vic2NyaWJlKCd0ZXN0JywgZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygnMycpOyB9KTtcclxuXHJcblxyXG4vL2NvbnNvbGUubG9nKCdpZCcsIGlkKTtcclxuLy9jb25zb2xlLmxvZygnaWQnLCBpZDIpO1xyXG4vL2NvbnNvbGUubG9nKCdpZCcsIGlkMyk7XHJcblxyXG4vL2VCdXMudHJpZ2dlcigndGVzdCcsIHsna2V5JzogMX0pO1xyXG5cclxuLy9lQnVzLnVuc3Vic2NyaWJlKGlkKTtcclxuXHJcbi8vZUJ1cy50cmlnZ2VyKCd0ZXN0Jywge30pO1xyXG5cclxuIiwi77u/aW1wb3J0IHsgYnVzIH0gZnJvbSAnLi9ldmVudGJ1cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kYWwge1xyXG4gICAgbW9kYWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICBtb2RhbGJhY2tkcm9wOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgbW9kYWxwbGFjZWhvbGRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgIGNhcmRMaXN0czogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWwgPSAkKCcjbW9kYWwnKTtcclxuICAgICAgICB0aGlzLm1vZGFsYmFja2Ryb3AgPSAkKCcjYmFja2Ryb3AnKTtcclxuICAgICAgICB0aGlzLm1vZGFscGxhY2Vob2xkZXIgPSAkKCcjbW9kYWwtcGxhY2Vob2xkZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBidXMuc3Vic2NyaWJlKFwibW9kYWw6c2hvd1wiLCAoKSA9PiB7IGFsZXJ0KCdtb2RhbCByZWNpZXZlZCBldmVudCcpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubGlzdGVuRm9yTG9hZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlbkZvckxvYWRFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2FyZExpc3RzID0gJCgnW2RhdGEtYWpheC1tb2RhbC11cmxdJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5jYXJkTGlzdHMpIHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGU6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWpheC1tb2RhbC11cmwnKTtcclxuICAgICAgICAgICAgICAgIC8qIG1vdmUgdG8gYXhpb3MgKi9cclxuICAgICAgICAgICAgICAgICQuZ2V0KHVybCwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubW9kYWxiYWNrZHJvcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyLmNsaWNrID0gbnVsbDtcclxuICAgIH1cclxufSIsIu+7v2ltcG9ydCB7IGJ1cyB9IGZyb20gJy4vZXZlbnRidXMnO1xyXG5pbXBvcnQgeyBOZXdQZXJzb24gfSBmcm9tICcuL25ld3BlcnNvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHBhbmVsOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zZXR1cEV2ZW50cygpO1xyXG4gICAgICAgICAgICAvL3ZhciBwYXJlbnQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy9pZiAoIXRoaXMubG9hZGVkKSB7XHJcbiAgICAgICAgICAgIC8vICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB1cmw6IHBhcmVudC5kYXRhKFwiYWpheC11cmxcIiksXHJcbiAgICAgICAgICAgIC8vICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgLy8gICAgICAgIHN1Y2Nlc3M6IChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHBhcmVudC5maW5kKCcjbmV3LWNvbnRlbnQtcGxhY2Vob2xkZXInKS5odG1sKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAkLnZhbGlkYXRvci51bm9idHJ1c2l2ZS5wYXJzZSgnZm9ybScpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5ldyBOZXdQZXJzb24oKS5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgIFxyXG5cclxuICAgICAgICAkKCcubmV3LWJhcicpLmhvdmVyKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2VudGVyJyk7XHJcbiAgICAgICAgICAgICQoJy5pY29uJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJylcclxuICAgICAgICB9LCAoKSA9PiB7ICQoJy5pY29uJykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKSB9KTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNldHVwRXZlbnRzID0gKCkgPT4ge1xyXG4gICAgICAgICQoXCJbZGF0YS1hamF4LXVybF1cIikub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYW5lbC51bmJpbmQoJ2NsaWNrJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZXhwYW5kZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBleHBhbmQgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgIHRoaXMucGFuZWwuZmluZCgnLmljb24nKVxyXG4gICAgICAgICAgICAuY2hpbGRyZW4oKVxyXG4gICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2ZhcyBmYS1jaGV2cm9uLWNpcmNsZS1sZWZ0JylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYXMgZmEtY2hldnJvbi1jaXJjbGUtcmlnaHQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYW5lbC5maW5kKCdbZGF0YS1pZF0nKS5oaWRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbGxhcHNlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICB0aGlzLnBhbmVsLmZpbmQoJy5mYS1jaGV2cm9uLWNpcmNsZS1yaWdodCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKTtcclxuICAgICAgICAgICAgdGhpcy5wYW5lbC5yZW1vdmVDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnKionLCBwYXJlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBhbmVsLmZpbmQoJy5pY29uJylcclxuICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpXHJcbiAgICAgICAgICAgICAgICAuZmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdmYXMgZmEtY2hldnJvbi1jaXJjbGUtcmlnaHQnKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdmYXMgZmEtY2hldnJvbi1jaXJjbGUtbGVmdCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFxyXG59Il19
