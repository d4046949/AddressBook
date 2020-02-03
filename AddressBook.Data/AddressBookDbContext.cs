using AddressBook.Data.Entities;
using System.Data.Entity;
using System.Data.SqlServerCe;

namespace AddressBook.Data
{

    public class AddressBookDbContext : DbContext, IDbContext
    {
        public AddressBookDbContext() :
              base(new SqlCeConnection("Data Source=|DataDirectory|MyDB.sdf"),
              contextOwnsConnection: true)
        {
        }

        public virtual DbSet<Person> People { get; set; }
    }
}
