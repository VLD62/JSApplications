var checkForSymmetry = require('../checkForSymmetry.js');
var expect = require('chai').expect;

describe('check for Non Array', function() {
    it('test with string, returns false', function () {
        let actual = checkForSymmetry('abc');
        expect(actual).to.be.false;
    });
});

describe('check for Non-Equal Array', function() {
    it('test with non-equal array, returns false', function () {
        let actual = checkForSymmetry([1,2,3,4]);
        expect(actual).to.be.false;
    });
});

describe('check for Equal Array', function() {
    it('test with equal array, returns true', function () {
        let actual = checkForSymmetry([1,2,2,1]);
        expect(actual).to.be.true;
    });
});


