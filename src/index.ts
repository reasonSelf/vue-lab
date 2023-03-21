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
  },
  methods: {
    hello() {
      console.log(`hello ${this.testName}`);
    }
  }
})

setTimeout(() => {
  const sss = app as { [key in string]: any}
  sss.testName = 'vczh';
  app.hello();
}, 2000);