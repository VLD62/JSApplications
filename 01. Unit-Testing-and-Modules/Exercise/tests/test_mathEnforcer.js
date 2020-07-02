var mathEnforcer = require('../mathEnforcer.js');
var expect = require('chai').expect;

describe('check mathEnforcer object', function() {
    it('Return correct object with nested functions', function () {
        let result = mathEnforcer;
        let reference = {
            addFive: function (num) {
                if (typeof(num) !== 'number') {
                    return undefined;
                }
                return num + 5;
            },
            subtractTen: function (num) {
                if (typeof(num) !== 'number') {
                    return undefined;
                }
                return num - 10;
            },
            sum: function (num1, num2) {
                if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
                    return undefined;
                }
                return num1 + num2;
            }
        }
        expect(result === reference);
    });
});

describe('check mathEnforcer addFive function', function() {
    it('Return correct result with number as input', function () {
        let result = mathEnforcer.addFive(10);
        expect(result).to.equal(15);
    });
    it('Return undefined result with non-number as input', function () {
        let result = mathEnforcer.addFive("koza");
        expect(result).to.be.undefined;
    });
});

describe('check mathEnforcer subtractTen function', function() {
    it('Return correct result with number as input', function () {
        let result = mathEnforcer.subtractTen(10);
        expect(result).to.equal(0);
    });
    it('Return undefined result with non-number as input', function () {
        let result = mathEnforcer.addFive("koza");
        expect(result).to.be.undefined;
    });
});

describe('check mathEnforcer sum function', function() {
    it('Return correct result with number as input', function () {
        let result = mathEnforcer.sum(10,5);
        expect(result).to.equal(15);
    });
    it('Return undefined result with non-number as input', function () {
        let result = mathEnforcer.sum(5,"koza");
        expect(result).to.be.undefined;
        result = mathEnforcer.sum("koza", 5);
        expect(result).to.be.undefined;
    });
});


