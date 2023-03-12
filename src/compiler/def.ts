import vaildTagIsNative from "../util/tagVaild"

const typeDef = ['', 'element', 'text', 'comment'];
const emptyName = 'template';

export default class AST {
  type: number
  tagName: string
  isNative: boolean
  isStatic: boolean
  // attr: Array<[string, string]>
  attr: [string, string][]
  parent: AST
  children: Array<AST>
  textContent: string
  events: [string, string][]
  bindings: [string, string][]
  instIf: any
  instFor: any
  instShow: any

  constructor(
    type: number,
    tagName: string,
    isNative: boolean,
    textContent = '',
    isStatic: boolean = true
  ) {
    this.type = type;
    this.isNative = isNative;
    this.isStatic = isStatic;
    this.tagName = tagName;
    this.attr = [];
    this.children = [];
    this.textContent = textContent;

    this.instIf = null;
    this.instFor = null;
    this.instShow = null;
    this.events = [];
    this.bindings = [];
  }

  static createEmptyAST(): AST {
    return new AST(1, emptyName, false);
  }

  static generateASTByTag(tagName: string, isStatic: boolean = true): AST {
    const flg = vaildTagIsNative(tagName);
    if (flg) {
      return new AST(1, tagName, false, '', isStatic);
    } else {
      return new AST(1, tagName, true, '', isStatic);
    }
  }

  static generateText(data: string, isStatic: boolean = true): AST {
    return new AST(2, '', false, data, isStatic);
  }
  
  setInstruction(key: string, expOrFunc: any): boolean {
    switch(key) {
      case 'v-bind':
        break;
      case 'v-on':
        break;
      case 'v-if':
        return this.setInstValue('instIf', expOrFunc);
      case 'v-for':
        return this.setInstValue('instFor', expOrFunc);
      case 'v-show':
        return this.setInstValue('instShow', expOrFunc);
    }
    return true;
  }
  setInstValue(
    key: 'instIf' | 'instFor' | 'instShow',
    expOrFunc: any
  ): boolean {
    if (this[key] !== null) return false;
    this[key] = expOrFunc;
    return true;
  }

  addEvent(event: string, func: string) {
    this.events.push([event, func]);
  }

  addBinding(binding: string, expOrFunc: string) {
    this.bindings.push([binding, expOrFunc]);
  }

  addAttr(attr: [string, string]) {
    this.attr.push(attr);
  }

  addChild(child: AST) {
    child.parent = this;
    this.children.push(child);
  }
}