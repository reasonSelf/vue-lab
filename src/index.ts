import observe from './observer/index';
import compile from './compiler';

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

console.log(compile(template));