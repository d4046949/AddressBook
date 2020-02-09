using AddressBook.Data;
using AddressBook.ServiceLayer.Entries.Commands;
using AddressBook.ServiceLayer.Tests.Overview.Queries;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Tests.Entries
{
    [TestFixture]
    public class CreatePersonCommandHandlerTests
    {
        private Mock<IDbContext> mockDb = new Mock<IDbContext>();

        private DbSet<Data.Entities.Person> persons = new List<Data.Entities.Person>()
            .AsQueryable()
            .BuildMockDbSet();

        private CreatePersonCommandHandler handler;

        [SetUp]
        public void Setup()
        {
            var usersMock = new Mock<DbSet<Data.Entities.Person>>();

            mockDb = new Mock<IDbContext>();

            mockDb.Setup(x => x.People).Returns(persons);
            mockDb.Setup(x => x.SaveChangesAsync()).ReturnsAsync(1);

            handler = new CreatePersonCommandHandler(mockDb.Object);
        }

        [Test]
        public void CreatePersonHandler_Is_Type_Of_ICommandHandler()
        {
            // Assert
            Assert.IsInstanceOf<ICommandHandler<CreatePersonCommand, Task<AjaxCommandResult>>>(handler);
        }

        [Test]
        public void CreatePersonHandler_Calls_SaveChanges()
        {
            // Setup
            var handler = new CreatePersonCommandHandler(mockDb.Object);

            // Act
            handler.Handle(new CreatePersonCommand());

            // Verify
            mockDb.Verify(x => x.SaveChangesAsync(), Times.Once);
        }

        [Test]
        public void CreatePersonHandler_Returns_Ajax_Command_Result()
        {
            // Setup
            var handler = new CreatePersonCommandHandler(mockDb.Object);

            // Act
            var result = handler.Handle(new CreatePersonCommand());

            // Verify
            Assert.IsInstanceOf<Task<AjaxCommandResult>>(result);
        }

        [Test]
        public void CreatePersonHandler_Returns_Id_In_Response()
        {
            // Setup
            var handler = new CreatePersonCommandHandler(mockDb.Object);

            var expectedResult = new AjaxCommandResult(true);

            // Act
            var result = handler.Handle(new CreatePersonCommand
            {
                Firstname = "test",
                Surname = "test2"
            }).Result;

            // Assert
            result.Should().BeEquivalentTo(expectedResult);
        }
    }
}
