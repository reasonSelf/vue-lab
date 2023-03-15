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
  currVNode: VNode[]

  constructor(cst: YueConstruct = {}) {
    this.currVNode = null;
    this.render = createReneder(cst.template)
    const data = cst.data();
    const ob = observe(data);
    proxyData(this, data, ob.proxy);
    
    this.__renderWatcher__ = new Watcher(this, () => {
      this.currVNode = this.render();
      console.log(this.currVNode)
    });
  }
}

function createReneder(template: string) {
  return codeGen(compile(template));
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
