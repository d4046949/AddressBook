using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Data.Entities
{
    [ExcludeFromCodeCoverage]
    public class Communication : BaseEntity
    {
        public CommunicationMediaType Type { get; set; }

        public string Url { get; set; }

        public int PersonId { get; set; }

        public virtual Person Person { get; set; }
    }
}
