import AST from './def';
import { vaildIgnoreChar } from '../util/index';

export default function compile(template: string): AST {
  const tempAST = AST.createEmptyAST();
  const stack: Array<AST> = [tempAST];
  let index = 0, text = '';

  // todo
  // valid template

  while (index < template.length && template[index] !== '<') index++;

  elementHook();

  return tempAST.children[0];

  // function set

  function elementHook() {
    if (index >= template.length) return;
    preHandler();

    if (template[index + 1] === '/') {
      while (index < template.length && template[index] !== '>') index++;
      stack.pop();
    } else {
      const tagName = getTagName();
      const ast = AST.generateASTByTag(tagName);
      const parent = getParent();
      parent.addChild(ast);
      stack.push(ast);
      getAttr(ast);
    }
    index++;
    textHook();
  }

  function textHook() {
    if (index >= template.length) return;
    while (index < template.length) {
      const c = template[index];
      if (c === '<') break;
      if (vaildIgnoreChar(c) || text) {
        text += c;
      } else {
        text += c;
      }
      index++;
    }
    elementHook();
  }

  function preHandler() {
    if (text === '') return;
    const ast = AST.generateText(text);
    const parent = getParent();
    parent.addChild(ast);
    text = '';
  }

  function getTagName(): string {
    let name = '';
    while (index < template.length && template[index] !== ' ' && template[index] !== '>') {
      const c = template[index];
      if (c !== '<') name += c;
      index++;
    }
    return name;
  }

  function getAttr(paramAst: AST) {
    while (index < template.length && template[index] !== '>') {
      const name = getName();
      const value = getValue();
      if (name && value) {
        paramAst.addAttr([name, value]);
      }
      index++;
    }

    function getName(): string {
      let name = '';
      while (index < template.length) {
        const c = template[index];
        if (c === '>') return name;
        if (c === '=') break;
        if (!vaildIgnoreChar(c)) name += c;
        index++;
      }
      return name;
    }

    function getValue(): string {
      if (template[index] === '>') return '';
      let value = '';
      while (index < template.length) {
        const c = template[index++];
        if (c === '>') return value;
        if (c === '"' || c === "'") break;
      }
      while (index < template.length && template[index] !== '"' && template[index] !== "'") value += template[index++];
      return value;
    }
  }

  function getParent() {
    return stack[stack.length - 1];
  }
}