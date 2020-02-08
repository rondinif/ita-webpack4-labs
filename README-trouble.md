# guida alla risoluzione dei problemi più comuni

## consultazione dei logs prodotti da npm
``` bash
$ ls -lrt ~/.npm/_logs/
~/.npm/_logs/2019-12-28T03_43_46_001Z-debug.log
```

## debugging del processo di build e pacchettizazione
vedi: **lab-pug-03** in `src/lab-pug-03/` eseguire la compilazione in modo che nodejs ( che è il `runtime` del `webpack` si metta in ascolto, in attesa di un **debugger**,  sulla porta `5858` : 
``` bash
$ npm run debug-lab-pug-03

> @rondinif/ita-webpack4-labs@0.1.0 debug-lab-pug-03 /Users/ronda/projects/rondinif/ita-webpack4-labs
> node --inspect-brk=5858 node_modules/webpack/bin/webpack.js --colors --config src/lab-pug-03/webpack.config.js --mode=development
```

come `nodejs debugger` si potrebbe usare per esempio  [vscode](https://code.visualstudio.com/docs/nodejs/debugging-recipes), in questo caso nel file del progetto `.vscode/launch.json` serve una configurazione del tipo: 
``` json
{
    "version": "0.2.0",
    "configurations": [
    {
        "type": "node",
        "request": "attach",
        "name": "Attach-lab-pug-03",
        "port": 5858,
        "skipFiles": [
            "<node_internals>/**"
        ]
    },
// altre configurazioni omesse in questo documento
```
in tal modo [è possibile effettuare il debugging come descritto nella documentazione ufficiale di vscode](https://code.visualstudio.com/docs/editor/debugging)

NB: è anche possibile entrare in debug di una "configurazione" pariale ( in cui si cercherà di isolare solo l'aspetto sul quale si ritiene importante effettuare il debug)
``` bash 
# supponiamo di avere un `test02.js` in cui si è minimizzato il perimetro di ispezione:  
node-nightly --inspect-brk ./node_modules/webpack/bin/webpack.js test02.js
```

## inserimento di tracce nei moduli ( plugins o loaders ) utilizzati dal webpack nel processo di build e pacchettizzazione 

l'aggiunta di tracce "estemporanee" al codice sorgente del progetto e delle sue dipendenze (`dependencies`) o dei moduli dai quali dipende lo sviluppo del progetto stesso ( `devDependecies` ) può rappresentare una possibile alternativa al debug o un coadiuvante al debug stesso.

ad esempio aggiungendo a `./node_modules//pug-code-gen/index.js` una traccia del tipo: 
``` js
// [snip ..codice di `pug-code-gen/index.js` precedente alla valorizzazione di globals]
    var globals = this.options.globals ? this.options.globals.concat(INTERNAL_VARIABLES) : INTERNAL_VARIABLES;

    console.log("[[[[[[[ FR_COMPILING");
    console.log("globals:");
    console.log(JSON.stringify(globals));
    console.log("FR_COMPILING  ]]]]]]]]");
// [snip ..restante codice di `pug-code-gen/index.js` 
``` 
otterremo sul terminale (sysout) , durente la compilazione , una traccia del tipo 
```
[[[[[[[ FR_COMPILING
globals:
["require",{"hello":"ronda"},"pug","pug_mixins","pug_interp","pug_debug_filename","pug_debug_line","pug_debug_sources","pug_html"]
FR_COMPILING  ]]]]]]]]
```
che, sempre riferendoci a questo specifico caso, ci permette di capire se siamo riusciti o meno ad iniettare  `{"hello":"ronda"}` nei `globals` di `pug`. 

Questa tecnica non andrebbe seguita se non si ha sufficiente dimenstichezza con lo sviluppo di moduli javascript o typescript , richiede quindi una certa esperienza: per esempio chi seguirà queste tecniche sarà sicuramente consapevole che i moduli così modificati dovranno essere ripristinate allo stato originale, ad esempio ripartendo da una installazione pulita delle dipendenze: `rm -rf node_modules` + `npm i`  
