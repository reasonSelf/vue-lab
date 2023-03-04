import Dep from "./dep";

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
const proxyMethodsSet: Set<string | Symbol> = new Set(...proxyMethods);

export default function arrayProxy(array: any) {
  const dep = new Dep();
  const proxy = new Proxy(array, {
    get(target, p, receiver) {
      if (p !== 'length') {
        dep.depend();
      }
      return Reflect.get(target, p, receiver);
    },
    set(target, p, newVal, receiver) {
      if (proxyMethodsSet.has(p)) {
        dep.notify();
      }
      return Reflect.set(target, p, newVal, receiver);
    }
  });
  return proxy;
}