import Yue from './types/yue';

const template = `
  <div>
    <div>hello { testName }</div>
    <div @change="test" v-show="show"></div>
  </div>
`

const app = new Yue({
  template,
  data() {
    return {
      testName: 'yjy',
      show: true
    }
  }
})

setTimeout(() => {
  const sss = app as { [key in string]: any}
  sss.testName = 'vczh';
}, 2000);