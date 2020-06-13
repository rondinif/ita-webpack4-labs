<!--file originale vedi: private/debug-dot-env/pug-loader-template-debug.md -->
# Utilisso di repl per la verifica del funzionamento dal `pug-loader`
tramite [repl](https://it.wikipedia.org/wiki/Read–eval–print_loop) possiamo
riprodurre e studiare i passaggi che vengono eseguiti nel `pug-loader` 
 , i quali sono verificabili anche in debugging, 

## function run()
```
$ grep -ril compileClient .
./node_modules/jstransformer/index.js
./node_modules/pug/History.md
./node_modules/pug/lib/index.js
./node_modules/pug-runtime/README.md
./node_modules/pug-loader/index.js
```
prendiamo da `./node_modules/pug-loader/index.js` la funzione `run()`
``` js 
function run() {
    try {
        var tmplFunc = pug.compileClient(source, {
            filename: req,
            doctype: query.doctype || "html",
            pretty: query.pretty,
            self: query.self,
            compileDebug: loaderContext.debug || false,
            globals: ["require"].concat(query.globals || []),
            name: "template",
            inlineRuntimeFunctions: false,
            filters: query.filters,
            plugins: [
                plugin
            ].concat(query.plugins || [])
        });
```

## DEBUG
### attivazione del processo di build in madalità debug
``` bash
ita-webpack4-labs (master)*$ NODE_ENV=development npm run debug-lab-pug-03

> @rondinif/ita-webpack4-labs@0.1.0 debug-lab-pug-03 ~/projects/rondinif/ita-webpack4-labs
> node --inspect-brk=5858 node_modules/webpack/bin/webpack.js --colors --config src/lab-pug-03/webpack.config.js --mode=development

Debugger listening on ws://127.0.0.1:5858/a5128468-42f2-47e6-ae18-2390e794263e
For help, see: https://nodejs.org/en/docs/inspector
```
### attach del debugger da vscode
.vscode/launch.json
``` json 
    {
        "type": "node",
        "request": "attach",
        "name": "Attach-lab-pug-03",
        "port": 5858,
        "skipFiles": [
            "<node_internals>/**"
        ]
    }
```

## REPL 
``` js
ita-webpack4-labs (master)*$ node 
Welcome to Node.js v13.5.0.

> var pug = require("pug-runtime/index.js");

> function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (JSON, Object, console, process) {pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E";
... this.console.log('a trace form index.pug [')
... console.log(this["HTML_WEBPACK_PLUGIN"])
... this.console.log('a trace form index.pug ]')
... pug_html = pug_html + "\u003Chead\u003E\u003Cmeta charset=\"UTF-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"\u003E\u003Ctitle\u003E" + (pug.escape(null == (pug_interp = 'index.pug') ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Ch3\u003Eprocess.env\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(process.env)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003Elocals.foo()\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = locals.foo()) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003Elocals\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(locals)) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003Ethis\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(Object.getOwnPropertyNames(this))) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003Eglobal\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(Object.getOwnPropertyNames(this.global))) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003EHTML_WEBPACK_PLUGIN keys\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(Object.keys(this.HTML_WEBPACK_PLUGIN))) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003Ethis.globalThis keys:\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(Object.keys(this.globalThis))) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003Eglobal[\"GLOBAL\"]\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(Object.getOwnPropertyNames(this.global["GLOBAL"]))) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch3\u003Eglobal[\"root\"]\u003C\u002Fh3\u003E\u003Cdiv class=\"debug\"\u003E" + (null == (pug_interp = JSON.stringify(Object.getOwnPropertyNames(this.global["root"]))) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined,"Object" in locals_for_with?locals_for_with.Object:typeof Object!=="undefined"?Object:undefined,"console" in locals_for_with?locals_for_with.console:typeof console!=="undefined"?console:undefined,"process" in locals_for_with?locals_for_with.process:typeof process!=="undefined"?process:undefined));;return pug_html;};


> this.HTML_WEBPACK_PLUGIN = "ciao"
'ciao'
> template({foo: () => 'ronda'})
a trace form index.pug [
ciao
a trace form index.pug ]
'<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"...


> (node:7258) [DEP0016] DeprecationWarning: 'GLOBAL' is deprecated, use 'global'
```

## caso d'uso di repl per studiare un PlugIn del Webpack  
si prende come esempio di plugin del webpack: [dotenv-flow-webpack](https://www.npmjs.com/package/dotenv-flow-webpack)

`src/lab-pug-03/webpack.config.js`
``` js
  plugins: [
      new DotenvFlow({
        default_node_env: 'development',
        path: `./src/${exampleId}/config`,
        system_vars: true,
        silent: false
      }),
```

### sessione repl per studiare `dotenv-flow-webpack`
Il plugin in questione viene installato in `node_modules/dotenv-flow-webpack/` in particolare nel sorgente `lib/dotenv-flow-webpack.js` vediamo che, in quanto plugin del `webpack` estende [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)  
``` js
const {DefinePlugin} = require('webpack');
..
class DotenvFlow extends DefinePlugin {`
```
come possiamo leggere dalla documentazione ufficiale, permette la creazione di costanti globali (`global constants`) configurate a *compile time* permettendocompartimenti diversi delle `development builds` rispettoo alle `production builds`.

### esempio sessione repl  
nella sessione repl possiamo isolare gli aspetti di 
`node_modules/dotenv-flow-webpack/lib/dotenv-flow-webpack.js`
cui vogliamo verificarne il funzionamento, 

per esempio, una volta aperto il repl eseguendo `node` si  
può caricare `existingFiles` e `variables` eseguendo queste istruzioni: 

``` js 
const dotenvFlow = require('dotenv-flow');
const fs = require('fs');
const node_env = "development" // "production"
const existingFiles = (dotenvFlow.listDotenvFiles('./src/lab-pug-03/config', { node_env }).filter(filename => fs.existsSync(filename)))
const variables = dotenvFlow.parse(existingFiles, {});
```

ecco l'output completo della sessione di esempio:
``` js
ita-webpack4-labs (master)*$ node 
Welcome to Node.js v13.5.0.
Type ".help" for more information.
> const dotenvFlow = require('dotenv-flow');
undefined
> const fs = require('fs');
undefined
> const node_env = "development"
undefined
> const existingFiles = (dotenvFlow.listDotenvFiles('./src/lab-pug-03/config', { node_env }).filter(filename => fs.existsSync(filename)))
undefined
> const variables = dotenvFlow.parse(existingFiles, {});
undefined
> existingFiles
[
  '~/projects/rondinif/ita-webpack4-labs/src/lab-pug-03/config/.env',
  '~/projects/rondinif/ita-webpack4-labs/src/lab-pug-03/config/.env.development'
]
> variables
{
  NODE_ENV: 'development',
  PHYTOJS_API_SERVICE_URL: 'https://localhost:8080/v1/resolvedPlantsByName',
  VERNACULAR_NAME: 'sviluppami'
}
> 
```

altro esempio, rispetto al precedente è stato modificato per vedere cosa succede se si imposta `node_env_prod = "production"`: 
``` js
ita-webpack4-labs (master)*$ node 
Welcome to Node.js v13.5.0.
Type ".help" for more information.
> const dotenvFlow = require('dotenv-flow');
undefined
> const fs = require('fs');
undefined
> const node_env_prod = "production"
undefined
> const existingFiles = (dotenvFlow.listDotenvFiles('./src/lab-pug-03/config', { node_env_prod }).filter(filename => fs.existsSync(filename)))
undefined
> const variables = dotenvFlow.parse(existingFiles, {});
undefined
> existingFiles
[
  '~/projects/rondinif/ita-webpack4-labs/src/lab-pug-03/config/.env'
]
> variables
{
  NODE_ENV: 'production',
  PHYTOJS_API_SERVICE_URL: 'https://api.phytojs.app/v1/resolvedPlantsByName',
  VERNACULAR_NAME: 'origano'
}
``` 