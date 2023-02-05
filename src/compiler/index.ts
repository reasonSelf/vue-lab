import AST from './def';

export default function compile(template: string): AST {
  const stack = [];
  console.log('compil')
  return AST.generateASTByTag('div');
}