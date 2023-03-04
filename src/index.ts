import observe from './observer/index';
import compile from './compiler';
import codeGen from './compiler/codeGen';

export default class Vue {
  name: string
}

const template = `
  <div v-if="xxx" data-id="333" class="wrapper space" :data="data" @click="clickHandler" id="test">
    <div class="text" v-for="data of xxxx">
      Hello <b>{{ name }}</b>
    </div>
  </div>
`

const ast = compile(template);
const render = codeGen(ast);
render();
