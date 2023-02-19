import AST from "./def"

export default interface CompilerInterface {
  stack: AST[];
  text: string,

  whiteSpaceHook(): boolean;
  lessThanHook(): boolean;
  greaterThanHook(): boolean;
  equalHook(): boolean;
  quotationHook(): boolean;
  slashHook(): boolean;
  hyphenHook(): boolean;
  commonHook(c: string): boolean;
}