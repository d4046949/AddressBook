using AddressBook.Data.Entities;
using System.Data.Entity;
using System.Data.SqlServerCe;
using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Data
{
    [ExcludeFromCodeCoverage]
    public class AddressBookDbContext : DbContext, IDbContext

    {
        public AddressBookDbContext() :
              base(new SqlCeConnection("Data Source=|DataDirectory|MyDB.sdf"),
              contextOwnsConnection: true)
        {
        }

        public DbSet<Person> People { get; set; }
    }
}
