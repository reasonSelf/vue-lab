import Yue from './types/yue';

const template = `
  <div>
    <div>hello { testName }</div>
    <div @change="test" v-show="show"></div>
  </div>
`

const app = new Yue({
  template
})
app.render();

console.log(app);