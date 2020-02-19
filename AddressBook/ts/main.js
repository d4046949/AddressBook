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
//# sourceMappingURL=main.js.map