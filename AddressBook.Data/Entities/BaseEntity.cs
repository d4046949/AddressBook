using System.ComponentModel.DataAnnotations;

namespace AddressBook.Data.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
