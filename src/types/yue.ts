import VNode from "./vnode"
import compile from "../compiler"
import codeGen from "../compiler/codeGen"

class YueConstruct {
  template?: string
  data?: () => Object
  methods?: Object
}

export default class Yue {
  render: () => VNode[]

  constructor(cst: YueConstruct = {}) {
    this.render = createReneder(cst.template);
  }
}

function createReneder(template: string) {
  return codeGen(compile(template));
}

