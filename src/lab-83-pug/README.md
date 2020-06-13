# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-83-pug**: mix asset-management - fonts (lab-03) con gestione dell'output - HtmlWebpackPlugin + CleanWebpackPlugin (lab-08 ) + pug
utilizzo dei "loaders" per impacchettare risorse (*to bundle assets*) come possono essere i **webfonts**.
- nella variante 'lab-83-pug-adv-a' si utilizza anche come nel "lab-10" ovvero si ha un ambiente di sviluppo dove funzionano le `source maps` con `webpack-dev-server`



## guide di riferimento 
- https://webpack.js.org/guides/asset-management/
- https://webpack.js.org/guides/output-management/
- https://webpack.js.org/guides/development/
- https://webpack.js.org/configuration/dev-server/
- https://github.com/pugjs/pug
- https://github.com/pugjs/pug-loader

## caricare webfont
i webfont di esempio <!-- possono essere caricati ad esempio da https://github.com/itgalaxy/webfont/tree/master/demo e --> vanno messi nella cartella `fonts`
``` bash
cd <project-home>/src/lab-83-pug/src/fonts
cp -R <your-font/webfont-local-git-clone>/demo/ .
```
<!-- TODO: descrivere ed integrare con @rondinif/phytojs-webfonts -->

## ottenere la pagina `index.html` direttamente dall'`index.js` ( senza doverla creare a mano )
grazie al plugin `clean-webpack-plugin` si manteniene pulita la cartella di destinazione degli output della build, questo ci risparmia di doverci ricodare di ripurirla a mano ( o `rm -rf ./dist/<nome-esempio>`) per evitare di lasciare spazzatura relativa a predenti prove. 

## pug 
notare che il `pug-loader` da solo non è sufficiente , occorre anche installare `pug` ( questo viene fatto automaticamente grazie al fatto che entrambi i package sono già compresi nel package.json) 


## per eseguire la `build`
nei task configurati in `package.json` sono stati predisposti questi esperimenti:
``` bash
npm --ignore-scripts=false run build-lab-83-pug
# possono esistere altre variant di qyesto laboratorio, per esempio 
# per la variante 'adv-a' ( production ) utilizzare: 
npm --ignore-scripts=false run build-lab-83-pug-adv-a
# per la variante adv-a ( development watch mode  ) utilizzare: 
npm run start-lab-83-pug-adv-a
```

per i primi due esperimenti ( build-* ) occorre servire in http il progetto e navigare sulla pagina risultante dalla compilazione webpack, ovvero:  
``` bash
python -m SimpleHTTPServer 
```

dal browser o su un altro terminare
``` bash
open http://localhost:8000/dist/lab-83-pug/index.html
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
- https://docs.renovatebot.com
- https://webpack.js.org/configuration/output/#outputpublicpath
