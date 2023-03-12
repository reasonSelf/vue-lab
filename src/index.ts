import observe from './observer/index';
import compile from './compiler';
import codeGen from './compiler/codeGen';

export default class Vue {
  name: string
}

// const template = `
//   <div>
//     <div>Hello World!</div>
//     <div v-if="testIf" v-for="item in testFor">bo zeng</div>
//   </div>
// `

const template = `
  <div>
    <div>hello { testName }</div>
    <div @change="test"></div>
  </div>
`

const ast = compile(template);
console.log(ast);
// const obj = {
//   testIf: true,
//   testFor: ['hello', 'world'],
//   render: codeGen(ast)
// }
// console.log(obj.render());

