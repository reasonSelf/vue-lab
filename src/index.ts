import ob from './observer/index';
import compile from './compiler';

export default class Vue {
  name: string
}

const template = `
  <div class="hello" id="test">
    <div>
      Hello world!
      <span>Bo zeng</span>
    </div>
  </div>
`

console.log(compile(template));