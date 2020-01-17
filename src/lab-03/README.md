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
# $ tree -C dist/lab-03
# dist/lab-03
# ├── a7a36cd3ecf7e5f9aafbfa9b7e3da99c.woff
# ├── assets
# │   └── icon.094233f6d5faa321ee2183cc23ad7958.png
# ├── bundle.js
# └── ef570d8d09eec632f850ab0a0f114eaf.woff2
```

<!-- 
TODO commentare cosa è stato fatto nel:
### `webpack.config.js`
-->

## vantaggi
## come funziona
## altri riferimenti 
