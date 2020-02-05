/**
 * 
 * Code taken from Microsoft examples. 
 */
using Moq;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace AddressBook.ServiceLayer.Tests.Overview.Queries
{
    public static class QueryableExtensions
    {
        public static DbSet<T> BuildMockDbSet<T>(this IQueryable<T> source)
            where T : class
        {
            var mock = new Mock<DbSet<T>>();
            mock.As<IDbAsyncEnumerable<T>>()
                .Setup(x => x.GetAsyncEnumerator())
                .Returns(new TestDbAsyncEnumerator<T>(source.GetEnumerator()));

            mock.As<IQueryable<T>>()
                .Setup(x => x.Provider)
                .Returns(new TestDbAsyncQueryProvider<T>(source.Provider));

            mock.As<IQueryable<T>>()
                .Setup(x => x.Expression)
                .Returns(source.Expression);

            mock.As<IQueryable<T>>()
                .Setup(x => x.ElementType)
                .Returns(source.ElementType);

            mock.As<IQueryable<T>>()
                .Setup(x => x.GetEnumerator())
                .Returns(source.GetEnumerator());

            return mock.Object;
        }
    }
}
