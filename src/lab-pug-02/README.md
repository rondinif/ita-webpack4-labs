<!-- 
vedere anche: 
- src/lab-83-pug/README-pug-notes.md
- src/lab-83-pug/README-wds-issue.md
-->
# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-pug-02**: mix asset-management - fonts (lab-03) con gestione dell'output - HtmlWebpackPlugin + CleanWebpackPlugin (lab-08 ) + pug  
utilizzo dei "loaders" per impacchettare risorse (*to bundle assets*) come possono essere i **webfonts**.
+ caricamento **dati json** che in questo usiamo per recuperare lo stato della applicazione.
+ esempio di "architettura uniderezionale" implementata in javascript senza ricorre a specifici  frameworks o toolkits ( Vanilla JS ). 

- nella variante 'lab-pug-02-adv-a' si utilizza anche come nel "lab-10" ovvero si ha un ambiente di sviluppo dove funzionano le `source maps` con `webpack-dev-server`

## guide di riferimento 
- https://webpack.js.org/guides/asset-management/
- https://webpack.js.org/guides/output-management/
- https://webpack.js.org/guides/development/
- https://webpack.js.org/configuration/dev-server/
- https://github.com/pugjs/pug
- https://github.com/pugjs/pug-loader
- https://webpack.js.org/loaders/json-loader/
- https://staltz.com/unidirectional-user-interface-architectures.html

## caricare webfont
i webfont di esempio <!-- possono essere caricati ad esempio da https://github.com/itgalaxy/webfont/tree/master/demo e --> vanno messi nella cartella `fonts`
``` bash
cd <project-home>/src/lab-pug-02/src/fonts
cp -R <your-font/webfont-local-git-clone>/demo/ .
```
<!-- TODO: descrivere ed integrare con @rondinif/phytojs-webfonts -->

## ottenere la pagina `index.html` direttamente dall'`index.js` ( senza doverla creare a mano )
grazie al plugin `clean-webpack-plugin` si manteniene pulita la cartella di destinazione degli output della build, questo ci risparmia di doverci ricodare di ripurirla a mano ( o `rm -rf ./dist/<nome-esempio>`) per evitare di lasciare spazzatura relativa a predenti prove. 

## pug 
notare che il `pug-loader` da solo non è sufficiente , occorre anche installare `pug` ( questo viene fatto automaticamente grazie al fatto che entrambi i package sono già compresi nel package.json) 


## caricare lo stato "commited" della applicazione.
daccordo con [questa risposta non usiamo ](https://stackoverflow.com/a/49373676)
[json-loader](https://webpack.js.org/loaders/json-loader/) non serve.

## SSR vs CSR 
- SSR: server side rendering; nel nostro caso per SSR intendiamo un rendering della pagina che viene eseguito al momento della 'build'; quando esegui la build generi anche il rendering dello stato iniziale della applicazione rappresentato da [commited-state](https://github.com/rondinif/ita-webpack4-labs/blob/master/src/lab-pug-02/src/store/commited-state.pug) 
### vantaggi del SSR 
- immediata disponibilità per qualsiasi tipo di [user agent](https://it.wikipedia.org/wiki/User_agent) 
    - massimizzale prestazioni per *user agent* tipo [browser](https://it.wikipedia.org/wiki/Browser) che potrà subito visualizzare i contenuti all'utente, ancora prima di *rinfrescare* la pagina ed aggiungere dinamicamenti elementi alla pagina tramite script nella fase che qui chiamiamo CSR (*client side rendering*)
    - indispesabile per gli useragent che non eseguono gli script per avere a disposizione il contenuto; aspetto non trascurabile in ambito [SEO ( ottimizzazione per i motori di ricerca )](https://it.wikipedia.org/wiki/Ottimizzazione_per_i_motori_di_ricerca)

provare per credere: 
 ``` bash 
 npm run start-lab-pug-02-adv-a
 curl http://localhost:8080/dist/lab-pug-02-adv-a/index.html
```
notiamo che la risposta contiene la renderezizzazione del **commited-state** ( stato iniziale) come elementi presenti nella pagina *html* quindi assolutamente disponibili per tutti quei casi/tools/etc. che lavorano sui cosidetti "contenuti statici"

### Vantaggi del "Client Side Rendering" 
grazie allo script contenuto nel progetto l'utente può interagire con la pagina e modificare lo stato della applicazione. In questo esempio lo stato non viene *reso perisistente*, cioè resta effimero e vive fintanto che si chiude o ricarica la pagina; 

### Unidirectional user interface architecture
Negli script di questo laboratorio è stata abbozzata una implentazione "vanilla javascript" , molto basic, che si ispira alle architetture all'articolo di [André Staltz: "UNIDIRECTIONAL USER INTERFACE ARCHITECTURES" 22 AUG 2015](https://staltz.com/unidirectional-user-interface-architectures.html)

## per eseguire la `build`
nei task configurati in `package.json` sono stati predisposti questi esperimenti:
``` bash
npm --ignore-scripts=false run build-lab-pug-02
# possono esistere altre variant di qyesto laboratorio, per esempio 
# per la variante 'adv-a' ( production ) utilizzare: 
npm --ignore-scripts=false run build-lab-pug-02-adv-a
# per la variante adv-a ( development watch mode  ) utilizzare: 
npm run start-lab-pug-02-adv-a
```

per i primi due esperimenti ( build-* ) occorre servire in http il progetto e navigare sulla pagina risultante dalla compilazione webpack, ovvero:  
``` bash
python -m SimpleHTTPServer 
```

dal browser o su un altro terminare
``` bash
open http://localhost:8000/dist/lab-pug-02/index.html
```

nel caso di esperimenti che fanno partire il `webpack-dev-server` ( start-* ) occorre aprire il progetto alla pagina `http://localhost:8080/` come viene dichiarato nel sysout prodotto sulla console dallo stesso task.

### cosa osservare
con i **Chrome DevTools** o in altri analoghi modi si possono analizzare i risultati sia per quanto riguarda: 
- la parte **statica** 
    - index.html creato nel pacchetto (in dist) dal **HtmlWebpackPlugin** 
    - html satico generato da **pug** a fronte del caricamento delle templates `.pug` da parte del **pug-loader**
che:
- la parte **dinamica**
    - html dinamico generato dal `index.js`
        - importazione ed uso di funzioni dalla libreria **underscore** ed esecuzione delle stesse dal browser ( *client side* )
        - gestori di eventi javascript ( ad esempio associati alla pressione del pulsante messo in pagina ) 


## vantaggi

## come funziona
vedi anche: 
[README-wds-issue.md](./README-wds-issue.md)

## altri riferimenti 
- https://github.com/webpack/docs/wiki/webpack-dev-server
- https://webpack.js.org/configuration/output/#outputpublicpath
