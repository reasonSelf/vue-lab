import Dep from './dep'

class Observer {
  dep: Dep

  constructor(placeholder: any) {
    if (Array.isArray(placeholder)) {

    } else if (typeof placeholder === 'object') {
      
      Object.keys(placeholder).forEach(key => {
        if (typeof placeholder[key] === 'object') {
          observe(placeholder[key]);
        } else {
          const value = placeholder[key];
          defineReactive(placeholder, key, value);
        }
        
      })        
    }
  }
}

function defineReactive(obj: Object, key: PropertyKey, val: any): Dep {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      dep.depend();      
      return val;
    },

    set(newVal: any) {
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  })

  return dep;
}

export default function observe(placeholder: any): Observer {
  const ob = new Observer(placeholder);
  return ob;
}