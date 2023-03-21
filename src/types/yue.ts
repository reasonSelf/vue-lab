import VNode from "./vnode"
import compile from "../compiler"
import codeGen from "../compiler/codeGen"
import observe from "../observer"
import Watcher from "../observer/watcher"

class YueConstruct {
  template?: string
  data?: () => Object
  methods?: Object
}

export default class Yue {
  render: () => VNode[]
  __renderWatcher__: Watcher
  _event: Object
  currVNode: VNode[]
  [key: string]: any

  $on: (event: string, handler: Function) => void
  $off: (event?: string) => void

  constructor(cst: YueConstruct = {}) {
    this.currVNode = null;
    this.render = createReneder(cst.template)
    proxyMethods(this, cst.methods);
    const data = cst.data();
    const ob = observe(data);
    proxyData(this, data, ob.proxy);
    
    this.__renderWatcher__ = new Watcher(this, () => {
      this.currVNode = this.render();
    });
  }
}

function createReneder(template: string) {
  return codeGen(compile(template));
}

function proxyMethods(context: Yue, methods: Object) {
  for (const [key, method] of Object.entries(methods)) {
    if (typeof method !== 'function') throw new SyntaxError(`methods must be function!`);
    context[key] = method.bind(context);
  }
}

function proxyData(context: Yue, source: Object, proxy: { [key in string]: any}) {
  Object.keys(source).forEach((key) => {
    Object.defineProperty(context, key, {
      get() {
        return proxy[key];
      },
      set(newVal) {
        return proxy[key] = newVal;
      }
    })
  })
}
