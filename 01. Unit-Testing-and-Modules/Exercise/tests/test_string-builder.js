var StringBuilder = require('../string-builder.js');
var expect = require('chai').expect;

describe('check string builder object constructor', function() {
    it('Return correct object instance of StringBuilder', function () {
        let result = new StringBuilder();
        expect(result.constructor.name).to.equal('StringBuilder');
    });
    it('can be instantiated without arguments', function () {
        let result = new StringBuilder();
        expect(result._stringArray.length).to.equal(0);
    });
    it('can be instantiated with string argument', function () {
        let result = new StringBuilder('koza');
        expect(result._stringArray.length).to.equal(4);
    });
});

describe('check string builder object returns string', function() {
    it('Return string with toString method', function () {
        let result = new StringBuilder('koza');
        expect(result.toString()).to.equal('koza');
    });
});

describe('check string builder class methods for correct input', function() {
    it('Return typeError in case first argument is not a string', function () {
        let result = new StringBuilder();
        expect(function(){
            result.append(2);
        }).to.throw(TypeError, 'Argument must be string');
        expect(function(){
            result.prepend(2);
        }).to.throw(TypeError, 'Argument must be string');
        expect(function(){
            result.insertAt(0,2);
        }).to.throw(TypeError, 'Argument must be string');
    });
});

describe('check string builder class methods for correct behaviour', function() {
    it('add string to the end', function () {
        let result = new StringBuilder('koza');
        result.append('-boza');
        expect(result.toString()).to.equal('koza-boza');
    });
    it('add string to the beginning', function () {
        let result = new StringBuilder('koza');
        result.prepend('boza-');
        expect(result.toString()).to.equal('boza-koza');
    });
    it('add string to the staring index of the string builder', function () {
        let result = new StringBuilder('koza');
        result.insertAt('icat',3);
        expect(result.toString()).to.equal('kozicata');
    });
    it('remove number of chars of the string builder`s string', function () {
        let result = new StringBuilder('koza');
        result.remove(3,1);
        expect(result.toString()).to.equal('koz');
    });
});
