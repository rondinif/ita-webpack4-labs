# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-03**: asset-management - fonts
utilizzo dei "loaders" per impacchettare risorse (*to bundle assets*) come possono essere i **webfonts**.
## guida di riferimento
- https://webpack.js.org/guides/asset-management/

## caricare webfont
i webfont di esempio <!-- possono essere caricati ad esempio da https://github.com/itgalaxy/webfont/tree/master/demo e --> vanno messi nella cartella `fonts`
``` bash
cd <project-home>/src/lab-03/src/fonts
cp -R <your-font/webfont-local-git-clone>/demo/ .
```
<!-- TODO: descrivere ed integrare con @rondinif/phytojs-webfonts -->

## per eseguire la `build`
``` bash
$ npm run build-lab-03
# $ tree -C dist/lab-02
# dist/lab-02
# └── bundle.js
```
<!-- TODO commentare cosa è stato fatto nel:
### `webpack.config.js`
-->

## vantaggi
## come funziona
## altri riferimenti 
