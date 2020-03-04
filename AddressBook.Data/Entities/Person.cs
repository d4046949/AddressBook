using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Data.Entities
{
    [ExcludeFromCodeCoverage]
    public class Person : BaseEntity
    {
        public string Firstname { get; set; }
        public string Surname { get; set; }
        public string DateOfBirth { get; set; }
        public virtual List<Communication> Communication { get; set; }
    }
}
