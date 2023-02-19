import observe from './observer/index';
import compile from './compiler';

export default class Vue {
  name: string
}

const template = `
  <div class="wrapper space" @click="fffff" id="test">
    <div class="text">
      Hello <b>{{ name }}</b>
    </div>
  </div>
`

console.log(compile(template));