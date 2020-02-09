using AddressBook.Data;
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
            var newPerson = new Data.Entities.Person
            {
                Firstname = command.Firstname,
                Surname = command.Surname
            };

            _dbContext.People.Add(newPerson);

            await _dbContext.SaveChangesAsync();

            return new AjaxCommandResult(true)
            {
                Id = newPerson.Id
            };
        }
    }
}