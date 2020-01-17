# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-83-pug**: mix asset-management - fonts (lab03) con gestione dell'output - HtmlWebpackPlugin + CleanWebpackPlugin (lab08 ) + pug
utilizzo dei "loaders" per impacchettare risorse (*to bundle assets*) come possono essere i **webfonts**.
## guida di riferimento
- https://webpack.js.org/guides/asset-management/
- https://webpack.js.org/guides/output-management/

## caricare webfont
i webfont di esempio <!-- possono essere caricati ad esempio da https://github.com/itgalaxy/webfont/tree/master/demo e --> vanno messi nella cartella `fonts`
``` bash
cd <project-home>/src/lab-03/src/fonts
cp -R <your-font/webfont-local-git-clone>/demo/ .
```
<!-- TODO: descrivere ed integrare con @rondinif/phytojs-webfonts -->

## ottenere la pagina `index.html` direttamente dall'`index.js` ( senza doverla creare a mano )
grazie al plugin `clean-webpack-plugin` si manteniene pulita la cartella di destinazione degli output della build, questo ci risparmia di doverci ricodare di ripurirla a mano ( o `rm -rf ./dist/<nome-esempio>`) per evitare di lasciare spazzatura relativa a predenti prove. 

## pug 
notare che il `pug-loader` da solo non è sufficiente , occorre anche installare `pug` ( questo viene fatto automaticamente grazie al fatto che entrambi i package sono già compresi nel package.json) 


## per eseguire la `build`
``` bash
$ npm run build-lab-83-pug

## vantaggi
## come funziona
## altri riferimenti 
