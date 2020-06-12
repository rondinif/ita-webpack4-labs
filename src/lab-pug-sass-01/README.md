<!-- 
vedere anche: 
- src/lab-83-pug/README-pug-notes.md
- src/lab-83-pug/README-wds-issue.md
TBD: https://developer.github.com/v3/ + Safari 20200206-tornaci ( 11 pannello)
-->
# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-pug-saas-01**: come `lab-pug-03` ma integrazione di variabile tra **stili css** e **javascript**

in questo caso il passaggio del *valore di variabile* è da `scss` a `javascript` (*server-side*) ed infine ad un elemento `html` (*client-side*)


## guide di riferimento 
- https://webpack.js.org/configuration/module/#ruleoptions--rulequery
- https://webpack.js.org/configuration/module/#useentry

- https://webpack.js.org/guides/asset-management/
- https://webpack.js.org/guides/output-management/
- https://webpack.js.org/guides/development/
- https://webpack.js.org/configuration/dev-server/
- https://github.com/pugjs/pug
- https://github.com/pugjs/pug-loader


- https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass

## cosa possiamo provare in `lab-pug-03'
in `lab-pug-03` approfondiamo il tema SSR già trattato anche in [lab-pug-02](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-pug-02) allo scopo di: 
- capire a fondo il funzionamento dei webpack's **loaders** e dei webpack's **plugins**
    - approfondimento sul tema **loaders**: 
        - configurazione 'avanzata' del [pug-loader]()
<!-- TBD   - implentazione di un plugin di esempio ( quasi banale ) per il `pug-loader` -->
    - approfondimento sul tema **plugins** 
        -  utilizzo il plugin [dotenv-flow-webpack](https://www.npmjs.com/package/dotenv-flow-webpack)
    - configurazione ( "ambientilizzazione" ) del processo di pacchettizzazione.
        detta anche "ambientilizzazione" in quanto utile dovendo gestire diversi ambienti di runtime come ad esempio: sviluppo, test o collaudo, produzione on prem o cloud etc..
    - caricamento di dati esterni ed interfacciamento a contesti esterni ( per caricare o   arricchire dati ) e loro utilizzo nel processo di pacchettizzazione
    - debugging del processo di pacchettizazione "webpack" e relativi "plugins" o "loaders" 

## configurazione 'avanzata' del [pug-loader]()
vedi: `src/lab-pug-02/webpack.config.js`


<!-- TBD ## implentazione di un plugin di esempio per il pug-loader -->

## utilizzo del plugin [dotenv-flow-webpack](https://www.npmjs.com/package/dotenv-flow-webpack)
, il quale può essere studiato ( aprendone i sorgenti ) come esempio di plugin wrapper di una API esistente , in questo caso il plugin in questione è un wrapper di [dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow#api-reference). PS: "wrappare una API" equivare a dire "usare una interfaccia" ovvero "interfacciarsi"

## configurazione (ambientalizzazione) del processo di build e  paccheticazione

## caricamento di dati esterni
Nel [lab-pug-02](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-pug-02) abbiamo visto come **caricare "client-side" lo stato "commited" della applicazione**.
Nel [lab-pug-03] vediamo diversi metodi per passare dati al processo di *build e pacchettizzazione* che possiamo considerare come forma di SSR ( server sider rendering); 

Notare che quello che proviamo qui è un SSR che avviene una sola volta a tempo di build e non ad ogni chiamata del client verso il server come potrebbe accadere in una applicazione basata su Express o un altro server capace di produrre output dinamico.

### Passaggio di dati per la renderizzazione tramite `HtmlWebpackPlugin` `templateParameters`

osservare in `src/lab-pug-03/webpack.config.js` : 
``` js
      new HtmlWebpackPlugin({
        title: `${exampleId}`,
        template: PATHS.src + '/index.pug',
        inlineSource: '.(js|css)',
        templateParameters: {
          foo: () => 'bar',
          some: 'value'
        }
      })
```
nel `lab-pug-03` si dimostra come i dati passati nel `templateParameters` 
siano disponibili per `index.pug` tramite la variabile `locals`:
``` jade
    h3 locals
    .debug!= JSON.stringify(locals)
```
viene renderizzato come 
``` html
    <h3>locals</h3>
    <div class="debug">{"some":"value"}</div>
```
anche le funzioni definite nei `templateParameters` possono restitituire valori renderizzabili, 
nell'esempio presente in `index.pug` osservare come :
``` jade
    h3 locals.foo()
    .debug!= locals.foo() 
```
venga renderizzato come: 
``` html
    <h3>locals.foo()</h3>
    <div class="debug">bar</div>
```

<|-- 
### interfacciamento a contesti esterni per ..
-->
## debugging del processo di build e paccheticazione ( webpack e relativi loaders e plugins )
vedi la documentazione in [README-trouble.md](../README-trouble.md) per informazioni più complete sul debug.

## caricamento sincrono di dati in pug in fase di impacchettamento ( da parte del webpack e pug-loader )
cit: https://webpack.js.org/configuration/module/#ruleoptions--rulequery
<cite>
Rule.options and Rule.query are shortcuts to Rule.use: [ { options } ]. See Rule.use and UseEntry.options for details.
</cite>

### riferimenti per approfondimenti
- https://stackoverflow.com/questions/47421116/how-to-access-to-globals-in-pug-render

## note relativi ad altri aspetti già trattati in laboratori precedenti:
### ottenere la pagina `index.html` direttamente dall'`index.js` ( senza doverla creare a mano )
grazie al plugin `clean-webpack-plugin` si manteniene pulita la cartella di destinazione degli output della build, questo ci risparmia di doverci ricodare di ripurirla a mano ( o `rm -rf ./dist/<nome-esempio>`) per evitare di lasciare spazzatura relativa a predenti prove. 

### pug 
notare che il `pug-loader` da solo non è sufficiente , occorre anche installare `pug` ( questo viene fatto automaticamente grazie al fatto che entrambi i package sono già compresi nel package.json).

## per eseguire la `build`
nei task configurati in `package.json` sono stati predisposti questi esperimenti:
``` bash
$ npm --ignore-scripts=false run build-lab-pug-sass-01
```

il pacchetto risultante dalla compilazione viene creato nella cartella `dist/lab-pug-sass-01/`
il file `dist/lab-pug-saas-01/index.html`, in questo caso,  può essere aperto anche direttamente dal filesystem,
in alternativa è sempre possibile "servirlo" ed aprirlo come pagina web  ovvero:  
``` bash
python -m SimpleHTTPServer 
```
quindi dal browser o su un altro terminare
``` bash
open http://localhost:8000/dist/lab-pug-03/index.html
```
## per eseguire il debug della  `build`
è stato previsto il task 
``` bash
npm run debug-lab-pug-03
```
vedi la documentazione in [README-trouble.md](../README-trouble.md) per informazioni più complete sul debug.

## altri riferimenti 
- https://webpack.js.org/configuration/output/#outputpublicpath
