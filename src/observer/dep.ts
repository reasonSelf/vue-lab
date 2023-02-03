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

  addSub(sub: DepTarget) {
    this.subs.push(sub);
  }

  removeSub(subID: number) {
    let targetIndex = 0;
    for (; targetIndex < this.subs.length; ++targetIndex) {
      const currentSub = this.subs[targetIndex];
      if (currentSub.id === subID) break;
    }
    if (targetIndex < this.subs.length) {
      this.subs.splice(targetIndex, 1);
    }
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