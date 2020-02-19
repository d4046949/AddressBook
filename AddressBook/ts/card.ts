import { bus } from './eventbus';

export class Card {
    card: HTMLElement;
    showMoreButton: HTMLElement;

    constructor() {

        this.showMoreButton = document.querySelector('[data-button-type="card-button"]');

        this.showMoreButton.addEventListener("click", this.onClick);
        console.log(this.showMoreButton  );
    }

    onClick = () => {
        alert('clicked');
        bus.trigger("modal:show");
    }
}