import AST from "./def";
import CompilerInterface from "./compiler";
import { vaildIgnoreChar } from "../util";

export default class TextCompiler implements CompilerInterface {
  stack: AST[]
  text: string
  curlyStart: boolean
  isStatic: boolean
  // <type, text> (0: normal, 1: var)
  contentList: [number, string][]

  constructor(stack: AST[]) {
    this.stack = stack;
    this.reset();
  }

  reset() {
    this.resetText();
    this.contentList = [];
    this.isStatic = true;
    this.curlyStart = false;
  }
  resetText() {
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
    if (this.text.length === 0 && this.contentList.length === 0) return true;
    let textContent = '';
    if (this.isStatic) {
      textContent = this.text;
    } else {
      textContent = this.contentList.map(([, text]) => text).join('+');
    }
    
    const ast = AST.generateText(textContent, this.isStatic);
    const parent = this.getTopElem();
    parent.addChild(ast);
    this.reset();
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

  openCurlyHook(): boolean {
    if (this.text) {
      this.contentList.push([0, `'${this.text}'`]);
    }
    this.resetText();
    this.curlyStart = true;
    return true;
  }

  closeCurlyHook(): boolean {
    if (this.curlyStart) {
      this.contentList.push([1, this.text]);
      this.curlyStart = false;
      this.isStatic = false;
      this.resetText();
    } else {
      return this.commonHook('}');
    }
  }

  commonHook(c: string): boolean {
    if (c.length !== 1) throw new Error();
    if (!vaildIgnoreChar(c) || this.text || this.curlyStart) {
      this.text += c;
    }
    return true;
  }
}