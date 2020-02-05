using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Data.Entities
{
    [ExcludeFromCodeCoverage]
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}
