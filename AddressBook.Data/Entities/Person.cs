using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Data.Entities
{
    [ExcludeFromCodeCoverage]
    public class Person : BaseEntity
    {
        public string Firstname { get; set; }
        public string Surname { get; set; }
        /*public int? AddressId { get; set; }

        public virtual Address Address { get; set; }*/
    }
}
