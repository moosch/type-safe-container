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

| method   | description                                                                                           | example                             | output    |
|:--------:|-------------------------------------------------------------------------------------------------------|-------------------------------------|:---------:|
| `map`    | takes a function and returns a new container with the result of passing the data through the function | `type(5).map((data) => data + 1)`   | `type(6)` |
|`chain`   | the same as `map` but returns the unwrapped data                                                      | `type(5).chain((data) => data + 1)` | 6         |
|`join`    | returns the unwrapped data                                                                            | `type(5).join()`                    | 5         |
|`inspect` | displays the container value when passed to `console.log`                                             | `console.log(type(5))`              | Type(5)   |


### License

MIT Licensed. Use all you like at your own risky fun. Go nuts.

Happy coding λ
