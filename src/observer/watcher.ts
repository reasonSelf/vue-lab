import Dep, { DepTarget, pushTarget, popTarget } from './dep'

let uid = 1;

export default class Watcher implements DepTarget {
  id: number
  deps: Array<Dep>
  depIDs: Set<number>
  callback: Function
  getter: Function

  constructor(
    vm: any,
    expOrFunc: String | Function,
    callback: Function
  ) {
    this.id = uid++;
    this.deps = [];
    this.depIDs = new Set();
    this.callback = callback

    if (typeof expOrFunc === 'function') {
      this.getter = expOrFunc
    } else {
      this.getter = () => {};
    }
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
    
  }
}