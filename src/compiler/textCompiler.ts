import AST from "./def";
import CompilerInterface from "./compiler";
import { vaildIgnoreChar } from "../util";

export default class TextCompiler implements CompilerInterface {
  stack: AST[];
  text: string;

  constructor(stack: AST[]) {
    this.stack = stack;
    this.text = '';
  }

  getTopElem() {
    return this.stack[this.stack.length - 1];
  }

  // hooks
  whiteSpaceHook(): boolean {
    return this.commonHook(' ');
  }

  lessThanHook(): boolean {
    if (this.text.length === 0) return true;
    const ast = AST.generateText(this.text);
    const parent = this.getTopElem();
    parent.addChild(ast);
    this.text = '';
    return true;
  }

  greaterThanHook(): boolean {
    if (this.text) {
      return this.commonHook('>');
    }
    return true;
  }

  equalHook(): boolean {
    return this.commonHook('=');
  }

  quotationHook(): boolean {
    return this.commonHook('"');
  }

  slashHook(): boolean {
    return true;
  }

  hyphenHook(): boolean {
    return this.commonHook('-');
  }

  atHook(): boolean {
    return this.commonHook('@');
  }

  colonHook(): boolean {
    return this.commonHook(':');
  }

  commonHook(c: string): boolean {
    if (c.length !== 1) throw new Error();
    if (!vaildIgnoreChar(c) || this.text) {
      this.text += c;
    }
    return true;
  }
}