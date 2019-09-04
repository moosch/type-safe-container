# Type Safe Container

A nice little FP container that guarantees type safety.

You simply create the container passing in the datatypes you want to allow and then you can perform operations on it.

## Usage

```javascript
const Type = require('./Type');

// Define the allowed types and an incorrect-type handler
const StringNumArr = Type(
  [String, Number, Array],
  (_) => {
    throw new TypeError('Input type is not a valid data type');
  },
);

// StringNumArr will only accept the defined types (String | Number | Array)
const typeSafeBox = StringNumArr('olleH');

typeSafeBox
  .map((a) => a.split('')) // => Type(o,l,l,e,H)
  .map((a) => a.reverse()) // => Type(H,e,l,l,o)
  .map((a) => a.concat(' world')) // => Type(H,e,l,l,o, world)
  .map((a) => a.join('')) // => Type(Hello world)
  .chain((a) => a.toUpperCase()); // => 'HELLO WORLD'
```

Notice that if we perform the same map functions but do not allow the `Array` datatype we get an error:

```javascript
const StringNumArr = Type(
  [String, Number],
  (_) => {
    throw new TypeError('Input type is not a valid data type');
  },
);

const typeSafeBox = StringNumArr('olleH');

typeSafeBox
  .map((a) => a.split(''))
  .map((a) => a.reverse())
  .map((a) => a.concat(' world'))
  .map((a) => a.join(''))
  .chain((a) => a.toUpperCase());

// => TypeError: Input type is not a valid data type
```

### Operations

`map` - takes a function, runs it over the container data, then returns the container with the new data inside.

`chain` - the same as `map` but returns the raw data
`join` - returns the container data
`inspect` - displays the container value when passed to `console.log`


### License

MIT Licensed. Use all you like at your own risky fun. Go nuts.

Happy coding λ
