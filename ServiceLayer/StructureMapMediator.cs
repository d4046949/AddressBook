using StructureMap;
using System;
using System.Reflection;

namespace AddressBook.ServiceLayer
{

    public class Mediator : IMediator
    {
        private readonly IContainer _container;

        public Mediator(IContainer container)
        {
            _container = container;
        }

        public TResponse Request<TResponse>(IQuery<TResponse> query)
        {
            var handlerTypeTemplate = typeof(IQueryHandler<,>);
            var handlerType = handlerTypeTemplate.MakeGenericType(query.GetType(), typeof(TResponse));

            var handler = _container.GetInstance(handlerType);

            var method = GetHandlerMethod(handlerType, "Handle", query.GetType());

            try
            {
                return (TResponse)method.Invoke(handler, new object[] { query });
            }
            catch (TargetInvocationException ex)
            {
                throw ex.InnerException ?? ex;
            }
        }

        private MethodInfo GetHandlerMethod(Type handlerType, string methodName, Type messageType)
        {
            return handlerType.GetMethod(methodName,
                BindingFlags.Public | BindingFlags.Instance | BindingFlags.InvokeMethod,
                null, CallingConventions.HasThis,
                new[] { messageType }, null);
        }

        public TResult Send<TResult>(ICommand<TResult> command)
        {
            var handlerTypeTemplate = typeof(ICommandHandler<,>);
            var handlerType = handlerTypeTemplate.MakeGenericType(command.GetType(), typeof(TResult));

            var handler = _container.GetInstance(handlerType);

            var method = GetHandlerMethod(handlerType, "Handle", command.GetType());

            try
            {
                return (TResult)method.Invoke(handler, new object[] { command });
            }
            catch (TargetInvocationException ex)
            {
                throw ex.InnerException ?? ex;
            }
        }

        public TResponse RequestAsync<TResponse>(IQuery<TResponse> query)
        {
            var handlerTypeTemplate = typeof(IQueryHandler<,>);
            var handlerType = handlerTypeTemplate.MakeGenericType(query.GetType(), typeof(TResponse));

            var handler = _container.GetInstance(handlerType);

            var method = GetHandlerMethod(handlerType, "Handle", query.GetType());

            try
            {
                return (TResponse)method.Invoke(handler, new object[] { query });
            }
            catch (TargetInvocationException ex)
            {
                throw ex.InnerException ?? ex;
            }
        }
    }
}