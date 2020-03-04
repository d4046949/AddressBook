using AddressBook.Controllers;
using AddressBook.ServiceLayer;
using AddressBook.ServiceLayer.Overview.Models;
using AddressBook.ServiceLayer.Overview.Queries;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AddressBook.Tests.Controllers
{
    [ExcludeFromCodeCoverage]
    [TestFixture]
    public class HomeControllerTests
    {
        private HomeController _controller;
        private Mock<IMediator> _mediator;

        [SetUp]
        public void Setup()
        {
            _mediator = new Mock<IMediator>();
            _controller = new HomeController(_mediator.Object);
        }

        [Test]
        public void Home_Controller_Is_A_Controller()
        {
            // Assert
            Assert.IsInstanceOf<Controller>(_controller);
        }

        [Test]
        public async Task HomeControllerIndex_Returns_View()
        {
            // Act
            var result = await _controller.Index();

            // Assert
            Assert.IsInstanceOf<ViewResult>(result);
        }

        [Test]
        public async Task HomeControllerIndex_Returns_Correct_View()
        {
            // Act
            var result = await _controller.Index() as ViewResult;

            // Assert
            Assert.AreEqual("Index", result.ViewName);
        }

        [Test]
        public async Task HomeControllerIndex_Returns_Null_Model_When_Null_Is_Returned_From_Query()
        {
            // Act
            var result = await _controller.Index() as ViewResult;

            // Assert
            Assert.IsNull((IList<Person>)result.ViewData.Model);
        }

        [Test]
        public async Task HomeControllerIndex_Returns_Correct_Model_When_Real_Data_Is_Returned_From_Query()
        {
            // Setup
            var mockData = new List<Person> {
                new Person { Name = "john", Id = 1 },
                new Person { Name = "Smith", Id = 2 }
            };

             _mediator.Setup(m => m.RequestAsync(It.IsAny<AllPersonsQuery>())).ReturnsAsync(mockData);

            // Act
            var result = await _controller.Index() as ViewResult;

            // Assert
            result.Model.Should().BeEquivalentTo(mockData);
        }
    }
}
