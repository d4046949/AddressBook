using StructureMap;

namespace AddressBook.Data
{
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
