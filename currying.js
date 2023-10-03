/*
https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0

difference between partial application and curried function--
partial application may or may not have a predictable return type
curried function always returns another function with an arity of 1 utill
all of the arguments have been applied 

a partial application:
The process of applying a function to some of its arguments. 
The partially applied function gets returned for late ruse. 
Its a function that takes a function with multiple parameters and returns a function with fewer parameters 

curry: a function that takesa  function wtih multiple parameters as input
and returns a function with exactly one parameter 

The value of following this process is that it makes your return types uniform 
(this is what promises do. they standardize your return type) 

in the end this makes it easier to compose functions (function composition) 


**functors: "something that can be mapped over" ie arrays 
** arity: the amount of arguments a function takes 

*/

/* 
we want to convert this to curry:
const toSlug = input => encodeURIComponent(
  input.split(' ')
    .map(str => str.toLowerCase())
    .join('-')
);

*/
// this is not technically a curry, but rather a partial application
const curry = fn => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const join = curry((str, arr) => arr.join(str));

const toLowerCase = str => str.toLowerCase();

const split = curry((splitOn, str) => str.split(splitOn));

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const fn1 = s => s.toLowerCase();
const fn2 = s => s.split('').reverse().join('');
const fn3 = s => s + '!'

const newFunc = pipe(fn1, fn2, fn3);
const result = newFunc('Time'); // emit!

//because we are currying, its really simple to "tap" into the flow
const tap = curry((fn, x)=> {
	fn(x);
	return x;
});

const trace = label => {
  return tap(x => (`== ${ label }:  ${ x }`));
};

const toSlug = pipe(
	trace('input'),
  split(' '),
  map(toLowerCase),
	trace('after map'),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('JS Cheerleader')); // 'js-cheerleader'
 

/* 
Hardcore functional programmers define their entire application in terms of function compositions. I use it frequently to eliminate the need for temporary variables. Look at the `pipe()` version of `toSlug()` carefully and you might notice something special.

*/
