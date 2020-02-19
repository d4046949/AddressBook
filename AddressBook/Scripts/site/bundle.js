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
            _this.cardLists = document.querySelectorAll('[data-ajax-modal-url]');
            for (var _i = 0, _a = _this.cardLists; _i < _a.length; _i++) {
                var button = _a[_i];
                button.addEventListener('click', function (e) {
                    var url = this.getAttribute('data-ajax-modal-url');
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            self.modal.innerHTML = xhr.responseText;
                            self.show();
                        }
                        else {
                            alert('Request failed.  Returned status of ' + xhr.status);
                        }
                    };
                    xhr.send();
                });
            }
        };
        this.show = function () {
            _this.modalplaceholder.classList.remove('hide');
            _this.modalbackdrop.classList.remove('hide');
            var self = _this;
            _this.modalbackdrop.addEventListener('click', function () {
                console.log('clicked');
                self.hide();
            });
        };
        this.hide = function () {
            console.log('hide');
            _this.modalplaceholder.classList.add('hide');
            _this.modalbackdrop.classList.add('hide');
            _this.modalplaceholder.click = null;
        };
        this.modal = document.getElementById('modal');
        this.modalbackdrop = document.getElementById('backdrop');
        this.modalplaceholder = document.getElementById('modal-placeholder');
        console.log(this.modalbackdrop);
        eventbus_1.bus.subscribe("modal:show", function () { alert('modal recieved event'); });
    }
    return Modal;
}());
exports.Modal = Modal;
},{"./eventbus":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9jYXJkTGlzdC50cyIsInRzL2V2ZW50YnVzLnRzIiwidHMvbWFpbi50cyIsInRzL21vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTtJQUdJO1FBQ0ksaUZBQWlGO1FBQ2pGLDhCQUE4QjtRQUM5Qix3Q0FBd0M7UUFDeEMsMERBQTBEO1FBQzFELCtCQUErQjtRQUMvQixTQUFTO1FBQ1QsR0FBRztJQUNQLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FaQSxBQVlDLElBQUE7QUFaWSw0QkFBUTs7OztBQ0ZwQjtJQUlHLG9CQUFtQixTQUFpQixFQUFFLEtBQW9CO1FBQTFELGlCQUVDO1FBRmtCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFGNUIsZ0JBQVcsR0FBeUIsSUFBSSxLQUFLLEVBQWlCLENBQUM7UUFNdkUsV0FBTSxHQUFHLFVBQUMsSUFBUTtZQUNkLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBbUI7Z0JBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFFRCxRQUFHLEdBQUcsVUFBQyxZQUEyQixJQUFhLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXJGLFdBQU0sR0FBRyxVQUFDLEVBQVU7WUFDaEIsSUFBSSxZQUFZLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFnQixJQUFLLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7WUFFakYsSUFBSSxZQUFZLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JCLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQzth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QUFBO1FBRUQsU0FBSSxHQUFHO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFBO1FBbERHLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoQyxjQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxjQUFRLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQTZDTCxZQUFDO0FBQUQsQ0ExREEsQUEwREMsSUFBQTtBQTFEWSxzQkFBSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIu+7v2ltcG9ydCB7IENhcmQgfSBmcm9tICcuL2NhcmQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhcmRMaXN0IHtcclxuICAgIGNhcmRMaXN0czogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vdGhpcy5jYXJkTGlzdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1idXR0b24tdHlwZT1cImNhcmQtYnV0dG9uXCJdJyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmNhcmRMaXN0cyk7XHJcbiAgICAgICAgLy9mb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmNhcmRMaXN0cykge1xyXG4gICAgICAgIC8vICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2codGhpcywgZSk7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn0iLCLvu79jbGFzcyBFdmVudFRvcGljIHtcclxuXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZXJzOiBBcnJheTxJRXZlbnREZXRhaWxzPiA9IG5ldyBBcnJheTxJRXZlbnREZXRhaWxzPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBldmVudE5hbWU6IHN0cmluZywgZXZlbnQ6IElFdmVudERldGFpbHMpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnB1c2goZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIG5vdGlmeSA9IChhcmdzOiB7fSk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogSUV2ZW50RGV0YWlscykge1xyXG4gICAgICAgICAgICBpdGVtLmNhbGxiYWNrKGFyZ3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZCA9IChldmVudERldGFpbHM6IElFdmVudERldGFpbHMpOiB2b2lkID0+IHsgdGhpcy5zdWJzY3JpYmVycy5wdXNoKGV2ZW50RGV0YWlscyk7IH1cclxuXHJcbiAgICByZW1vdmUgPSAoaWQ6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLnN1YnNjcmliZXJzLmZpbmRJbmRleCgoeDogSUV2ZW50RGV0YWlscykgPT4geC5pZCA9PT0gaWQpO1xyXG5cclxuICAgICAgICBpZiAoc3Vic2NyaXB0aW9uICE9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZXJzLnNwbGljZShzdWJzY3JpcHRpb24sIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignY2FudCBmaW5kIGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUV2ZW50RGV0YWlscyB7XHJcbiAgICBpZDogbnVtYmVyLFxyXG4gICAgY2FsbGJhY2s6YW55XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudEJ1cyB7XHJcbiAgICBsaXN0ZW5lcjogQXJyYXk8RXZlbnRUb3BpYz4gPSBuZXcgQXJyYXk8RXZlbnRUb3BpYz4oKTtcclxuXHJcbiAgICB0cmlnZ2VyID0gKG5hbWU6IHN0cmluZywgYXJncz86IHt9KTogdm9pZCA9PiB7XHJcbiAgICAgICAgbGV0IHN1YnNjcmlwdG9yID0gdGhpcy5saXN0ZW5lci5maW5kKHggPT4geC5ldmVudE5hbWUgPT09IG5hbWUpO1xyXG4gICAgICAgIGlmIChzdWJzY3JpcHRvcikge1xyXG4gICAgICAgICAgICBzdWJzY3JpcHRvci5ub3RpZnkoYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN1YnNjcmliZSA9ICh0b3BpYzogc3RyaW5nLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgbGV0IHVuaXF1aWVJZCA9IHRoaXMuZ2VuZXJhdGVSYW5kb20oKTtcclxuICAgICAgICBsZXQgc3Vic2NyaXB0b3IgPSB0aGlzLmxpc3RlbmVyLmZpbmQoeCA9PiB4LmV2ZW50TmFtZSA9PT0gdG9waWMpO1xyXG4gICAgICAgIHN1YnNjcmlwdG9yXHJcbiAgICAgICAgICAgID8gc3Vic2NyaXB0b3IuYWRkKHsgaWQ6IHVuaXF1aWVJZCwgY2FsbGJhY2s6IGNhbGxiYWNrIH0pXHJcbiAgICAgICAgICAgIDogdGhpcy5saXN0ZW5lci5wdXNoKG5ldyBFdmVudFRvcGljKHRvcGljLCB7IGlkOiB1bmlxdWllSWQsIGNhbGxiYWNrOiBjYWxsYmFjayB9KSk7XHJcblxyXG4gICAgICAgIHJldHVybiB1bmlxdWllSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdW5zdWJzY3JpYmUgPSAoaWQ6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogRXZlbnRUb3BpYykge1xyXG4gICAgICAgICAgICBpdGVtLnJlbW92ZShpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICBwcml2YXRlIGdlbmVyYXRlUmFuZG9tID0gKCk6IG51bWJlciA9PiBEYXRlLm5vdygpO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBsZXQgYnVzID0gbmV3IEV2ZW50QnVzKCk7Iiwi77u/aW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL21vZGFsJztcclxuaW1wb3J0IHsgQ2FyZExpc3QgfSBmcm9tICcuL2NhcmRMaXN0JztcclxuaW1wb3J0IHsgRXZlbnRCdXMgfSBmcm9tICcuL2V2ZW50YnVzJztcclxuIFxyXG52YXIgbW9kYWwgPSBuZXcgTW9kYWwoKTtcclxudmFyIGNhcmRMaXN0ID0gbmV3IENhcmRMaXN0KCk7XHJcbnZhciBlQnVzID0gbmV3IEV2ZW50QnVzKCk7XHJcblxyXG5tb2RhbC5pbml0aWFsaXplKCk7XHJcblxyXG4vL2xldCBpZCA9IGVCdXMuc3Vic2NyaWJlKCd0ZXN0JywgZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygpOyB9KTtcclxuLy9sZXQgaWQyID0gZUJ1cy5zdWJzY3JpYmUoJ3Rlc3QnLCBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCcyJyk7IH0pO1xyXG4vL2xldCBpZDMgPSBlQnVzLnN1YnNjcmliZSgndGVzdCcsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJzMnKTsgfSk7XHJcblxyXG5cclxuLy9jb25zb2xlLmxvZygnaWQnLCBpZCk7XHJcbi8vY29uc29sZS5sb2coJ2lkJywgaWQyKTtcclxuLy9jb25zb2xlLmxvZygnaWQnLCBpZDMpO1xyXG5cclxuLy9lQnVzLnRyaWdnZXIoJ3Rlc3QnLCB7J2tleSc6IDF9KTtcclxuXHJcbi8vZUJ1cy51bnN1YnNjcmliZShpZCk7XHJcblxyXG4vL2VCdXMudHJpZ2dlcigndGVzdCcsIHt9KTtcclxuXHJcbiIsIu+7v2ltcG9ydCB7IGJ1cyB9IGZyb20gJy4vZXZlbnRidXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGFsIHtcclxuICAgIG1vZGFsOiBIVE1MRWxlbWVudDtcclxuICAgIG1vZGFsYmFja2Ryb3A6IEhUTUxFbGVtZW50O1xyXG4gICAgbW9kYWxwbGFjZWhvbGRlcjogSFRNTEVsZW1lbnQ7XHJcbiAgICBjYXJkTGlzdHM6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tkcm9wJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLXBsYWNlaG9sZGVyJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tb2RhbGJhY2tkcm9wKTtcclxuXHJcbiAgICAgICAgYnVzLnN1YnNjcmliZShcIm1vZGFsOnNob3dcIiwgKCkgPT4geyBhbGVydCgnbW9kYWwgcmVjaWV2ZWQgZXZlbnQnKTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLmxpc3RlbkZvckxvYWRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBsaXN0ZW5Gb3JMb2FkRXZlbnRzID0gKCkgPT4ge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmNhcmRMaXN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFqYXgtbW9kYWwtdXJsXScpO1xyXG4gICAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuY2FyZExpc3RzKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWFqYXgtbW9kYWwtdXJsJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XHJcbiAgICAgICAgICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tb2RhbC5pbm5lckhUTUwgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdSZXF1ZXN0IGZhaWxlZC4gIFJldHVybmVkIHN0YXR1cyBvZiAnICsgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubW9kYWxwbGFjZWhvbGRlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5tb2RhbGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xyXG4gICAgICAgICAgICBzZWxmLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdoaWRlJyk7XHJcbiAgICAgICAgdGhpcy5tb2RhbHBsYWNlaG9sZGVyLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICB0aGlzLm1vZGFsYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xyXG4gICAgICAgIHRoaXMubW9kYWxwbGFjZWhvbGRlci5jbGljayA9IG51bGw7XHJcbiAgICB9XHJcbn0iXX0=
