using System.ComponentModel.DataAnnotations;

namespace AddressBook.Models
{
    public class NewPersonModel
    {
        [Required]
        public string Forename { get; set; }

        [Required]
        public string Surname { get; set; }
    }
}