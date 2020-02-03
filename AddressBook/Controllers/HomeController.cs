using AddressBook.ServiceLayer;
using AddressBook.ServiceLayer.Overview.Models;
using AddressBook.ServiceLayer.Overview.Queries;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AddressBook.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMediator mediator;

        public HomeController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<ActionResult> Index()
        {
           IList<Person> model = await mediator.RequestAsync(new AllPersonsQuery());

            return View(model);
        }
    }
}