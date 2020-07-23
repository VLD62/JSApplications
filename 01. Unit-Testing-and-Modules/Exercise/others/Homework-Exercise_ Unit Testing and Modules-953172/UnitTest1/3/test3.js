const expect = require('chai').expect;
const mathEnforcer = require('./03.Math_Enforcer.js');

describe('mathEnforcer', function() {
    describe('Functionality addFive', function() {
        it('should return undefined with a non-number parameter', function() {
            expect(mathEnforcer.addFive('4')).to.equal(undefined, 'The result is incorrect!');
        });

        it('should return undefined with a missing parameter', function() {
            expect(mathEnforcer.addFive()).to.equal(undefined, 'The result is incorrect!');
        });

        it('should return correct result with a positive number parameter', function() {
            expect(mathEnforcer.addFive(8)).to.equal(13, 'The result is incorrect!');
        });

        it('should return correct result with a negative number parameter', function() {
            expect(mathEnforcer.addFive(-8)).to.equal(-3, 'The result is incorrect!');
        });

        it('should return correct result with a floating point number parameter', function() {
            expect(mathEnforcer.addFive(1.35)).to.be.closeTo(6.35, 0.01, 'The result is incorrect!');
        });
    });

    describe('Functionality subtractTen', function() {
        it('should return undefined with a non-number parameter', function() {
            expect(mathEnforcer.subtractTen('4')).to.equal(undefined, 'The result is incorrect!');
        });

        it('should return undefined with a missing parameter', function() {
            expect(mathEnforcer.subtractTen()).to.equal(undefined, 'The result is incorrect!');
        });

        it('should return correct result with a positive number parameter', function() {
            expect(mathEnforcer.subtractTen(8)).to.equal(-2, 'The result is incorrect!');
        });

        it('should return correct result with a negative number parameter', function() {
            expect(mathEnforcer.subtractTen(-8)).to.equal(-18, 'The result is incorrect!');
        });

        it('should return correct result with a floating point number parameter', function() {
            expect(mathEnforcer.subtractTen(1.35)).to.be.closeTo(-8.65, 0.01, 'The result is incorrect!');
        });
    });

    describe('Functionality sum', function() {
        it('should return undefined with a non-number parameter', function() {
            expect(mathEnforcer.sum('4', 4)).to.equal(undefined, 'The result is incorrect!');
        });

        it('should return undefined with a non-number parameter', function() {
            expect(mathEnforcer.sum(4, '4')).to.equal(undefined, 'The result is incorrect!');
        });

        it('should return undefined with a missing parameter', function() {
            expect(mathEnforcer.sum()).to.equal(undefined, 'The result is incorrect!');
        });

        it('should return correct result with a positive number parameter', function() {
            expect(mathEnforcer.sum(8, 7)).to.equal(15, 'The result is incorrect!');
        });

        it('should return correct result with a negative number parameter', function() {
            expect(mathEnforcer.sum(-8, -2)).to.equal(-10, 'The result is incorrect!');
        });

        it('should return correct result with a floating point number parameter', function() {
            expect(mathEnforcer.sum(1.35, 2.20)).to.be.closeTo(3.55, 0.01, 'The result is incorrect!');
        });
    });
});