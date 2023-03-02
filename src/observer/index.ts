import Dep from './dep'
import arrayProxy from './array';

class Observer {
  proxy: any
  
  constructor(placeholder: any) {
    if (typeof placeholder !== 'object') throw new Error();
    if (Array.isArray(placeholder)) {
      this.proxy = arrayProxy(placeholder);
    } else {
      Object.keys(placeholder).forEach(key => {
        const curr = placeholder[key];
        if (typeof curr === 'object') observe(curr);
      })
      this.proxy = defineProxy(placeholder);
    }
  }
}

function defineProxy(placeholder: Object) {
  const dep = new Dep();
  const proxy = new Proxy(placeholder, {
    get(target, p, receiver) {
      dep.depend();
      return Reflect.get(target, p, receiver);
    },
    set(target, p, newVal, receiver) {
      dep.notify();
      return Reflect.set(target, p, newVal, receiver);
    }
  });

  return proxy;
}

function proxy(target: any, source: any) {
  if (typeof target !== 'object' || typeof source !== 'object') throw new Error();

  Object.keys(source).forEach(key => {
    Object.defineProperty(target, key, {
      get() {
        return source[key];
      },
      set(newVal) {
        source[key] = newVal;
      }
    })
  })
}

export default function observe(placeholder: any): Observer {
  const ob = new Observer(placeholder);
  return ob;
}