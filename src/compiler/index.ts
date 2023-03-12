import AST from './def';
import ElemCompiler from './elemCompiler';
import CompilerInterface from './compiler';
import TextCompiler from './textCompiler';

export default function compile(template: string): AST {
  const tempAST = AST.createEmptyAST();
  const stack: Array<AST> = [tempAST];

  // todo
  // valid template

  const elemComp = new ElemCompiler(stack);
  const textComp = new TextCompiler(stack);
  const compilers: CompilerInterface[] = [elemComp, textComp];
  // type(0: elem, 1: text)
  let type = 0;

  // fixed iter
  const fixedTemplate = template.trim();

  try {
    for (const c of fixedTemplate) {
      switch(c) {
        case '<':
          compilers[type].lessThanHook();
          if (type !== 0) {
            type = 0;
            compilers[type].lessThanHook();
          }
          break;
        case '>':
          compilers[type].greaterThanHook();
          if (type !== 1) {
            type = 1;
            compilers[type].greaterThanHook();
          }
          break;
        case ' ':
          compilers[type].whiteSpaceHook();
          break;
        case '=':
          compilers[type].equalHook();
          break;
        case '"':
          compilers[type].quotationHook();
          break;
        case '-':
          compilers[type].hyphenHook();
          break;
        case '/':
          compilers[type].slashHook();
          break;
        case '@':
          compilers[type].atHook();
          break;
        case ':':
          compilers[type].colonHook();
          break;
        case '{':
          compilers[type].openCurlyHook();
          break;
        case '}':
          compilers[type].closeCurlyHook();
          break;
        default:
          compilers[type].commonHook(c);
          break;
      }
    }
  } catch(e) {
    console.error(e);
  }

  return tempAST.children[0];
}