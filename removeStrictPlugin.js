
class RemoveStrictPlugin {
  constructor() {
  }
  
  apply(compiler) {
    const pluginName = RemoveStrictPlugin.name;
    const { sources } = compiler.webpack;

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          additionalAssets: true
        }, 
        (assets) => {
          Object.entries(assets).forEach(([pathname, source], index) => {
            const stream = removeStrict(source.source());
            compilation.updateAsset(                
              pathname,
              new sources.RawSource(stream)
            );
          });
        })
    })
  }
}

function removeStrict(str) {
  let res = '';
  if (str && typeof str === 'string') {
    const rule = /(\"|\')use strict(\"|\');?/gi;
    return str.replace(rule, '');
  }
  return res;
}

module.exports = RemoveStrictPlugin;