using StructureMap;
using System.Diagnostics.CodeAnalysis;

namespace AddressBook.Data
{
    [ExcludeFromCodeCoverage]
    public class DataLayerRegistry : Registry
    {
        public DataLayerRegistry()
        {
            Scan(
               scan => {
                   scan.TheCallingAssembly();
                   scan.WithDefaultConventions();
               });

            For<IDbContext>().Use(new AddressBookDbContext());
        }
    }
}
