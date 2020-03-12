export class NewPerson {
    dateOfBirth: JQuery<HTMLElement>;

    init = () => {
        this.dateOfBirth = $('#DateOfBirth');
        this.dateOfBirth.keypress((e: JQuery.Event) => {
            if (this.dateOfBirth.val().toString().length == 2 || this.dateOfBirth.val().toString().length == 5) {
                this.dateOfBirth.val(this.dateOfBirth.val() + '/');
            }
            console.log(this.dateOfBirth.val());
        });
    }
}
