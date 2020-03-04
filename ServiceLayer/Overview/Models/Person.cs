using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;

namespace AddressBook.ServiceLayer.Overview.Models
{

    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DateOfBirth { get; set; }
        public List<CommunicationFeature> Features { get; set; }
    }
}
