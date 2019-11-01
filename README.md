Helps decorate JavaScript objects using the 
[https://en.wikipedia.org/wiki/Decorator_pattern](Decorator Pattern).

# Motivation
The decorator pattern works well for classes, when you know the exact interface and exactly which methods you want to 
decorate. 

However, there are cases in which it helps to decorate an object during runtime.

# Installation
`npm install --save decorate-object`

# Usage
You can use `decorate` to decorate any object. The decorator is defined using a decorator factory function. 

The decorator factory is used to create a decorator. The decorator can (but doesn't have to) define any method
 that is part of the delegate object.

When a method of the decorated object is called, first, said method is called on the delegate object. The return value
of this function call is then handed over to the decorator factory as `originalValue` to create a new decorator object.

Then, the method is called on the decorator object if defined by the decorator. The decorator object has access to
both the method's parameters and to the `originalValue`. The return value of the decorator's method is then returned
to the client.

# Example
See [src/decorate.test.ts](the test)
