# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-01**: dall'`unboundled` al primo pacchetto
elementare esercizio che consiste nell'impacchettare il codice di `lab-01-unboundled` 
## guida di riferimento
- https://webpack.js.org/guides/getting-started/#basic-setup

## per eseguire la `build`
``` bash
npm run build-lab-01
# oppure
npm run build-lab-01-with-npx
```
in questo modo `webpack` viene invocato con lo script `src/lab-01/webpack.config.js` e  provvede alla generazione di `/dist/lab-01/main.js` partendo dalla `entry: './src/lab-01/src/index.js'`

## quali vantaggi otteniamo generando un pacchetto redistribuibile
scaricando le dipendenze direttamente nell'ambiente di sviluppo e traspilando il codice con **webpack** per la build si ottengono diversi vantaggi, tra i quali:  
1. no global scope pollution
2. webpack generate an optimized bundle where scripts will be executed in the correct order
3. module system (import/export) gestito in modo agnostico rispetto al browser che elaborerà la pagina.
