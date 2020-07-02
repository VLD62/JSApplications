var Warehouse = require('../Warehouse.js');
var expect = require('chai').expect;

describe('check Warehouse constructor', function () {
    it('Return correct object instance of Warehouse', function () {
        let result = new Warehouse(62);
        expect(result.constructor.name).to.equal('Warehouse');
    });
    it('throw error if the constructor gets a negative number or 0', function () {
        expect(function () {
            let result = new Warehouse(0);
        }).to.throw('Invalid given warehouse space');
        expect(function () {
            let result = new Warehouse(-5);
        }).to.throw('Invalid given warehouse space');
        expect(function () {
            let result = new Warehouse('koza');
        }).to.throw('Invalid given warehouse space');
    });
});

describe('check Warehouse methods', function () {
    describe('addProduct method', function () {
        it('Add a product successfully if there is space', function () {
            let result = new Warehouse(2);
            expect(JSON.stringify(result.addProduct('Food', 'koza', 1))).to.equal('{"koza":1}');
            expect(JSON.stringify(result.addProduct('Drink', 'boza', 1))).to.equal('{"boza":1}');
        });
        it('Throw message when there is no space', function () {
            let result = new Warehouse(2);
            result.addProduct('Food', 'koza', 1);
            result.addProduct('Drink', 'boza', 1);
            expect(function () {
                result.addProduct('Food', 'kon', 1);
            }).to.throw('There is not enough space or the warehouse is already full');
        });
        it('adds quantity if product is added more than one time', function () {
            let result = new Warehouse(2);
            result.addProduct('Food', 'koza', 1);
            expect(JSON.stringify(result.availableProducts['Food'])).to.equal('{"koza":1}');
            result.addProduct('Food', 'koza', 1);
            expect(JSON.stringify(result.availableProducts['Food'])).to.equal('{"koza":2}');
        });
    });
    describe('orderProducts method', function () {
        it('Returns all products of a Food type in descending order by the quantity.', function () {
            let result = new Warehouse(5);
            result.addProduct('Food', 'koza', 1);
            result.addProduct('Food', 'koza', 1);
            result.addProduct('Food', 'bob', 1);
            expect(JSON.stringify(result.orderProducts('Food'))).to.equal('{"koza":2,"bob":1}');
        });
    });
    describe('occupiedCapacity method', function () {
        it('Returns a number, which represents the already occupied place in the warehouse.', function () {
            let result = new Warehouse(5);
            result.addProduct('Food', 'koza', 1);
            result.addProduct('Food', 'koza', 1);
            result.addProduct('Food', 'bob', 1);
            result.addProduct('Drink', 'boza', 1);
            expect(result.occupiedCapacity()).to.equal(4);
        });
    });
    describe('revision method', function () {
        it('Returns a string in which we print all products of each type if there are products.', function () {
            let result = new Warehouse(8);
            result.addProduct('Food', 'koza', 2);
            result.addProduct('Food', 'koza', 2);
            result.addProduct('Food', 'bob', 2);
            result.addProduct('Drink', 'boza', 1);
            result.addProduct('Drink', 'boza', 1);
            let expected = 'Product type - [Food]\n- koza 4\n- bob 2\nProduct type - [Drink]\n- boza 2';
            expect(result.revision()).to.equal(expected);
        });
        it('Returns empty if there are no products.', function () {
            let result = new Warehouse(8);
            let expected = 'The warehouse is empty';
            expect(result.revision()).to.equal(expected);
        });
    });
    describe('scrapeAProduct method', function () {
        it('reduce quantity of product if exists', function () {
            let result = new Warehouse(8);
            result.addProduct('Food', 'koza', 2);
            result.addProduct('Drink', 'boza', 1);
            let expected = 'Product type - [Food]\n- koza 2\nProduct type - [Drink]\n- boza 1';
            expect(result.revision()).to.equal(expected);
            result.scrapeAProduct('koza', 1)
            expected = 'Product type - [Food]\n- koza 1\nProduct type - [Drink]\n- boza 1';
            expect(result.revision()).to.equal(expected);
        });
        it('reset quantity of product if exists', function () {
            let result = new Warehouse(8);
            result.addProduct('Food', 'koza', 2);
            result.addProduct('Drink', 'boza', 1);
            let expected = 'Product type - [Food]\n- koza 2\nProduct type - [Drink]\n- boza 1';
            expect(result.revision()).to.equal(expected);
            result.scrapeAProduct('koza', 2)
            expected = 'Product type - [Food]\n- koza 0\nProduct type - [Drink]\n- boza 1';
            expect(result.revision()).to.equal(expected);
        });
        it('return "{product} do not exists" if product don`t exists', function () {
            let result = new Warehouse(8);
            result.addProduct('Food', 'koza', 2);
            result.addProduct('Drink', 'boza', 1);
            expect(function () {
                result.scrapeAProduct('agne', 2)
            }).to.throw('agne do not exists');
        });
    });

});