var createCalculator = require('../addSubtract.js');
var expect = require('chai').expect;

describe('check return a module', function() {
    it('Return object, containing  add(), subtract() and get()', function () {
        let calculator = createCalculator();
        let reference = {
            add: function(num) { value += Number(num); },
            subtract: function(num) { value -= Number(num); },
            get: function() { return value; }
        };
        expect(calculator === reference);
    });
});

describe('check internal sum can`t be modified from outside', function() {
    it('internal sum can`t be modified from outside', function () {
        let calculator = createCalculator();
        calculator.add(5);
        calculator.value = 10
        expect(calculator.get()).to.be.equal(5);
    });
});

describe('add() and subtract() take a parameter that can be parsed as a number', function() {
    it('test add "5" and subtract "2" equals to number 3', function () {
        let calculator = createCalculator();
        calculator.add("5");
        calculator.subtract("2");
        expect(calculator.get()).to.be.equal(3);
    });
});

describe('check add function', function() {
    it('test add 5, returns 5', function () {
        let calculator = createCalculator();
        calculator.add(5);
        expect(calculator.get()).to.be.equal(5);
    });
    it('test add 5 two times, returns 10', function () {
        let calculator = createCalculator();
        calculator.add(5);
        calculator.add(5);
        expect(calculator.get()).to.be.equal(10);
    });
});

describe('check subtract function', function() {
    it('test subtract 5, returns -5', function () {
        let calculator = createCalculator();
        calculator.subtract(5);
        expect(calculator.get()).to.be.equal(-5);
    });
    it('test subtract 5 two times, returns -10', function () {
        let calculator = createCalculator();
        calculator.add(-5);
        calculator.add(-5);
        expect(calculator.get()).to.be.equal(-10);
    });
});

describe('check subtract and add functions', function() {
    it('test add 5 and subtract 5, returns 0', function () {
        let calculator = createCalculator();
        calculator.add(5);
        calculator.subtract(5);
        expect(calculator.get()).to.be.equal(0);
    });
});


