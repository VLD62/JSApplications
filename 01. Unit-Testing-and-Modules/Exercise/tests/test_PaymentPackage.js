var PaymentPackage = require('../PaymentPackage.js');
var expect = require('chai').expect;

describe('check PaymentPackage constructor', function() {
    it('Return correct object instance of PaymentPackage', function () {
        let result = new PaymentPackage('Basic', 62);
        expect(result.constructor.name).to.equal('PaymentPackage');
    });
    it('Return error when name is empty string or non-string type', function () {
        expect(function(){
            let result = new PaymentPackage('', 62);
        }).to.throw(Error, 'Name must be a non-empty string');
        expect(function(){
            let result = new PaymentPackage(62, 62);
        }).to.throw(Error, 'Name must be a non-empty string');
    });
    it('Return error when value is not or negative number', function () {
        expect(function(){
            let result = new PaymentPackage('Basic', -62);
        }).to.throw(Error, 'Value must be a non-negative number');
        expect(function(){
            let result = new PaymentPackage('Basic', '62');
        }).to.throw(Error, 'Value must be a non-negative number');
    });
});
describe('check PaymentPackage getter and setter methods', function() {
    it('Set correct VAT, returns it', function () {
        let result = new PaymentPackage('Basic', 62);
        result.VAT = 50
        expect(result.VAT).to.equal(50);
    });
    it('Set correct active, returns it', function () {
        let result = new PaymentPackage('Basic', 62);
        expect(result.active).to.be.true;
        result.active = false;
        expect(result.active).to.be.false;
    });
    it('Return error when new VAT value is not or negative number', function () {
        let result = new PaymentPackage('Basic', 62);
        expect(function(){
            result.VAT = "50"
        }).to.throw(Error, 'VAT must be a non-negative number');
        expect(function(){
            result.VAT = -50
        }).to.throw(Error, 'VAT must be a non-negative number');
    });
    it('Return error when new active status is not boolean', function () {
        let result = new PaymentPackage('Basic', 62);
        expect(function(){
            result.active = -50
        }).to.throw(Error, 'Active status must be a boolean');
    });
});
describe('check toString function', function() {
    it('return a string, containing an overview of the active instance', function () {
        let result = new PaymentPackage('Basic', 62);
        let expected = 'Package: Basic\n- Value (excl. VAT): 62\n- Value (VAT 20%): 74.39999999999999'
        expect(result.toString()).to.equal(expected);
    });
    it('return a string, containing an overview of the inactive instance', function () {
        let result = new PaymentPackage('Basic', 62);
        result.active = false;
        let expected = 'Package: Basic (inactive)\n- Value (excl. VAT): 62\n- Value (VAT 20%): 74.39999999999999'
        expect(result.toString()).to.equal(expected);
    });

});