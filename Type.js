function typeError(result) {
  throw new TypeError(`Input type ${result} is not a valid data type`);
}

function Type(types, otherwise = typeError) {
  // Add types to scope
  this.types = types.map(
    (T) => {
      const typeName = T.name || T.prototype.constructor;
      if (!typeName) {
        throw new TypeError(`${T} is not a valid data type`);
      }
      return typeName;
    },
  );

  if (typeof otherwise !== 'function') {
    throw new Error('You need supply an "otherwise" handler function');
  }

  // Add to scope
  this.otherwise = otherwise;

  this.isValidType = (a) => {
    if ([null, undefined].includes(a)) {
      throw new TypeError(`Type safety doesn't play well with null or undefined values`);
    }
    const name = (a).name || ((a).constructor && (a).constructor.name);
    return this.types.includes(name);
  }

  // Box is simply a container that allows us to run functions over the contents
  this.Box = (a) => ({
    a,
    inspect: () => `Box(${a})`,
    map: (f) => {
      const result = f(a);
      return this.isValidType(result) ? this.Box(result) : this.otherwise(result);
    },
    chain: (f) => {
      const result = f(a);
      return this.isValidType(result) ? result : this.otherwise(result);
    },
    join: () => a,
  });

  return (a) => {
    if (this.isValidType(a)) {
      return this.Box(a);
    }
    return this.otherwise(a);
  }
}

module.exports = Type;
