import { ELEMENT_TYPE, TEXT_TYPE } from "../compiler/def"

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

export function createElemVNode(tagName: string): VNode {
  const node = new VNode(tagName, '', ELEMENT_TYPE);
  return node;
}

export function createTextVNode(textContent: string): VNode {
  const node = new VNode('', textContent, TEXT_TYPE);
  return node;
}