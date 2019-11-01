import {DecoratorFactory} from './decorator-factory';

/**
 * Decorates the delegate object using a decorator built by the given {@link DecoratorFactory|decorator factory}.
 * The decorated object is returned.
 *
 * The decorator factory is used to create a decorator. The decorator can (but doesn't have to) define any method
 * that is part of the delegate object.
 *
 * When a method of the decorated object is called, first, said method is called on the delegate object. The return value
 * of this function call is then handed over to the decorator factory as `originalValue` to create a new decorator object.
 *
 * Then, the method is called on the decorator object if defined by the decorator. The decorator object has access to
 * both the method's parameters and to the `originalValue`. The return value of the decorator's method is then returned
 * to the client.
 *
 * @param delegate - the object that is decorated
 * @param decoratorFactory - the factory used to build the decorator
 * @returns - the decorated object
 */
export function decorate<T extends Object>(delegate: T, decoratorFactory: DecoratorFactory<T>): T {
    return new Proxy(delegate, {
        get(_: T, p: keyof T): any {
            if (typeof delegate[p] !== 'function') {
                return delegate[p];
            }
            return (...args: any) => {
                const valueFromDelegate = (delegate[p] as unknown as Function)(args);
                const decorated = decoratorFactory(valueFromDelegate);
                if (decorated[p] == null) {
                    return valueFromDelegate;
                }
                return (decorated[p] as unknown as Function)(...args);
            };
        }
    });
}
