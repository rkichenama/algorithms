export const curry = (fn, prevArgs = [], arity = fn.length) => {
  return (function resolver (...args) {
    prevArgs = prevArgs.concat(args);
    if (prevArgs.length >= arity) { return fn(...prevArgs.slice(0, arity)); }
    else { return resolver; }
  });
};
