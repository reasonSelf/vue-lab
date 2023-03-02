import VNode from "../../types/vnode";
import AST from "../def";

export default function codeGen(ast: AST) {

  
  return function render(): VNode {
    if (ast.instIf) {
      try {
        const res = eval(`with(this){${ast.instIf}}`);
        if (!res) return null;
      } catch(e) {
        console.error(e);
        return null;
      }
    }

    if (ast.instFor) {

    }

    if (ast.instShow) {
      try {
        const res = eval(`with(this){${ast.instShow}}`);
        if (res) {

        } else {

        }
      } catch(e) {
        console.error(e);
      }
    }

    ast.children.forEach(child => {
      const childRen = codeGen.apply(this, child);
      
    })
    return 
  }
}