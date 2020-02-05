using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Data.Entities
{
    [ExcludeFromCodeCoverage]
    public class Address : BaseEntity
    {
        public string HouseName { get; set; }
        public string Number { get; set; }
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string PostCode { get; set; }

        public virtual ICollection<Person> Occupants { get; set; }
    }
}
