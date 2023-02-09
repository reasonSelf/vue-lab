const fs = require('fs');
const { exec } = require('child_process');

const basePath = './src';
const wathcerList = [];

function getFileList(path) {
  fs.readdirSync(path).forEach(file => {
    const currPath = `${path}/${file}`;
    const stat = fs.statSync(currPath);
    if (stat.isDirectory()) {
      getFileList(currPath);
    } else {
      wathcerList.push(currPath)
    }
  })
}
getFileList(basePath);

wathcerList.forEach(file => {
  fs.watchFile(file, {bigint: false, persistent: true, interval: 1000}, (curr, prev) => {
    console.clear();
    console.log('compiling......');

    exec('npm run build', (error, stdout, stderr) => {
      console.clear();
      if (error) {
        console.log(`error: ${error.message}`);
        return ;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    })
  })
})

console.clear();
console.log('running.......');