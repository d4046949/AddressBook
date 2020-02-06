using AddressBook.Controllers;
using AddressBook.ServiceLayer;
using Moq;
using NUnit.Framework;
using System.Web.Mvc;

namespace AddressBook.Tests.Controllers
{
    [TestFixture]
    public class PersonControllerTests
    {
        private PersonController _controller;
        private Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _controller = new PersonController(_mediator.Object);
        }

        [Test]
        public void Home_Controller_Is_A_Controller()
        {
            // Assert
            Assert.IsInstanceOf<Controller>(_controller);
        }

        [Test]
        public void Home_Controller_Returns_View_If_Validation_Fails()
        {
            // Setup
            _controller.ModelState.AddModelError("test", "test");

            // Act
            var result = _controller.CreateNewPerson(new Models.NewPersonModel());

            // Assert
            Assert.IsInstanceOf<PartialViewResult>(result);
        }
    }
}
