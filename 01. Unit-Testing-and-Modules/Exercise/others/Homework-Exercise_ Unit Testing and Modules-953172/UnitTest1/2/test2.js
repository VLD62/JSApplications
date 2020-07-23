const expect = require('chai').expect;
const app = require('./charLookUp.js');

describe('Functionality of lookupChar', function() {
    describe('first parameter is NOT a string or the second parameter is NOT a number', function() {
        it('should return undefined if the first parameter is NOT a string', function() {
            expect(app.lookupChar(5, 2)).to.equal(undefined, 
                'The function did not return the correct result!');
        });

        it('should return undefined if the first parameter is NOT a string', function() {
            expect(app.lookupChar(['some', 'text', 'here'], 2)).to.equal(undefined, 
                'The function did not return the correct result!');
        });

        it('should return undefined if the second parameter is NOT a number', function() {
            expect(app.lookupChar('Peter', '2')).to.equal(undefined, 
                'The function did not return the correct result!');
        });

        it('should return undefined if the second parameter is NOT a number', function() {
            expect(app.lookupChar('Peter', {age: 2})).to.equal(undefined, 
                'The function did not return the correct result!');
        });

        it('should return undefined if the second parameter is a floating point number', function() {
            expect(app.lookupChar('Peter', 2.71)).to.equal(undefined, 
                'The function did not return the correct result!');
        });
    });

    describe('Incorrect index value', function() {
        it('should return incorrect index with an incorrect index value', function() {
            expect(app.lookupChar('Welcome', 25)).to.equal('Incorrect index', 
                'The function did not return the correct value!');
        });

        it('should return incorrect index with a negative index value', function() {
            expect(app.lookupChar('Welcome', -2)).to.equal('Incorrect index', 
                'The function did not return the correct value!');
        });

        it('should return incorrect index with an index value equal to string length', function() {
            expect(app.lookupChar('Welcome', 7)).to.equal('Incorrect index', 
                'The function did not return the correct value!');
        });
    });

    describe('Correct parameters', function() {
        it('should return correct value with correct parameters', function() {
            expect(app.lookupChar('Some text', 4)).to.equal(' ', 
                'The function did not return the correct value!');
        });

        it('should return correct value with correct parameters', function() {
            expect(app.lookupChar('Peter', 2)).to.equal('t', 
                'The function did not return the correct value!');
        });

        it('should return correct value with correct parameters', function() {
            expect(app.lookupChar('Welcome', 0)).to.equal('W', 
                'The function did not return the correct value!');
        });
    });
});
