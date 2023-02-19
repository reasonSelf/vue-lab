import AST from "./def";
import CompilerInterface from "./compiler";

const attrTypeHash = ['native', 'instruction', 'event', 'bind'];

export default class ElemCompiler implements CompilerInterface {
  stack: AST[];
  text: string;

  // elemState: (0: start, 1: end)
  state: number;
  // AST created
  created: boolean;
  attrStart: boolean;
  attrType: number;
  attrName: string;
  attrValue: string;

  constructor(stack: AST[]) {
    this.stack = stack;
    this.resetState();
  }

  resetState() {
    this.state = 0;
    this.text = '';
    this.created = false;
    this.resetAttrState();
  }
  resetAttrState() {
    this.attrStart = false;
    this.attrType = 0;
    this.attrName = '';
    this.attrValue = '';
  }

  getTopElem() {
    return this.stack[this.stack.length - 1];
  }

  // hooks
  whiteSpaceHook(): boolean {
    if (this.state === 1) {
      throw new SyntaxError();
    }
    if (!this.created) {
      const ast = AST.generateASTByTag(this.text);
      const parent = this.getTopElem();
      parent.addChild(ast);
      this.stack.push(ast);
      this.created = true;
      this.text = '';
    } else if (this.attrStart) {
      this.text += ' ';
    }
    return true;
  }

  lessThanHook(): boolean {
    this.state = 0;
    return true;
  }

  greaterThanHook(): boolean {
    if (this.state === 1) {
      const tagName = this.text;
      const topElem = this.getTopElem();
      if (topElem.tagName !== tagName) throw new Error();
      this.stack.pop();
    } else {
      if (!this.created) {
        if (this.text) {
          const ast = AST.generateASTByTag(this.text);
          const parent = this.getTopElem();
          parent.addChild(ast);
          this.stack.push(ast);
          this.created = true;
        } else {
          throw new Error();
        }
      }
    }

    this.resetState();
    return true;
  }

  equalHook(): boolean {
    if (this.state === 1 || !this.created) throw new Error();
    this.attrName = this.text;
    this.text = '';
    return true;
  }

  quotationHook(): boolean {
    if (!this.created) throw new Error();
    if (!this.attrStart) {
      this.text = '';
      this.attrStart = true;
    } else {
      this.attrValue = this.text;
      const ast = this.getTopElem();
      ast.addAttr([this.attrName, this.attrValue]);
      this.resetAttrState();
      this.text = '';
    }
    return true;
  }

  slashHook(): boolean {
    if (this.text.length === 0) {
      this.state = 1;
      this.text = '';
    } else {
      // uniary elem (todo)
    }
    return true;
  }

  hyphenHook(): boolean {
    throw new Error("Method not implemented.");
  }

  commonHook(c: string): boolean {
    if (c.length !== 1) throw new Error();
    this.text += c;
    return true;
  }

}