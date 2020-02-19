class EventTopic {

    private subscribers: Array<IEventDetails> = new Array<IEventDetails>();

    constructor(public eventName: string, event: IEventDetails) {
        this.subscribers.push(event);
    }

    notify = (args: {}): void => {
        this.subscribers.forEach(function (item: IEventDetails) {
            item.callback(args);
        });
    }

    add = (eventDetails: IEventDetails): void => { this.subscribers.push(eventDetails); }

    remove = (id: number): void => {
        var subscription = this.subscribers.findIndex((x: IEventDetails) => x.id === id);

        if (subscription !== -1) {
            this.subscribers.splice(subscription, 1);
        } else {
            console.warn('cant find id');
        }
    }
}

interface IEventDetails {
    id: number,
    callback:any
}

export class EventBus {
    listener: Array<EventTopic> = new Array<EventTopic>();

    trigger = (name: string, args?: {}): void => {
        let subscriptor = this.listener.find(x => x.eventName === name);
        if (subscriptor) {
            subscriptor.notify(args);
        }
    }

    subscribe = (topic: string, callback: () => void): number => {
        let uniquieId = this.generateRandom();
        let subscriptor = this.listener.find(x => x.eventName === topic);
        subscriptor
            ? subscriptor.add({ id: uniquieId, callback: callback })
            : this.listener.push(new EventTopic(topic, { id: uniquieId, callback: callback }));

        return uniquieId;
    }

    unsubscribe = (id: number): void => {
        this.listener.forEach(function (item: EventTopic) {
            item.remove(id);
        });
    }

   private generateRandom = (): number => Date.now();
}



export let bus = new EventBus();