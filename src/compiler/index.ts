import AST from './def';

export default function compile(template: string): AST {
  const stack: Array<AST> = [];
  let index = 0;
  return parse();

  function parse(): AST {
    while (template[index++] !== '<');
    let tagName = '';
    while (template[index] !== ' ' && template[index] !== '>') tagName += template[index++];
    const currentAST = AST.generateASTByTag(tagName);
    if (stack.length) stack[stack.length - 1].addChild(currentAST);
    stack.push(currentAST);
    getAttr();
    index++;
    getTextContent();
    while (index < template.length && template[index + 1] != '/') parse();

    while (index < template.length && template[index++] != '>');
    stack.pop();
    return currentAST;
  }

  function getAttr() {
    let key = '', value = '', switcher = true;
    const ast = stack[stack.length - 1];
    while (template[index] !== '>') {
      const c = template[index];
      if (c === ' ' && key && value) {
        ast.addAttr([key, value]);
        key = '';
        value = '';
        switcher = true;
        index++;
        continue;
      }
      if (c === '=') {
        switcher = false;
      } else {
        if (switcher) {
          key += c;
        } else {
          value += c;
        }
      }
      index++;
    }
    if (key && value) ast.addAttr([key, value]);
  }

  function getTextContent() {
    const ast = stack[stack.length - 1];
    let content = '';
    while (index < template.length && template[index] !== '<') {
      content += template[index++];
    }
    ast.addTextContent(content);
  }
}