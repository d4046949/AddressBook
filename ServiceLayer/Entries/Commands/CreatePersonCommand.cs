using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Entries.Commands
{
    public class CreatePersonCommand : ICommand<Task<AjaxCommandResult>>
    {
        public string Firstname { get; set; }
        public string Surname { get; set; }
    }
}