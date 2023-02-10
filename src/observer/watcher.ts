import Dep, { DepTarget, pushTarget, popTarget } from './dep'

let uid = 1;

export default class Watcher implements DepTarget {
  context: any
  id: number
  deps: Array<Dep>
  depIDs: Set<number>
  callback: Function
  getter: Function
  value: any

  constructor(
    context: any,
    expOrFunc: string | Function,
    callback: Function
  ) {
    this.context = context
    this.id = uid++;
    this.deps = [];
    this.depIDs = new Set();
    this.callback = callback

    if (typeof expOrFunc === 'function') {
      this.getter = expOrFunc
    } else {
      this.getter = parsePath(expOrFunc)
    }

    this.value = this.get();
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }

  addDep(dep: Dep): void {
    if (!this.depIDs.has(dep.id)) {
      this.deps.push(dep);
      this.depIDs.add(dep.id);
      dep.addSub(this);
    }
  }

  update(): void {
    const oldVal = this.value;
    this.value = this.get();

    // async (todo);
    if (typeof this.callback === 'function') {
      this.callback.call(this.context, this.value, oldVal);
    }
  }

  teardown() {
    this.deps.forEach(dep => {
      dep.removeSub(this.id);
    })
    this.depIDs = new Set();
  }
}

const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
function parsePath(path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj: any) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}