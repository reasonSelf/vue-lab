import ob from './observer/index';
import compile from './compiler';

export default class Vue {
  name: string
}

const template = '<div><div class="fillColor" id="welcome">Hello world</div></div>'
console.log(compile(template));