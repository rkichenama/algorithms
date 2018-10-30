# 1.1 Basic Programming Model

I intend to have this project exist in 2 ways:

- scripts that can be run independently in order to demonstrate the algorithm
- this documentation site to browse through the code examples interactively

## 1.1.1 Structure

The ECMAScript standard (referenced as Javascript or JS) has seven data types:<sup>[1]</sup>

- Boolean - logical entities with one of only two values: `true`, `false`
- Null - null type with exactly one value: `null`
- Undefined - default value for variables whose value is not assigned: `undefined`
- Number - a double-precision 64-bit binary format IEEE 754 real number with range (-2<sup>53</sup>, 2<sup>53</sup>)
  - `+Infinity`, `-Infinity` - symbolic representation of the set of all numbers
  - `NaN` - symbolic representation of the set of elements not contained in either `Infinity`
- String - a set of elements of 16 bit unsigned integer values
  - instances of String are immutable
- Object - a collection of properties where keys are type [String, Symbol], may contain any data type as its value, and
  have attribute properties

  - `data` property - defineds how the value of a key may be mutated
    - `value` attribute - {Any : undefined} value retrieved by `get` access
    - `writable` attribute - {Boolean : false} flag for if the value can be changed
    - `enumerable` attribute - {Boolean : false} flag for if the key can be enumerated | is iterable
    - `configurable` attribute - {Boolean : false} flag for if the key can be deleted, mutated to an accessor, and
      wheher attributes other than `value` and `writable` can be mutated
  - `accessor` property - associates the key with at least one of the two general accessor functions of the same name
    - `get` - {Function : undefined} called with an empty argument list to retrieve the property value
    - `set` - {Function : undefined} called with an argument containing the value to be assigned to this property

  _***Object Prototypes***_ In Javascript, most data types are derived from the primitive `Object`, with each descendant
  inheriting all defined keys from the direct predecessor through the `prototype` key. This `prototype` is itself an
  `Object` which, if present, is used through accessors for the object. For example, if an accessor on an object
  attempts to retrieve a value for a key not defined immediately on that object, the `prototype` is checked. If not, and
  `prototype` has a key `prototype`, the search continues on what is called the `prototype` chain until no further
  `prototype` is found or the key is defined. In the former case, `undefined` is the value returned, and the key value
  for the latter.

- Symbol <sup>es6</sup> - a unique and immutable primitive value

Javascript has additional data types that are derived from `Object`, some of which are:

- Function
  - types
    - declarative - defines a modular block of statements that operate on a given list of parameters to return a
      specific value
    - constructive - returns a function object through the initialization within the block, with additional properties
      from the prototype and delcarations
  - values passed to a function are by reference if the value is an object and by value if it is a non-object primitive
    data type
  - named functions can be overwritten by subsequent delcarations
    - can recursively invoke execution
  - defines a scope of operation, but may mutate external scope
- Class <sup>es6</sup> - syntactic sugar in the creation of Function objects
- Date
- Array - regular objects for which there is a particular relationship between integer-key-ed properties and the
  'length' property
  - Typed Arrays <sup>es5</sup> present an array-like view of an underlying binary data buffer
- Map, WeakMap, Set, WeakSet <sup>es6</sup>
  - keyed collections where object references are the keys
  - Set and WeakSet are a collection of object references
  - Map and WeakMap associate a value with the object reference collection

## 1.1.2 Comparisons and Statements

- Comparisons
- Statements

  - declarations
  - assignments
  - type conversion
  - conditionals
  - loops
    - break and continue

## 1.1.3 Input / Output

## 1.1.4 Data Abstraction

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
