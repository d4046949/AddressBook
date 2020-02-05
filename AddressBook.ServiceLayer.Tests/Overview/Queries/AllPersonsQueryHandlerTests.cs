using AddressBook.Data;
using AddressBook.ServiceLayer.Overview.Models;
using AddressBook.ServiceLayer.Overview.Queries;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Tests.Overview.Queries
{
    [ExcludeFromCodeCoverage]
    [TestFixture]
    public class AllPersonsQueryHandlerTests
    {
        private Mock<IDbContext> _dbCtx;
        private AllPersonsQueryHandler _handler;
        private DbSet<Data.Entities.Person> persons = new List<Data.Entities.Person>()
            .AsQueryable()
            .BuildMockDbSet();

        [SetUp]
        public void Setup()
        {

            var usersMock = new Mock<DbSet<Data.Entities.Person>>();

            _dbCtx = new Mock<IDbContext>();

            _dbCtx.Setup(x => x.People).Returns(persons);

            _handler = new AllPersonsQueryHandler(_dbCtx.Object);
        }

        [Test]
        public void Ensure_Query_Handler_Is_Of_Type_IQueryHandler()
        {
            // Assert
            Assert.IsInstanceOf<IQueryHandler<AllPersonsQuery, Task<IList<Person>>>>(_handler);
        }

        [Test]
        public async Task Handle_Returns_Empty_List_When_No_Elements_Exist()
        {
            // Act
            var result = await _handler.Handle(new AllPersonsQuery());

            // Assert
            Assert.AreEqual(0, result.Count);
        }

        [Test]
        public async Task Handle_Returns_Correctly_Mapped_List()
        {
            // Setup
            var expectedResult = new List<Person>
            {
                new Person { Id = 1, FirstName = "Fred" }
            };

            var mockData = new List<Data.Entities.Person>
            {
                new Data.Entities.Person { Id = 1, Surname = "Test", Firstname = "Fred" }
            }
            .AsQueryable()
            .BuildMockDbSet();

            _dbCtx.Setup(x => x.People).Returns(mockData);

            // Act
            var result = await _handler.Handle(new AllPersonsQuery());

            // Assert
            result.Should().BeEquivalentTo(expectedResult);
        }
    }
}
