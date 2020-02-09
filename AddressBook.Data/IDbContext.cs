using AddressBook.Data.Entities;
using System.Data.Entity;
using System.Threading.Tasks;

namespace AddressBook.Data
{
    public interface IDbContext
    {
        DbSet<Person> People { get; set; } 

        Task<int> SaveChangesAsync();
    }
}
