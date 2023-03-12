import AST from "../compiler/def"

const typeDef = ['', 'element', 'text', 'comment'];

export default class VNode {
  tag: string
  textContent: string
  type: number
  children: VNode[]
  attr: [string, string][]
  style: {
    display: string
  }
  
  constructor(tag: string, textContent: string, type: number) {
    this.tag = tag;
    this.textContent = textContent;
    this.type = type;
    this.children = [];
    this.attr = [];
    this.style = {display: ''}
  }

  addChild(child: VNode) {
    this.children.push(child);
  }
}

export function createVnode(ast: AST): VNode {
  const node = new VNode(ast.tagName, ast.textContent, ast.type);
  return node;
}