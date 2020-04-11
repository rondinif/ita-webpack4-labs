# node_modules/html-webpack-plugin/lib/loader.js
``` js
console.dir(source)
var pug = require("!../../../node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (JSON) {pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Ctitle\u003E" + (pug.escape(null == (pug_interp = 'index.pug') ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Ch3\u003Elocals\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined));;return pug_html;};
module.exports = template;
VM1702:1
undefined
```





# node_modules/html-webpack-plugin/index.js
## 
`executeTemplate (templateFunction, assets, assetTags, compilation) {`

# 
console.dir(templateFunction.prototype.constructor.toString())
``` js 
console.dir(templateFunction.prototype.constructor.toString())
undefined
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (JSON) {pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Ctitle\u003E" + (pug.escape(null == (pug_interp = 'index.pug') ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Ch3\u003Elocals\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined));;return pug_html;}
```

### https://www.npmjs.com/package/html-webpack-plugin/v/3.2.0
```
console.dir(templateParams)
undefined
Object {foo: , some: "value"}
VM1882:1
foo:() => …
some:"value"
__proto__:Object {constructor: , __defineGetter__: , __defineSetter__: , …}
```

###
```
console.dir(templateParams)
Object {compilation: Compilation, webpackConfig: Object, htmlWebpackPlugin: Object, foo: , some: "value"}
VM1873:1
compilation:Compilation {_pluginCompat: SyncBailHook, hooks: Object, name: undefined, …}
foo:() => …
htmlWebpackPlugin:Object {tags: Object, files: Object, options: Object}
files:Object {publicPath: "", js: Array(1), css: Array(0), …}
options:Object {template: "/Users/ronda/projects/rondinif/ita-webpack4-labs/n…", templateContent: false, templateParameters: Object, …}
tags:Object {headTags: HtmlTagArray(0), bodyTags: HtmlTagArray(1)}
__proto__:Object {constructor: , __defineGetter__: , __defineSetter__: , …}
some:"value"
webpackConfig:Object {entry: "./src/lab-pug-03/src/index.js", output: Object, module: Object, …}
cache:true
context:"/Users/ronda/projects/rondinif/ita-webpack4-labs"
devtool:"eval"
entry:"./src/lab-pug-03/src/index.js"
infrastructureLogging:Object {level: "info", debug: false}
mode:"development"
module:Object {rules: Array(1), unknownContextRequest: ".", unknownContextRegExp: false, …}
node:Object {console: false, process: true, global: true, …}
optimization:Object {removeAvailableModules: false, removeEmptyChunks: true, mergeDuplicateChunks: true, …}
output:Object {filename: "[name].bundle.js", path: "/Users/ronda/projects/rondinif/ita-webpack4-labs/d…", chunkFilename: "[name].bundle.js", …}
performance:false
plugins:Array(3) [DotenvFlow, CleanWebpackPlugin, HtmlWebpackPlugin]
resolve:Object {unsafeCache: true, modules: Array(1), extensions: Array(4), …}
```

### src/lab-pug-03/webpack.config.js
``` js
//[snip]
      new HtmlWebpackPlugin({
        title: `${exampleId}`,
        chunksSortMode: "none" ,
        template: PATHS.src + '/index.pug',
        inlineSource: '.(js|css)',
        templateParameters: {
          foo: () => 'bar',
          some: 'value'
        }
```


### src/lab-pug-03/src/index.pug
``` pug
html(lang='en')
  head
    title= 'index.pug'
  body
    h3 locals
    .debug!= JSON.stringify(locals)
```
``` pug 
    .debug!= JSON.stringify(locals.htmlWebpackPlugin.options.templateParameters)
```
## v/4
### JSON.stringifytemplateParams)
TypeError: Converting circular structure to JSON
### JSON.stringify(templateParams.htmlWebpackPlugin.options.templateParameters)
"{"some":"value"}"

## v/3.2.0
### JSON.stringify(templateParams)
"{"some":"value"}"