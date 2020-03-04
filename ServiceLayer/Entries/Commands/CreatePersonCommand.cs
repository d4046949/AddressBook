using System.Threading.Tasks;

namespace AddressBook.ServiceLayer.Entries.Commands
{
    public class CreatePersonCommand : ICommand<Task<AjaxCommandResult>>
    {
        public string Firstname { get; set; }
        public string Surname { get; set; }

        public string DateOfBirth { get; set; }
        public string Twitter { get; set; }

        public string FaceBookAccount { get; set; }
        public string Email { get; set; }
    }
}