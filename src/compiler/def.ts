import vaildTagIsNative from "../util/tagVaild"

export default class AST {
  tag: string
  attr: Array<[string, string]>
  parent: AST
  children: Array<AST>
  isComponent: boolean
  textContent: string

  constructor(
    tag: string,
    attr: Array<[string, string]> = [],
    children: Array<AST> = [],
    isComponent: boolean = false,
    textContent = ''
  ) {
    this.tag = tag;
    this.attr = attr;
    this.children = children;
    this.isComponent = isComponent;
    this.textContent = '';
  }

  static generateASTByTag(tag: string): AST {
    const tempTag = tag.toLocaleLowerCase();
    if (vaildTagIsNative(tempTag)) {
      return new AST(tempTag, [], [], false);
    } else {
      return new AST(tempTag, [], [], true);
    }
  }

  static generateText(data: string): AST {
    return new AST('', [], [], false, data);
  }

  addAttr(attr: [string, string]) {
    this.attr.push(attr);
  }

  addChild(child: AST) {
    child.parent = this;
    this.children.push(child);
  }
}