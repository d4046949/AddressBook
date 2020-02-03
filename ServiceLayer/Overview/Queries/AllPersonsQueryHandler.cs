using AddressBook.Data;
using AddressBook.ServiceLayer.Overview.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Overview.Queries
{
    public class AllPersonsQueryHandler : IQueryHandler<AllPersonsQuery, Task<IList<Person>>>
    {
        private readonly IDbContext ctx;

        public AllPersonsQueryHandler(IDbContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<IList<Person>> Handle(AllPersonsQuery query)
        {
            return await ctx.People
                .Select(p => new Person
                {
                    FirstName = p.Firstname,
                    Id = p.Id
                })
                .ToListAsync();
        }
    }
}