import vaildTagIsNative from "../util/tagVaild"

const typeDef = ['', 'element', 'text', 'comment'];
const emptyName = 'template';

export default class AST {
  type: number
  tagName: string
  attr: Array<[string, string]>
  parent: AST
  children: Array<AST>
  textContent: string

  constructor(
    type: number,
    tagName: string,
    attr: Array<[string, string]> = [],
    children: Array<AST> = [],
    textContent = ''
  ) {
    this.type = type;
    this.tagName = tagName;
    this.attr = attr;
    this.children = children;
    this.textContent = textContent;
  }

  static createEmptyAST(): AST {
    return new AST(1, emptyName);
  }

  static generateASTByTag(tagName: string): AST {
    return new AST(1, tagName);
  }

  static generateText(data: string): AST {
    return new AST(2, '', [], [], data);
  }

  addAttr(attr: [string, string]) {
    this.attr.push(attr);
  }

  addChild(child: AST) {
    child.parent = this;
    this.children.push(child);
  }
}