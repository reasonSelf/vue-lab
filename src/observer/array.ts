const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const proxyMethods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

proxyMethods.forEach(name => {
  const originMehtod = arrayMethods[name];

  arrayMethods[name] = function m(...args: any[]) {
    originMehtod.apply(this, args);
    let inserted
    switch (name) {
      case 'push':
      case 'unshift':
        inserted = args;
      case 'splice':
        inserted = args.slice(2); 
    }
  }
})