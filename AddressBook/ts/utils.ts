import { bus } from './eventbus';
import { NewPerson } from './newperson';

export class Utils {

    constructor() {
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
                    new NewPerson().init();
                }
            });
        });
    }
    
}