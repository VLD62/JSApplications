const expect = require('chai').expect;
const PaymentPackage = require('./Payment_Package.js');

describe('PaymentPackage', function() {
    const validName = 'My valid name';
    const validValue = 135;

    describe('PaymentPackage instantiation and structure', function() {
        it('should work with valid parameters', function() {
            expect(() => new PaymentPackage(validName, validValue)).to.not.throw();
        });

        it('should be correctly set up', function() {
            const instance = new PaymentPackage(validName, validValue);
            expect(instance.name).to.equal(validName);
            expect(instance.value).to.equal(validValue);
            expect(instance.VAT).to.equal(20);
            expect(instance.active).to.equal(true);
        });

        it('should not work with invalid name', function() {
            expect(() => new PaymentPackage('', validValue)).to.throw();
            expect(() => new PaymentPackage(undefined, validValue)).to.throw();
            expect(() => new PaymentPackage({}, validValue)).to.throw();
            expect(() => new PaymentPackage(null, validValue)).to.throw();
            expect(() => new PaymentPackage(55, validValue)).to.throw();
            expect(() => new PaymentPackage(true, validValue)).to.throw();
        });

        it('should not work with invalid value', function() {
            expect(() => new PaymentPackage(validName, '')).to.throw();
            expect(() => new PaymentPackage(validName, -5)).to.throw();
            expect(() => new PaymentPackage(validName, '55')).to.throw();
            expect(() => new PaymentPackage(validName, [])).to.throw();
            expect(() => new PaymentPackage(validName, undefined)).to.throw();
            expect(() => new PaymentPackage(validName, null)).to.throw();
            expect(() => new PaymentPackage(validName)).to.throw();
        });

        it('should have all properties', function() {
            const instance = new PaymentPackage(validName, validValue);
            expect(instance).to.have.property('name');
            expect(instance).to.have.property('value');
            expect(instance).to.have.property('VAT');
            expect(instance).to.have.property('active');
        }); 
    });

    describe('Accessors', function() {
        let instance = null;
        beforeEach(() => {
           instance = new PaymentPackage(validName, validValue);
        });

        it('should accept and set valid name', function() {
            instance.name = 'Package';
            expect(instance.name).to.equal('Package');
        });

        it('should reject invalid name', function() {
            expect(() => instance.name = '').to.throw();
            expect(() => instance.name.trim() = '').to.throw();
            // expect(() => instance.name = '  ').to.throw();
            expect(() => instance.name = undefined).to.throw();
            expect(() => instance.name = null).to.throw();
            expect(() => instance.name = {}).to.throw();
            expect(() => instance.name = 40).to.throw();
        });

        it('should accept and set valid value', function() {
            instance.value = 1700;
            expect(instance.value).to.equal(1700);
            instance.value = 0;
            expect(instance.value).to.equal(0);
        });

        it('should reject invalid value', function() {
            expect(() => instance.value = '').to.throw();
            expect(() => instance.value = undefined).to.throw();
            expect(() => instance.value = -45).to.throw();
            expect(() => instance.value = []).to.throw();
            expect(() => instance.value = null).to.throw();
        });

        it('should accept and set valid VAT', function() {
            instance.VAT = 18;
            expect(instance.VAT).to.equal(18);
            instance.VAT = 0;
            expect(instance.VAT).to.equal(0);
        });

        it('should reject invalid VAT', function() {
            expect(() => instance.VAT = '').to.throw();
            expect(() => instance.VAT = undefined).to.throw();
            expect(() => instance.VAT = null).to.throw();
            expect(() => instance.VAT = -25).to.throw();
        });

        it('should accept and set valid active', function() {
            instance.active = true;
            expect(instance.active).to.be.true;

            instance.active = false;
            expect(instance.active).to.be.false;
        });

        it('should reject invalid active', function() {
            expect(() => instance.active = '').to.throw();
            expect(() => instance.active = undefined).to.throw();
            expect(() => instance.active = -30).to.throw();
            expect(() => instance.active = {}).to.throw();
            expect(() => instance.active = []).to.throw();
            expect(() => instance.active = null).to.throw();
        });
    });

    describe('String info', function() {
        let instance = null;
        beforeEach(() => {
            instance = new PaymentPackage(validName, validValue);
        });

        it('should contain the name', function() {
            expect(instance.toString()).to.contain(validName);
        });

        it('should contain the value', function() {
            expect(instance.toString()).to.contain(validValue.toString());
        });

        it('should contain the VAT', function() {
            expect(instance.toString()).to.contain(instance.VAT + '%');
        });

        it('should display inactive label', function() {
            instance.active = false;

            expect(instance.toString()).to.contain('(inactive)');
        });

        it('should update info through setters', function() {
            instance.name = 'Another Package';
            instance.value = 160;
            instance.VAT = 10;
            instance.active = false;

            const output = instance.toString();

            expect(output).to.contain('Another Package');
            expect(output).to.contain('160');
            expect(output).to.contain('10%');
            expect(output).to.contain('(inactive)');

            expect(output).to.equal(`Package: Another Package (inactive)\n- Value (excl. VAT): 160\n- Value (VAT 10%): 176`);
        });
    });
});