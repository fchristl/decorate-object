import {decorate} from './decorate';
import { expect } from 'chai';

class DelegateClass {
    saySomething(person: string, text: string) {
        return `${person} says: "${text}".`;
    }
    sayNothing() {
        return '-';
    }
}

describe('Decorate', () => {
    const delegateObject = new DelegateClass();
    const testPerson = 'Person';
    const testText = 'Text';

    it('should pass methods that are not defined by the decorator through to the delegates', () => {
        const decoratedObject = decorate(delegateObject, (originalValue: string) => ({}));
        expect(decoratedObject.saySomething(testPerson, testText)).to.equal(delegateObject.saySomething(testPerson, testText));
        expect(decoratedObject.sayNothing()).to.equal(delegateObject.sayNothing());
    });

    it('should decorate a method and return the decorated values', () => {
        const decoratedObject = decorate(delegateObject, (originalValue: string) => ({
            saySomething: (person: string, name: string) => {
                return originalValue + ' (decorated)';
            }
        }));
        expect(decoratedObject.saySomething(testPerson, testText)).to.equal(delegateObject.saySomething(testPerson, testText) + ' (decorated)');
        expect(decoratedObject.sayNothing()).to.equal(delegateObject.sayNothing());
    });
});
