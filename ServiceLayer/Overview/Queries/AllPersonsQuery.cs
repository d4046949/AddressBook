using AddressBook.ServiceLayer.Overview.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Overview.Queries
{
    public class AllPersonsQuery : IQuery<Task<IList<Person>>>
    {
    }
}