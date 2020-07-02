var isOddOrEven = require('../isOddOrEven.js');
var expect = require('chai').expect;

describe('check return undefined', function() {
    it('Return undefined, when parameter is not a string', function () {
        let result = isOddOrEven(2);
        expect(result).to.be.undefined;
    });
    it('Return undefined, when parameter is empty', function () {
        let result = isOddOrEven();
        expect(result).to.be.undefined;
    });
});

describe('check return even', function() {
    it('Return even, when parameter is string with even length', function () {
        let result = isOddOrEven("koza");
        expect(result).to.equal("even", "Function did not return correct result!");;
    });
});

describe('check return odd', function() {
    it('Return odd, when parameter is string with odd length', function () {
        let result = isOddOrEven("kozabalon");
        expect(result).to.equal("odd",  "Function did not return correct result!");;
    });
});



