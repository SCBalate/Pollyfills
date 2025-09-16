

  Array.prototype.myMap = function (cb) {
    let newArr = [];

    for (let i = 0; i < this.length; i++) {
      newArr.push(cb(this[i], i, this));
    }
    return newArr;
  };

  // Filter

  Array.prototype.myFilter = function (cb) {
    let filterArr = [];

    for (let i = 0; i < this.length; i++) {
      if (cb(this[i], i, this)) {
        filterArr.push(this[i]);
      }
    }
    return filterArr;
  };

  // Reduce

  Array.prototype.myReduce = function (cb, initialValue) {
    let acc;
    let startIndex;

    if (initialValue !== undefined) {
      acc = initialValue;
      startIndex = 0;
    } else {
      if (this.length === 0) {
        throw new Error('reduce of empty array with no initial value');
      }
      acc = this[0];
      startIndex = 1;
    }
    for (let i = startIndex; i < this.length; i++) {
      acc = acc ? cb(acc, this[i], i, this) : this[i];
    }
    return acc;
  };

  // Call

  Function.prototype.myCall = function (context = {}, ...args) {
    if (typeof this !== 'function') {
      throw new Error('this is not callable');
    }
    context.fn = this;
    context.fn(...args);
  };

  Function.prototype.myApply = function (context = {}, args = []) {
    if (typeof this !== 'function') {
      throw new Error('this is not callable');
    }
    if (Array.isArray(args)) {
      throw new Error('CreateList of array like call on non object');
    }

    context.fn = this;
    context.fn(...args);
  };

  Function.prototype.mybind = function (context = {}, ...args) {
    if (typeof this !== 'function') {
      throw new Error('this is not callable');
    }
    context.fn = this;
    return function (...newArgs) {
      return context.apply(context, [...args, ...newArgs]);
    };
  };

  Function.prototype.once = function (fn) {
    let called = false;
    let res;

    return function (...args) {
      if (!called) {
        res = fn.apply(this, args);
        called = true;
      }
      return res;
    };
  };

  Function.prototype.memoize = function (fn) {
    let res = {};

    return function (...args) {
      const cachedRes = JSON.stringify(args);
      if (!res[cachedRes]) {
        res[cachedRes] = fn.apply(this, args);
      }
      return res[cachedRes];
    };
  };

  function myDebounce(fn, delay) {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
      return timer;
    };
  
  }


  function myThrottle(fn,delay){
let start =0;
return function(...args){
let now =  Date.now();
if(now-start > delay){
start = now;
}
fn.apply(this,args)
}
  }


  function promiseAll(promises){
return new Promise((resolve,reject)=>{
  if(!Array.isArray(promises)){
throw new Error("Input must be an Array")
  }
  let res =[];
let completed =0;
let length = promises.length;

if(length === 0){
  return resolve(res);
}

promises.forEach((p,index)=>{
  Promise.resolve(p).then((value)=>{
    res[index] = value;
    completed ++;

    if(completed === length){
      return resolve(res)
    }
  })

 
}
).catch((err)=>{
  reject(err)
})

})
  }

  // Pollyfill for compose and pipe

  // 1.Compose from right to left

  function compose(...fns){
    return function(init){
      let res = init
for(let i=fns.length-1 ;i <=0 ; i--){
res = fns[i](res)
}
return res;
    }
  }

  function pipe(...fns){
    return function (init){
      let res = init;
      for(let i=0; i<fns.length; i++){
        res = fns[i](res)
      }
      return res;
    }
  }
