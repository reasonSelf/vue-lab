import vaildTagIsNative from "../util/tagVaild"

const typeDef = ['', 'element', 'text', 'comment'];
const emptyName = 'template';

export default class AST {
  type: number
  tagName: string
  isNative: boolean
  // attr: Array<[string, string]>
  attr: [string, string][]
  parent: AST
  children: Array<AST>
  textContent: string
  events: [string, string][]

  constructor(
    type: number,
    tagName: string,
    isNative: boolean,
    textContent = ''
  ) {
    this.type = type;
    this.isNative = isNative;
    this.tagName = tagName;
    this.attr = [];
    this.children = [];
    this.events = [];
    this.textContent = textContent;
  }

  static createEmptyAST(): AST {
    return new AST(1, emptyName, false);
  }

  static generateASTByTag(tagName: string): AST {
    const flg = vaildTagIsNative(tagName);
    if (flg) {
      return new AST(1, tagName, false);
    } else {
      return new AST(1, tagName, true);
    }
  }

  static generateText(data: string): AST {
    return new AST(2, '', false, data);
  }

  addAttr(attr: [string, string]) {
    this.attr.push(attr);
  }

  addChild(child: AST) {
    child.parent = this;
    this.children.push(child);
  }
}