using AddressBook.Data;
using AddressBook.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Entries.Commands
{
    public class CreatePersonCommandHandler : ICommandHandler<CreatePersonCommand, Task<AjaxCommandResult>>
    {
        private readonly IDbContext _dbContext;

        public CreatePersonCommandHandler(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AjaxCommandResult> Handle(CreatePersonCommand command)
        {
            var newPerson = new Person
            {
                Firstname = command.Firstname,
                Surname = command.Surname,
                DateOfBirth = command.DateOfBirth
            };

            newPerson.Communication = MapCommuncation(command, newPerson);

            _dbContext.People.Add(newPerson);


            await _dbContext.SaveChangesAsync();

            return new AjaxCommandResult(true)
            {
                Id = newPerson.Id
            };
        }

        private List<Communication> MapCommuncation(CreatePersonCommand command, Person p)
        {
            var comms = new List<Communication>();

            if (!string.IsNullOrEmpty(command.FaceBookAccount))
            {
                comms.Add(new Communication { Type = CommunicationMediaType.FaceBook, Url = command.FaceBookAccount, Person = p });
            }

            if (!string.IsNullOrEmpty(command.Twitter))
            {
                comms.Add(new Communication { Type = CommunicationMediaType.Twitter, Url = command.Twitter, Person = p });
            }

            if (!string.IsNullOrEmpty(command.Email))
            {
                comms.Add(new Communication { Type = CommunicationMediaType.Email, Url = command.Email, Person = p });
            }
           
            return comms;
        }
    }
}