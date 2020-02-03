namespace AddressBook.ServiceLayer
{
    public interface IQueryHandler<in TQ, out TQr> where TQ : IQuery<TQr>
    {
        TQr Handle(TQ query);
    }
}