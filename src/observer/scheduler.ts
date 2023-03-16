import Watcher from "./watcher";

let taskQueue: Watcher[] = [];
let taskSet: Set<number> = new Set();
let taskadded = false;

function fn() {
  const queue = taskQueue;
  taskQueue = [];
  taskSet = new Set();
  taskadded = false;
  queue.forEach(watcher => {
    watcher.run();
  })
}

export default function addUpdateTask(watcher: Watcher) {
  if (taskSet.has(watcher.id)) return;
  taskQueue.push(watcher);
  taskSet.add(watcher.id);
  if (!taskadded) {
    queueMicrotask(fn);
    taskadded = true;
  }
}