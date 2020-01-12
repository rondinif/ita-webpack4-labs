# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-06**: gestione dell'output - endpoint multipli

## guida di riferimento
- https://webpack.js.org/guides/output-management/

in questo esempio vediamo come sua possibile specificare più di un `entrypoint` , cioè più di un file JS da compilare, e di fare generare a `webpack` altrettanti pacchetti (bundles). 

l'esempio dimostra che questa operazione richiede una modifica manuale al file `index.html` che potrebbe diventare una attività onerosa da gestire in prospettiva di un aumeto di funzionalità e di complessita del progetto per cui gli assets e i bundles generati aumenterebbero di numero.