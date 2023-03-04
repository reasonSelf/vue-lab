import VNode from "../../types/vnode";
import AST from "../def";

export default function codeGen(ast: AST) {

  
  return function render(): VNode[] {
    if (ast.instIf) {
      try {
        const res = eval(`with(this){${ast.instIf}}`);
        if (!res) return [];
      } catch(e) {
        console.error(e);
        return [];
      }
    }
    
    const nodeList: VNode[] = [];
    if (ast.instFor) {
      
    } else {
      const node = new VNode(ast.tagName);

      ast.children.forEach(child => {
        const childrenList = codeGen.apply(this, child);
        childrenList.forEach((item: VNode) => node.addChild(item));
      });
      
      if (!ast.instShow) {
        const res = eval(`with(this)(${ast.instShow})`);
        if (!res) {
          node.style.display = 'none';
        } else {
          node.style.display = '';
        }
      }

      nodeList.push(node);
    }

    return nodeList;
  }
}