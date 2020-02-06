using AddressBook.Models;
using AddressBook.ServiceLayer;
using System.Web.Mvc;

namespace AddressBook.Controllers
{
    public class PersonController : Controller
    {
        private readonly IMediator mediator;

        public PersonController(IMediator mediator)
        {
            this.mediator = mediator;
        }


        public PartialViewResult NewPerson()
        {
            return PartialView("_NewPerson");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreateNewPerson(NewPersonModel model)
        {
            return Json(true);
        }
    }
}