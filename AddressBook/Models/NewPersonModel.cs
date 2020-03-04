using System.ComponentModel.DataAnnotations;

namespace AddressBook.Models
{
    public class NewPersonModel
    {
        private const string DateOfBirthValidationRegex = @"^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$";

        [Required]
        public string Forename { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [Display(Name = "Date of Birth")]
        [RegularExpression(DateOfBirthValidationRegex, ErrorMessage =  "Please enter dd/mm/yyyy")]
        public string DateOfBirth { get; set; }

        public string Address { get; set; }

        [Display(Name = "Twitter")]
        public string TwitterAccount { get; set; }

        [Display(Name = "Facebook")]
        public string FaceBookAccount { get; set; }

        public string Email { get; set; }
    }
}