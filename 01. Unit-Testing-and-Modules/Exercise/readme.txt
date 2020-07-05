Requirements:
1. npm
2. if fails to run, please install:
npm install mocha
npm install chai

This should be run with below command in CMD:
npm test tests

npm test tests

> mocha-tests@1.0.0 test C:\***
> mocha "tests"



  check return undefined
    √ Return undefined, when first parameter is not a string
    √ Return undefined, when second parameter is not a number

  check for correct index
    √ Return Incorrect index, when index < 0
    √ Return undefined, when index is bigger than string length

  check for correct behaviuor
    √ Return char at index

  check return undefined
    √ Return undefined, when parameter is not a string
    √ Return undefined, when parameter is empty

  check return even
    √ Return even, when parameter is string with even length

  check return odd
    √ Return odd, when parameter is string with odd length

  check mathEnforcer object
    √ Return correct object with nested functions

  check mathEnforcer addFive function
    √ Return correct result with number as input
    √ Return undefined result with non-number as input

  check mathEnforcer subtractTen function
    √ Return correct result with number as input
    √ Return undefined result with non-number as input

  check mathEnforcer sum function
    √ Return correct result with number as input
    √ Return undefined result with non-number as input

  check PaymentPackage constructor
    √ Return correct object instance of PaymentPackage
    √ Return error when name is empty string or non-string type
    √ Return error when value is not or negative number

  check PaymentPackage getter and setter methods
    √ Set correct VAT, returns it
    √ Set correct active, returns it
    √ Return error when new VAT value is not or negative number
    √ Return error when new active status is not boolean

  check toString function
    √ return a string, containing an overview of the active instance
    √ return a string, containing an overview of the inactive instance

  Check constructor:
    √ Return correct object instance of Console.

  Check writeLine method:
    String input type:
      √ Return same input string when passed.
    Object input type:
      √ Return json string repr of passed object.
    Multiple input arguments:
      √ Return TypeError error if first argument not a string.
      √ Return RangeError error when number of parameters not equal placeholders.
      √ Return RangeError error if incorrect index number given.
      √ Return new string with supplied parameters

  check string builder object constructor
    √ Return correct object instance of StringBuilder
    √ can be instantiated without arguments
    √ can be instantiated with string argument

  check string builder object returns string
    √ Return string with toString method

  check string builder class methods for correct input
    √ Return typeError in case first argument is not a string

  check string builder class methods for correct behaviour
    √ add string to the end
    √ add string to the beginning
    √ add string to the staring index of the string builder
    √ remove number of chars of the string builder`s string

  check Warehouse constructor
    √ Return correct object instance of Warehouse
    √ throw error if the constructor gets a negative number or 0

  check Warehouse methods
    addProduct method
      √ Add a product successfully if there is space
      √ Throw message when there is no space
      √ adds quantity if product is added more than one time
    orderProducts method
      √ Returns all products of a Food type in descending order by the quantity.
    occupiedCapacity method
      √ Returns a number, which represents the already occupied place in the warehouse.
    revision method
      √ Returns a string in which we print all products of each type if there are products.
      √ Returns empty if there are no products.
    scrapeAProduct method
      √ reduce quantity of product if exists
      √ reset quantity of product if exists
      √ return "{product} do not exists" if product don`t exists


  53 passing (64ms)