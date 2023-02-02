import Watcher from "./watcher";

let uid = 1;

export interface DepTarget {
  id: number,
  addDep(dep: Dep): void,
  update(): void
}

export default class Dep {
  id: number
  static target: DepTarget | null
  subs: Array<DepTarget>

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  depend(): void {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify(): void {
    this.subs.forEach(sub => {
      sub.update();
    })
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }
}

Dep.target = null;
const targetStack: Array<DepTarget | null | undefined> = [];

export function pushTarget(target: DepTarget | null) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}