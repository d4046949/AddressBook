import { bus } from './eventbus';

export class Card {
    card: JQuery<HTMLElement>;;
    showMoreButton: JQuery<HTMLElement>;;

    constructor() {
        this.showMoreButton = $('[data-button-type="card-button"]');
        this.showMoreButton.on('click', this.onClick);
    }

    onClick = () => {
        bus.trigger("modal:show");
    }
}