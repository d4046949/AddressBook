using AddressBook.Data;
using AddressBook.Data.Entities;
using AddressBook.ServiceLayer.Overview.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Overview.Queries
{ 
    public class AllPersonsQueryHandler : IQueryHandler<AllPersonsQuery, Task<IList<Models.Person>>>
    {
        private readonly IDbContext ctx;

        public AllPersonsQueryHandler(IDbContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task<IList<Models.Person>> Handle(AllPersonsQuery query)
        {
            var entries = await ctx.People.ToListAsync();

            return entries.Select(p => new Models.Person
            {
                Id = p.Id,
                Name = p.Firstname + " " + p.Surname,
                DateOfBirth = p.DateOfBirth,
                Features = p.Communication.Select(c => new CommunicationFeature
                {
                    Url = c.Url,
                    Icon = MapTypeToIcon(c.Type)
                }).ToList()
            }).ToList();
               
        }

        public static string MapTypeToIcon(CommunicationMediaType communcationType)
        {
            switch (communcationType)
            {
                case CommunicationMediaType.Email:
                    return "fas fa-at";
                case CommunicationMediaType.FaceBook:
                    return "fab fa-facebook-square";
                case CommunicationMediaType.Twitter:
                    return "fab fa-twitter";
            }
            return string.Empty;
        }
    }
}