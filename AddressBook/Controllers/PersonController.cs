using AddressBook.Models;
using AddressBook.ServiceLayer;
using AddressBook.ServiceLayer.Entries.Commands;
using System.Web.Mvc;

namespace AddressBook.Controllers
{
    public class PersonController : Controller
    {
        private readonly IMediator _mediator;

        public PersonController(IMediator mediator)
        {
            _mediator = mediator;
        }


        public PartialViewResult NewPerson()
        {
            return PartialView("_NewPerson");
        }

        [HttpPost]
        public ActionResult CreateNewPerson(NewPersonModel model)
        {
            if (ModelState.IsValid)
            {
                _mediator.Send(new CreatePersonCommand
                {
                    Firstname = model.Forename,
                    Surname = model.Surname
                });
                
                return Json(true);
            }

            return PartialView("_NewPerson", model);
        }

        [HttpGet]
        public PartialViewResult Details(int id)
        {
            return PartialView("_Details");
        }
    }
}