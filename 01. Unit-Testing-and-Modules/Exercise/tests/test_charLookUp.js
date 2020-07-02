var lookupChar = require('../charLookUp.js');
var expect = require('chai').expect;

describe('check return undefined', function() {
    it('Return undefined, when first parameter is not a string', function () {
        let result = lookupChar(2, 2);
        expect(result).to.be.undefined;
    });
    it('Return undefined, when second parameter is not a number', function () {
        let result = lookupChar(2, "2");
        expect(result).to.be.undefined;
    });
});

describe('check for correct index', function() {
    it('Return Incorrect index, when index < 0', function () {
        let result = lookupChar("koza", -2);
        expect(result).to.be.equal("Incorrect index");
    });
    it('Return undefined, when index is bigger than string length', function () {
        let result = lookupChar("koza", 5);
        expect(result).to.be.equal("Incorrect index");
    });
});

describe('check for correct behaviuor', function() {
    it('Return char at index', function () {
        let result = lookupChar("koza", 2);
        expect(result).to.be.equal("z");
    });

});





