# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-10**: ambiente di sviluppo - `source maps` con `webpack-dev-server`

## guida di riferimento
- https://webpack.js.org/guides/development/


## come eseguire gli esperimemnti presenti in questo laboratorio
Proviamo il `webpack-dev-server` con le "source-maps"
eseguire: 
``` bash 
$ npm run start-lab-10
```
webpack-dev-server parte in ascolto sulla porta 8080 per cui occorre che questa porta sia disponibile per avviare questo processo;


## vantaggi
si possono modificare i sorgenti ( es: il file `./src/lab-10/src/print.js`) e vedere che quando si salva il file viene automaticamente ricompilato il progetto e servito il nuovo bundle all'indirizzo `http://localhost:8080` aprendo questa URL con i Chrome dev tools ( cmd-alt-i (mac) o F12 (windows) si possono aprire i sorgenti e posiizinare breackpoints ed effettuare il debug direttamente in chrome. 

Gli strumenti di sviluppo di Chrome [chrome-devtools](https://developers.google.com/web/tools/chrome-devtools)supportano le `source maps`, che consentono di eseguire il debug del codice JavaScript traspilato come linguaggio sorgente originale. Questo vale per  TypeScript, CoffeeScript, ClojureScript o ECMAScript 6. Le `source maps` sono particolarmente utili perché è possibile posizionare punti di interruzione ( breakpoints ) , scorrere ed eseguire il debug dei sorgenti originali ( azichè dover andare sul trspilato che è piuttosto incomprensibile per il programmatore medio ). Assicurati di abilitare le `source maps` JavaScript e CSS selezionando l'opzione all'interno delle impostazioni dei chrome-devtools ( NB: non trovi queste opzioni tra i settings id chrome ma devi prima aprire i devtools ( cmd-alt-i o F12) e poi aprire i suoi settings )
![debugging](./schermate/lab-11-b.png)

## note
notare che gli esperimenti qui definiti **non** vengono eseguiti dal *task* generale di build: `npm --ignore-scripts=false run build` ma occorre eseguire il *task* specifico `npm run start-lab-10`

## per approfondimenti
- https://webpack.js.org/configuration/dev-server/
- https://webpack.js.org/configuration/devtool