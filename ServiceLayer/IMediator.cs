using System.Threading.Tasks;

namespace AddressBook.ServiceLayer
{
    public interface IMediator
    {
        TResult Send<TResult>(ICommand<TResult> command);

        TResponse RequestAsync<TResponse>(IQuery<TResponse> query);
    }
}