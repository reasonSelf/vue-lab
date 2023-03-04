export default class VNode {
  tag: string
  children: VNode[]
  attr: [string, string][]
  style: {
    display: string
  }

  
  constructor(tag: string) {
    this.tag = tag;
    this.children = [];
    this.attr = [];
    this.style = {display: ''}
  }

  addChild(child: VNode) {
    this.children.push(child);
  }
}