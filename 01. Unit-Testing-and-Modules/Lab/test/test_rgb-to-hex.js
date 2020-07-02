var rgb = require('../rgb-to-hex.js');
var expect = require('chai').expect;

describe('rgb', function() {
    it('test with invalid red non integer, returns undefined', function () {
        let actual = rgb('abc', 20, 30);
        expect(actual).to.be.undefined;
    });
    it('test with invalid red lower than 0, returns undefined', function () {
        let actual = rgb(-5, 20, 30);
        expect(actual).to.be.undefined;
    });
    it('test with invalid red bigger than 255, returns undefined', function () {
        let actual = rgb(256, 20, 30);
        expect(actual).to.be.undefined;
    });
    it('test with invalid green non integer, returns undefined', function () {
        let actual = rgb(20, 'abc', 30);
        expect(actual).to.be.undefined;
    });
    it('test with invalid green lower than 0, returns undefined', function () {
        let actual = rgb(20, -5, 30);
        expect(actual).to.be.undefined;
    });
    it('test with invalid green bigger than 255, returns undefined', function () {
        let actual = rgb(20, 256, 30);
        expect(actual).to.be.undefined;
    });
    it('test with invalid blue non integer, returns undefined', function () {
        let actual = rgb(20, 30, 'abc');
        expect(actual).to.be.undefined;
    });
    it('test with invalid blue lower than 0, returns undefined', function () {
        let actual = rgb(20, 30, -5);
        expect(actual).to.be.undefined;
    });
    it('test with invalid blue bigger than 255, returns undefined', function () {
        let actual = rgb(20, 30, 256);
        expect(actual).to.be.undefined;
    });
});
