function isOddOrEven(string) {
    if (typeof (string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return 'even';
    }
    return 'odd';
}

module.exports = {
    isOddOrEven
};
// let expect = require('chai').expect;

// describe("function isOddOrEven", function () {
//     describe("isOddOrEven function with a non string parameter", function () {
//         it('should return undefined with number parameter', function () {
//             expect(isOddOrEven(100)).to.equal(undefined);
//         });
//         it('should return undefined with object parameter', function () {
//             expect(isOddOrEven({age: 23, name: 'Iavor'})).to.equal(undefined);
//         });
//         it('should return undefined with array parameter', function () {
//             expect(isOddOrEven(['aaa', 'bbbb', 'c'])).to.equal(undefined);
//         });
//     });

//     describe("isOddOrEven function with a string parameter", function () {
//         it('should return odd with an odd length string', function () {
//             expect(isOddOrEven('abc')).to.equal('odd');
//         });
//         it('should return even with an even length string', function () {
//             expect(isOddOrEven('abcd')).to.equal('even');
//         });
//         it('should return even with an empty string', function () {
//             expect(isOddOrEven('')).to.equal('even');
//         });
//     });
// });