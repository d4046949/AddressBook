using AddressBook.Data;
using StructureMap;

namespace AddressBook.ServiceLayer
{
    public class ServiceLayerRegistry : Registry
    {
        public ServiceLayerRegistry()
        {
            Scan(
               scan => {
                   scan.TheCallingAssembly();
                   scan.WithDefaultConventions();

                   scan.AddAllTypesOf(typeof(ICommandHandler<,>));
                   scan.AddAllTypesOf(typeof(IQueryHandler<,>));
               });


            IncludeRegistry<DataLayerRegistry>();
        }
    }
}
