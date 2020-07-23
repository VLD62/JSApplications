const expect = require('chai').expect;
const StringBuilder = require('./String_Builder.js');

describe('StringBuilder', function () {
    const validString = 'hello';

    describe('StringBuilder instantiation and structure', function () {

        it('should work with valid parameter - string', function () {
            expect(() => new StringBuilder(validString)).to.not.throw();
        });

        it('should work with valid parameter - without anything', function () {
            expect(() => new StringBuilder()).to.not.throw();
        });


        //invalid parameter
        it('should not work with invalid parameter - number', function () {
            expect(() => new StringBuilder(5)).to.throw();
        });
    });

    describe('StringBuilder functions', function () {
        let instance = null;

        beforeEach(() => {
            instance = new StringBuilder(validString);
        });

        it('should append sting as expected', function () {
            instance.append(', world');
            expect((instance._stringArray).join('')).to.equal('hello, world');
        });

        it('should throw error when a non string is append - number', function () {
            expect(() => instance.append(20)).to.throw('Argument must be string');
        });

        it('should prepend sting as expected', function () {
            instance.prepend('George says ');
            expect((instance._stringArray).join('')).to.equal('George says hello');
        });

        it('should throw error when a non string is prepend - number', function () {
            expect(() => instance.prepend(20)).to.throw('Argument must be string');
        });

        it('should insert a string at index as expected', function () {
            instance.insertAt(', Peter', 5);
            expect((instance._stringArray).join('')).to.equal('hello, Peter');
        });

        it('should throw error when a non string is inserted at a given index - number', function () {
            expect(() => instance.insertAt(20, 5)).to.throw('Argument must be string');
        });

        it('should remove an element with given startIndex and length as expected', function () {
            instance.remove(2, 3);
            expect((instance._stringArray).join('')).to.equal('he');
        });

        it('should return a result as string when a method toString() is called', function () {
            expect(instance.toString()).to.equal('hello');
        });

    });

    describe('Properties of an instance of StringBuilder', function () {
        let instance = null;

        beforeEach(() => {
            instance = new StringBuilder();
        });

        it('should have own property', function () {
            expect(instance.hasOwnProperty('_stringArray')).to.be.true;
        });

        it('should have functions attached to the prototype', function () {
            expect(Object.getPrototypeOf(instance).hasOwnProperty('append')).to.be.true;
            expect(Object.getPrototypeOf(instance).hasOwnProperty('prepend')).to.be.true;
            expect(Object.getPrototypeOf(instance).hasOwnProperty('insertAt')).to.be.true;
            expect(Object.getPrototypeOf(instance).hasOwnProperty('remove')).to.be.true;
            expect(Object.getPrototypeOf(instance).hasOwnProperty('toString')).to.be.true;
        });
    });
});