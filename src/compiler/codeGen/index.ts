import VNode, { createElemVNode, createTextVNode } from "../../types/vnode";
import AST, { ELEMENT_TYPE, TEXT_TYPE } from "../def";

export default function codeGen(ast: AST, forRendered: boolean = false) {
  let item: string = null, target: string = null;
  if (!forRendered && ast.instFor) {
    const splitArr: string[] = ast.instFor.split(' ');
    if (splitArr.length !== 3) throw new SyntaxError();
    item = splitArr[0];
    target = splitArr[2];
  }
  
  return function render(forScope = {}): VNode[] {
    if (ast.instIf) {
      try {
        const res = eval(`with(this){${ast.instIf}}`);
        if (typeof res !== 'boolean') throw new SyntaxError();
        if (!res) return [];
      } catch(e) {
        console.error(e);
        return [];
      }
    }
    
    const nodeList: VNode[] = [];
    if (!forRendered && ast.instFor) {
      const code = `
        for (${item} of ${target}) {
          const scope = {${item}};
          const childrenList = codeGen(ast, true).call(this, scope);
        }
      `
      eval(`with(this) {${code}}`);
    } else {
      let node: VNode = null;
      if (ast.type === ELEMENT_TYPE) {
        node = createElemVNode(ast.tagName);
      } else if (ast.type === TEXT_TYPE) {
        let text = ast.textContent;
        console.log(this.testName);
        if (!ast.isStatic) {
          text = eval(`
            with(this) {
              with(forScope) {
                eval(ast.textContent);
              }
            }
          `)
        }
        node = createTextVNode(text);
      }
      
      ast.children.forEach(child => {
        const childrenList: VNode[] = codeGen(child, forRendered).call(this, forScope);
        childrenList.forEach(childNode => {
          node.addChild(childNode);
        })
      });
      
      if (ast.instShow) {
        const res = eval(`with(this)(${ast.instShow})`);
        if (typeof res !== 'boolean') throw new SyntaxError();
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