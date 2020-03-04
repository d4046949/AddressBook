import { Modal } from './modal';
import { CardList } from './cardList';
import { EventBus } from './eventbus';
import { Utils } from './utils';

var modal = new Modal();
var cardList = new CardList();
var eBus = new EventBus();
var utils = new Utils();

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

