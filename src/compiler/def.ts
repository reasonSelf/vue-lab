import vaildTagIsNative from "../util/tagVaild"

export default class AST {
  tag: string
  textContent: string
  attr: Array<[string, string]>
  children: Array<AST>
  isComponent: boolean

  constructor(
    tag: string,
    textContent: string = '',
    attr: Array<[string, string]> = [],
    children: Array<AST> = [],
    isComponent: boolean = false
  ) {
    this.tag = tag;
    this.textContent = textContent;
    this.attr = attr;
    this.children = children;
    this.isComponent = isComponent;
  }

  static generateASTByTag(tag: string): AST {
    const tempTag = tag.toLocaleLowerCase();
    if (vaildTagIsNative(tempTag)) {
      return new AST(tempTag, '', [], [], false);
    } else {
      return new AST(tempTag, '', [], [], true);
    }
  }
}