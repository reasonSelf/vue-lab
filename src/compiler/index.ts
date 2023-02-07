import AST from './def';

export default function compile(template: string): AST {
  const stack: Array<AST> = [];
  let index = 0, currentText = '';
  while (index < template.length) {
    const c = template[index];
    if (c === '<') {
      textHook();
      currentText = '';
      tagHookDispathcer();
    } else {
      currentText += c;
      index++;
    }
  }

  function tagHookDispathcer() {
    const nextC = template[++index];
    if (nextC === '/') {
      endHook();
    } else {
      startHook();
    }
  }

  function startHook() {
    let tagName = '';
    while (index < template.length && template[index] !== '>' && template[index] !== ' ') tagName += template[index];
    const currentAST = AST.generateASTByTag(tagName);
    const parent = stack.length ? stack[stack.length - 1] : null;
    if (parent) parent.addChild(currentAST);
    stack.push(currentAST);
    while (index < template.length && template[index] !== '>') attrHook();


    function attrHook() {
      let key = '', value = '', flg = true;
      while (index < template.length && template[index] !== '=') {
        const c = template[index];
        if (c !== ' ') key += template[index];
        index++;
      }
      index = index + 2;
      while (index < template.length && template[index] !== '"' && template[index] !== "'") {
        value += template[index];
        index++;
      }
      currentAST.addAttr([key, value]);
    }
  }

  function endHook() {
    let tagName = '';
    index++;
    while (index < template.length && template[index] !== '>') {
      tagName += template[index];
      index++;      
    }
    stack.pop();
    return;
  }

  function textHook() {
    if (currentText === '') return;
    const ast = AST.generateText(currentText);
    const parent = stack.length ? stack[stack.length - 1] : null;
    if (parent) parent.addChild(ast);
  }
}