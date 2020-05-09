# Appunti sessione debugging
questa sessione di debug ha aiutato a per capire:
1. il funzionamento del `webpack` con `html-webpack-plugin` e `pug`
2. i cambiamenti introdotti dal passaggio di HtmlWebpackPlugin dalle versioni precedenti alla versione 4.x
2. come dobbiamo eventualmente modificare il codice della template pug per evitare l'errore `TypeError: Converting circular structure to JSON` passando da `HtmlWebpackPlugin 3.2.0` a `HtmlWebpackPlugin 4.2.0` ( in generale `4+`) 

# Parte1: note sul funzionamento  del `webpack` con `html-webpack-plugin` e `pug` per mezzo del `pug-loader`

## Nel `webpack 4` Le classi `Compiler`, `NormalModuleFactory`, `Compilation`, `Parser`  estendono `Tapeable` quindi usano `node_modules/tapable/lib/Hook.js`

il `custom plugin system` di `webpack` utilizza il meccanismo degli `hooks` grazie al modulo [tapable](https://github.com/webpack/tapable).

Tramite il meccanismo degli `hooks` il `webpack`manda la **notifica** di **eventi** e permette 
l'esecuzione di **codice custum** quando tali eventi si verificano.

In inglese "**tapping**" sta per "**intercettazione**" e si usa l'espressione verbale "**to tap into <qualcosa>**" per **trarre vantaggio da qualcosa**, **sfruttare** , "**attingere da qualcosa** , "**inserirsi**; in pratica una
classe *Tapeable* è una classe che ci permette ( tramite il meccanismo degli `hooks` ) di **intercettare** questi eventi 
e di **sfruttarli** mettendoci in mezzo l'esecuzione del nostro **codice custum**

A hook will trigger all tapped functions when it is called.
Calling a hook is like triggering a “click” event. All click event listener functions will fire now.
To tap a hook, run its tap method.

Per conoscere meglio il funzionamento di questo mecanismo ho letto questo articolo: ["What the Hook? Learn the basics of Tapable" by Anthony Ng](https://codeburst.io/what-the-hook-learn-the-basics-of-tapable-d95eb0401e2c)
<!--
The first argument is the name of your plugin. This name is used for diagnostic/debugging information.
The second argument is a callback function that is called when your hook is called. Your callback function has access to arguments passed to the hook’s call method.
Esistono diversi meccanismi per intercettare i plugin che usano gli hooks per gestire eventi
in particolare la classe che espone eventi può intercettare i plugins
  - quando si registrano 
  - ogni volta che vengono chiamati 
  - quando vengono chiamati ( una sola volta ) 
-->

this.hooks.beforeRun.

## Come viene innescata la `build` del nostro modulo `pug` ( `src/index.pug`)
- node_modules/webpack/bin/webpack.js  : cerca una `cli` e se la trova la usa.
  - node_modules/webpack-cli/bin/cli.js : la `cli` processa le opzioni e ottiene dal `webpack` il `compiler` passandogli le `options`
    - node_modules/webpack/lib/Compiler.js : crea una istanza di compilazione instanziando `Compilation`
      - node_modules/webpack/lib/Compilation.js : ha un hook `buildModule` in cui viene invocata la `module.build` passandogli le `options` e diverse altre cose già appartenenti alla istanza di compilazione.

## Come viene trattato `src/index.pug` dai loaders durante al `build` 
- node_modules/webpack/lib/NormalModule.js: `build` riceve i suddetti paratri e chiama la `doBuild` la quale comanda la creazione di un `loaderContext` quindi esegue `runLoaders`
  - node_modules/loader-runner/lib/LoaderRunner.js: tramite la `iteratePitchingLoaders`
  - node_modules/loader-runner/lib/loadLoader.js: carica ...... quindi chia la callback sulla `iteratePitchingLoaders`
  - node_modules/loader-runner/lib/LoaderRunner.js: sempre dalla `iteratePitchingLoaders` finalmente , quando ha finito di iterare i `loaderContext.loaders` ritorna chiamando la `processResource` che aggiunge dipendenze al `loaderContext` , legge il file a passa all' `iterateNormalLoaders` che preveder una iterazione con `runSyncOrAsync/LOADER_EXECUTION` per eseguire le `run` dei **loaders**
    - `options.readResource(resourcePath, function(err, buffer)` legge il file 
    - node_modules/pug-loader/index.js: riceve il contenuto del nostro `src/index.pug` come `source` e prova a compilare la template nella `function run()` 
			- var tmplFunc = pug.compileClient(source, ..... ); 
      quindi: 
      - var runtime = "var pug = require(" + loaderUtils.stringifyRequest(loaderContext, "!" + modulePaths.runtime) + ");\n\n";
		  - `loaderContext.callback(null, runtime + tmplFunc.toString() + ";\nmodule.exports = template;");` 
      la callback innesca nuovamente in `LoaderRunner.js` la suddetta `iterateNormalLoaders` che arriva quindi al `loader` dell'`html-webpack-plugin` sempre tramite la `runSyncOrAsync/LOADER_EXECUTION` sopra citata.
    - node_modules/html-webpack-plugin/lib/loader.js: riceve già la elaborazione fatta dal `pug-loder` di `src/index.pug` ovvero quello che per `pug-loader` era: `loaderContext.callback(null, runtime + tmplFunc.toString() + ";\nmodule.exports = template;");` nella *Parte2** di questa guida è riportato un esempio del `source` ricevuto dall `loader` dell'`html-webpack-plugin`
      - tuttavia il non effetua alcuna modifica al `source` in quanto ha come regola ` This loader shouldn't kick in if there is any other loader (unless it's explicitly enforced)` per cui una volta verificato che c'è stato un altro  `loader` che precedentemente era intervenuto si limita a restituire il `source` così come è in quanto la nostra configurazione non prevede l'opzione di forzatura che di default è disabilitata da `const force = options.force || false;`  

## WebPack Parsing 
- node_modules/webpack/lib/NormalModule.js: il sistema di callback fa si che dalla `runSyncOrAsync` si torma alla `doBuild` che ora è pronta a provare a produrre un risultato con  `const result = this.parser.parse(`
  - node_modules/webpack/lib/Parser.js: `parse(source, initialState) {` riceve come `source` l'output del `loader` di dell'`html-webpack-plugin` che sappiamo essere praticamenta la versione immutata dell'output dell `pug-loader`; trattandosi di una `String` e non di `Object` effettua il parsing:
  ``` js 
  ast = Parser.parse(source, {
    sourceType: this.sourceType, // this.sourceType vale auto 
    onComment: comments // comments è un Array vuoto
  });
  ```
  l' **ast.bosy** ottenuto è costituito da 4 nodi: 

1. 0:Node {type: "VariableDeclaration", …}: `pug = require("!../../../node_modules/pug-runtime/index.js")`
1. 1:Node {type: "FunctionDeclaration", …}: `function template(locals) ...` 
1. 2:Node {type: "EmptyStatement", …}: `` 
1. 3:Node {type: "ExpressionStatement", …}: `module.exports = template;`
nella **fase di debug** è possibile esportare per ispezionarlo ciascuno di questi nodi dalla *console* cpm 
comandi del tipo `JSON.stringify(ast.body[0])`, in alternativa è possibile utilizzare uno strumento 
come [astexplorer](https://astexplorer.net) ed incollare direttamente `source` per esaminare l'AST in dettaglio

inoltre viene dato accesso all'abstract syntax tree (AST): vedi anche `program` SyncBailHook in [JavascriptParser Hooks](https://webpack.js.org/api/parser/) e se questo non è 
1. `detectMode`: determima se usare `"use strict"` o `"use asm"`
1. `prewalkStatements`: 	// Prewalking iterates the scope for variable declarations
1. `blockPrewalkStatements`: // Block-Prewalking iterates the scope for block variable declarations
1. `walkStatements`:	// Walking iterates the statements and expressions and processes them; per ogni *statement* 
chiama l'hook *statement* `this.hooks.statement.call` quindi in base al `statement.type` chiama altre funzioni di `walk*` che a loro volta possono chiamare hooks

- node_modules/webpack/lib/node/NodeSourcePlugin.js: 
Notare che durante l'attraversamento degli statetems è possibile che si  torni ad utilizzare il `parser` di `Parser.js` 
rientrando per ogni singola espressione (ad esempio con )


# Parte2: debugging per analizzare i cambiamenti introdotti nel passaggio dalla 3 alla 4
## node_modules/html-webpack-plugin/lib/loader.js
``` js
console.dir(source)
var pug = require("!../../../node_modules/pug-runtime/index.js");

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (JSON) {pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Ctitle\u003E" + (pug.escape(null == (pug_interp = 'index.pug') ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Ch3\u003Elocals\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined));;return pug_html;};
module.exports = template;
VM1702:1
undefined
```

## node_modules/html-webpack-plugin/index.js
`executeTemplate (templateFunction, assets, assetTags, compilation) {`
### console.dir(templateFunction.prototype.constructor.toString())
``` js 
console.dir(templateFunction.prototype.constructor.toString())
undefined
function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (JSON) {pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Ctitle\u003E" + (pug.escape(null == (pug_interp = 'index.pug') ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Ch3\u003Elocals\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined));;return pug_html;}
```

### /v/3.2.0
```
console.dir(templateParams)
undefined
Object {foo: , some: "value"}
VM1882:1
foo:() => …
some:"value"
__proto__:Object {constructor: , __defineGetter__: , __defineSetter__: , …}
```

###  /v/4.2.0
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


# Parte 3: Sintesi delle modifiche necessarie al codice pug per evitare l'errore `TypeError: Converting circular structure to JSON`

## con `htmlWebpackPlugin` v/4.2.0
### JSON.stringify(locals))
TypeError: Converting circular structure to JSON
### JSON.stringify(templateParams.htmlWebpackPlugin.options.templateParameters)
"{"some":"value"}"

## con `htmlWebpackPlugin` v/3.2.0
### JSON.stringify(templateParams)
"{"some":"value"}"