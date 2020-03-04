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
var modal = new modal_1.Modal();
var cardList = new cardList_1.CardList();
var eBus = new eventbus_1.EventBus();
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
},{"./cardList":1,"./eventbus":2,"./modal":4}],4:[function(require,module,exports){
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
},{"./eventbus":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9jYXJkTGlzdC50cyIsInRzL2V2ZW50YnVzLnRzIiwidHMvbWFpbi50cyIsInRzL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTtJQUdJO1FBQ0ksaUZBQWlGO1FBQ2pGLDhCQUE4QjtRQUM5Qix3Q0FBd0M7UUFDeEMsMERBQTBEO1FBQzFELCtCQUErQjtRQUMvQixTQUFTO1FBQ1QsR0FBRztJQUNQLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSw0QkFBUTs7OztBQ0ZwQjtJQUlHLG9CQUFtQixTQUFpQixFQUFFLEtBQW9CO1FBQTFELGlCQUVDO1FBRmtCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFGNUIsZ0JBQVcsR0FBeUIsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUFNdkUsV0FBTSxHQUFHLFVBQUMsSUFBUTtZQUNkLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBbUI7Z0JBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFFRCxRQUFHLEdBQUcsVUFBQyxZQUEyQixJQUFhLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXJGLFdBQU0sR0FBRyxVQUFDLEVBQVU7WUFDaEIsSUFBSSxZQUFZLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFnQixJQUFLLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7WUFFakYsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JCLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQzth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QUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRWhELGNBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLGNBQVEsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBb0NMLFlBQUM7QUFBRCxDQWhEQSxBQWdEQyxJQUFBO0FBaERZLHNCQUFLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwi77u/aW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4vY2FyZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FyZExpc3Qge1xyXG4gICAgY2FyZExpc3RzOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy90aGlzLmNhcmRMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJ1dHRvbi10eXBlPVwiY2FyZC1idXR0b25cIl0nKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY2FyZExpc3RzKTtcclxuICAgICAgICAvL2ZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuY2FyZExpc3RzKSB7XHJcbiAgICAgICAgLy8gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGU6IGFueSkge1xyXG4gICAgICAgIC8vICAgICAgICBjb25zb2xlLmxvZyh0aGlzLCBlKTtcclxuICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAvL31cclxuICAgIH1cclxufSIsIu+7v2NsYXNzIEV2ZW50VG9waWMge1xyXG5cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlcnM6IEFycmF5PElFdmVudERldGFpbHM+ID0gbmV3IEFycmF5PElFdmVudERldGFpbHM+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGV2ZW50TmFtZTogc3RyaW5nLCBldmVudDogSUV2ZW50RGV0YWlscykge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMucHVzaChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgbm90aWZ5ID0gKGFyZ3M6IHt9KTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVycy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBJRXZlbnREZXRhaWxzKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uY2FsbGJhY2soYXJncyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkID0gKGV2ZW50RGV0YWlsczogSUV2ZW50RGV0YWlscyk6IHZvaWQgPT4geyB0aGlzLnN1YnNjcmliZXJzLnB1c2goZXZlbnREZXRhaWxzKTsgfVxyXG5cclxuICAgIHJlbW92ZSA9IChpZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMuc3Vic2NyaWJlcnMuZmluZEluZGV4KCh4OiBJRXZlbnREZXRhaWxzKSA9PiB4LmlkID09PSBpZCk7XHJcblxyXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24gIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuc3BsaWNlKHN1YnNjcmlwdGlvbiwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdjYW50IGZpbmQgaWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRXZlbnREZXRhaWxzIHtcclxuICAgIGlkOiBudW1iZXIsXHJcbiAgICBjYWxsYmFjazphbnlcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50QnVzIHtcclxuICAgIGxpc3RlbmVyOiBBcnJheTxFdmVudFRvcGljPiA9IG5ldyBBcnJheTxFdmVudFRvcGljPigpO1xyXG5cclxuICAgIHRyaWdnZXIgPSAobmFtZTogc3RyaW5nLCBhcmdzPzoge30pOiB2b2lkID0+IHtcclxuICAgICAgICBsZXQgc3Vic2NyaXB0b3IgPSB0aGlzLmxpc3RlbmVyLmZpbmQoeCA9PiB4LmV2ZW50TmFtZSA9PT0gbmFtZSk7XHJcbiAgICAgICAgaWYgKHN1YnNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIHN1YnNjcmlwdG9yLm5vdGlmeShhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3Vic2NyaWJlID0gKHRvcGljOiBzdHJpbmcsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogbnVtYmVyID0+IHtcclxuICAgICAgICBsZXQgdW5pcXVpZUlkID0gdGhpcy5nZW5lcmF0ZVJhbmRvbSgpO1xyXG4gICAgICAgIGxldCBzdWJzY3JpcHRvciA9IHRoaXMubGlzdGVuZXIuZmluZCh4ID0+IHguZXZlbnROYW1lID09PSB0b3BpYyk7XHJcbiAgICAgICAgc3Vic2NyaXB0b3JcclxuICAgICAgICAgICAgPyBzdWJzY3JpcHRvci5hZGQoeyBpZDogdW5pcXVpZUlkLCBjYWxsYmFjazogY2FsbGJhY2sgfSlcclxuICAgICAgICAgICAgOiB0aGlzLmxpc3RlbmVyLnB1c2gobmV3IEV2ZW50VG9waWModG9waWMsIHsgaWQ6IHVuaXF1aWVJZCwgY2FsbGJhY2s6IGNhbGxiYWNrIH0pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVuaXF1aWVJZDtcclxuICAgIH1cclxuXHJcbiAgICB1bnN1YnNjcmliZSA9IChpZDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBFdmVudFRvcGljKSB7XHJcbiAgICAgICAgICAgIGl0ZW0ucmVtb3ZlKGlkKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgIHByaXZhdGUgZ2VuZXJhdGVSYW5kb20gPSAoKTogbnVtYmVyID0+IERhdGUubm93KCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGxldCBidXMgPSBuZXcgRXZlbnRCdXMoKTsiLCLvu79pbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xyXG5pbXBvcnQgeyBDYXJkTGlzdCB9IGZyb20gJy4vY2FyZExpc3QnO1xyXG5pbXBvcnQgeyBFdmVudEJ1cyB9IGZyb20gJy4vZXZlbnRidXMnO1xyXG4gXHJcbnZhciBtb2RhbCA9IG5ldyBNb2RhbCgpO1xyXG52YXIgY2FyZExpc3QgPSBuZXcgQ2FyZExpc3QoKTtcclxudmFyIGVCdXMgPSBuZXcgRXZlbnRCdXMoKTtcclxuXHJcbm1vZGFsLmluaXRpYWxpemUoKTtcclxuXHJcbi8vbGV0IGlkID0gZUJ1cy5zdWJzY3JpYmUoJ3Rlc3QnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCk7IH0pO1xyXG4vL2xldCBpZDIgPSBlQnVzLnN1YnNjcmliZSgndGVzdCcsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJzInKTsgfSk7XHJcbi8vbGV0IGlkMyA9IGVCdXMuc3Vic2NyaWJlKCd0ZXN0JywgZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygnMycpOyB9KTtcclxuXHJcblxyXG4vL2NvbnNvbGUubG9nKCdpZCcsIGlkKTtcclxuLy9jb25zb2xlLmxvZygnaWQnLCBpZDIpO1xyXG4vL2NvbnNvbGUubG9nKCdpZCcsIGlkMyk7XHJcblxyXG4vL2VCdXMudHJpZ2dlcigndGVzdCcsIHsna2V5JzogMX0pO1xyXG5cclxuLy9lQnVzLnVuc3Vic2NyaWJlKGlkKTtcclxuXHJcbi8vZUJ1cy50cmlnZ2VyKCd0ZXN0Jywge30pO1xyXG5cclxuIiwi77u/aW1wb3J0IHsgYnVzIH0gZnJvbSAnLi9ldmVudGJ1cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kYWwge1xyXG4gICAgbW9kYWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICBtb2RhbGJhY2tkcm9wOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgbW9kYWxwbGFjZWhvbGRlcjogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgIGNhcmRMaXN0czogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMubW9kYWwgPSAkKCcjbW9kYWwnKTtcclxuICAgICAgICB0aGlzLm1vZGFsYmFja2Ryb3AgPSAkKCcjYmFja2Ryb3AnKTtcclxuICAgICAgICB0aGlzLm1vZGFscGxhY2Vob2xkZXIgPSAkKCcjbW9kYWwtcGxhY2Vob2xkZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBidXMuc3Vic2NyaWJlKFwibW9kYWw6c2hvd1wiLCAoKSA9PiB7IGFsZXJ0KCdtb2RhbCByZWNpZXZlZCBldmVudCcpOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsaXplID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubGlzdGVuRm9yTG9hZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlbkZvckxvYWRFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY2FyZExpc3RzID0gJCgnW2RhdGEtYWpheC1tb2RhbC11cmxdJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5jYXJkTGlzdHMpIHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGU6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWpheC1tb2RhbC11cmwnKTtcclxuICAgICAgICAgICAgICAgIC8qIG1vdmUgdG8gYXhpb3MgKi9cclxuICAgICAgICAgICAgICAgICQuZ2V0KHVybCwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubW9kYWwuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubW9kYWxiYWNrZHJvcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyLmNsaWNrID0gbnVsbDtcclxuICAgIH1cclxufSJdfQ==
