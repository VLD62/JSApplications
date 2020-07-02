var Console = require('../specialConsole.js');
var expect = require('chai').expect;

describe('Check constructor:', function () {
    it('Return correct object instance of Console.', function () {
        let result = new Console();
        expect(result.constructor.name).to.equal('Console');
    });

});
describe('Check writeLine method:', function () {
    describe('String input type:', function () {
        it('Return same input string when passed.', function () {
            expect(Console.writeLine('koza')).to.equal('koza');
        });
    });
    describe('Object input type:', function () {
        it('Return json string repr of passed object.', function () {
            let kozaObj = {name: 'Boika', age: 25, type: 'Planinska Koza'}
            expect(Console.writeLine(kozaObj)).to.equal(JSON.stringify(kozaObj));
        });
    });
    describe('Multiple input arguments:', function () {
        it('Return TypeError error if first argument not a string.', function () {
            let kozaObj = {name: 'Boika', age: 25, type: 'Planinska Koza'}
            expect(function () {
                Console.writeLine(kozaObj, 3, 4, 7);
            }).to.throw(TypeError, 'No string format given!');
        });
        it('Return RangeError error when number of parameters not equal placeholders.', function () {
            expect(function () {
                Console.writeLine('The sum of {0} and {1} is {2}', 3, 4);
            }).to.throw(RangeError, 'Incorrect amount of parameters given!');
        });
        it('Return RangeError error if incorrect index number given.', function () {
            expect(function () {
                Console.writeLine('The sum of {0} and {1} is {4}', 3, 4, 7);
            }).to.throw(RangeError, 'Incorrect placeholders given!');
        });
        it('Return new string with supplied parameters', function () {
            let expected = 'The sum of 3 and 4 is 7'
            expect(Console.writeLine('The sum of {0} and {1} is {2}', 3, 4, 7)).to.equal(expected);
        });
    });
});

