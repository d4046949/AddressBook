using AddressBook.Data.Entities;
using System.Data.Entity;

namespace AddressBook.Data
{
    public interface IDbContext
    {
        DbSet<Person> People { get; set; }
    }
}
