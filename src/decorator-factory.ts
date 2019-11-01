/**
 * A factory function that builds a {@link Decorator}.
 *
 */
import {Decorator} from './decorator';

export type DecoratorFactory<T> = (originalValue: any) => Decorator<T>;
