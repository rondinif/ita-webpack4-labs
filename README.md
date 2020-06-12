<!-- 
ita-webpack4-labs 
webpack4 learning studies and experiments with accompanying notes in Italian
-->
# ita-webpack4-labs
![Node CI](https://github.com/rondinif/ita-webpack4-labs/workflows/Node%20CI/badge.svg?branch=master)
<!-- Learning labs  with accompanying notes in Italian to dive into webpack4 eco-system -->
Raccolta di laboratori per imparare e sperimemintare l'utilizzo di **webpack 4**, descritti e commentati in italiano.

Ogni labotatorio nasce per comprendere come sfruttare le potenzialità , talvota nascoste, che si possono avere impostando correttamente la fase di `build` di un **website** o di una **web app** o di una **desktop app** ( *electron*) ed è mirato a pochi specifici aspetti, quindi è ideale come base di partenza per esperimenti più complessi.

<!--
## perchè 
[##TODO] descrivere qui perchè è stato creato e pubblicato questo repo.

## come
[##TODO] descrivere qui come è strutturato questo progetto e come è possibile utilizzarlo per provare e comprendere meglio il funzionamento e le potenzialità di webpack relativamente agli argomenti trattati.

in particolare spiegare la gestione delle dipendenze che non viene fatta per ogni singolo 
laboratorio come si trattasse di sub-module ma viene fatta globalmente in quanto 
questo è un unico progetto strutturato in diversi laboratori 
-->

## note comuni per tutti i laboratori
Come indice per accedere ai risultati generati nei diversi laboratori è stata predisposta la pagina 
`index.html` nella `<project-home>` (cartella home in cui è presente il clone del progetto). 

in qualche modo modo occorre "servirla" ed "aprirla",
per esempio:
``` bash 
$ cd <project-home>
$ python -m SimpleHTTPServer
$ open localhost:8000
```

### aggiunta di nuovi esperimenti
Vediamo come si procede per creare , compilare e provare e documentare un nuovo esempio...

1. scarica i sorgenti con il comando: `git clone https://github.com/rondinif/ita-webpack4-labs.git` 
2. entra nella cartella del progetto: `cd ita-webpack4-labs` 
3. apri con l'editor o la tua IDE preferita; per esempio:  `code .`
4. installa le dipendenze e prendi confidenza con questo progetto: 
    - la cartella `./dist` ancora non esiste oppure è vuota

`./dist` è la cartella di destinazione dei **pacchetti** che generiamo in fase di **build** pertanto  è intenzionalmente voluto che essa inizialmente non esista ( o possa essere vuota ), notare che la cartella `./dist` è stata esclusa dai files tracciati dal versionamento dei sorgenti fatto da **git** ( controlla nel contenuto del file `.gitignore`). 

Il contenuto della `./dist` viene **generato** durante la fase di build.

Prima di eseguire la "build"  dobbamo avere installato le dipendenze con i comandi `yarn` oppure `npm install`. 

A seconda delle tue preferenze puoi scegliere tra **yarn**  o **npm**  ma in seguito dovrai continuare ad usare sempre lo stesso per questo progetto; solo a titolo informativo si rende noto che la creazione di questo progetto è stata originariamente realizzata con `npm versione 6.13.0`. 

Come probabilmente già saprai l'operazione di installazione delle dipenze provvede alla creazione e popolamento della cartella `./node_modules` , la quale,  coma la `./dist`,  viene  esclusa dal git nel `.gitignore` e in ogni momento può essere rimossa integralmente `rm -rf ./node_modules` e rigenerata reinstallando le dipendenze. 

Gli esempi contenuti in diversi laboratori ( quasi tutti ad esclusione di alcuni ) possono essere `build`ati massimamente con un unico *task*: 
 `pm --ignore-scripts=false run build` 
In alternativa potrebbe essere preferibile compilare solo quelli che interessano o che si intende provare ed approfondire, per fare questo usare un comando del tipo: `npm run <build-nome-esempio>`
 , per esempio: 
  `pm --ignore-scripts=false run build-lab-07` 

Questo compilerà solo l'esempio contenuto nel laboratorio sette, il cui risultato consiste nell'impacchettare ( creare i bundles ) in `./dist/lab-07` che , in questo caso, comprende una pagina html autogenerata dal plugin `html-webpack-plugin` e il bundles compilati dal `webpack` partendo dal sorgete Javascrit presente in un paio di files nella cartell `.src/lab-07`

E' stato previsto in file `./index.html` che può essere considerato l'indice di tutti gli esempi e serve per `navigare` i vari output generati dalla build , ovvero vedere l'output della build eseguito sul runtime del tuo web-browser.

Alcuni esperimenti ad esempio quelli della lab-10 e guida-11 richiedo passaggi specifici, entrando nella sottocartella relativa all'esperimento, per esempio: `src/lab-10` troverai adeguate istruzioni nella guida specifica: `src/lab-10/README-lab-10.md`

## cosa contengono i vari laboratori
Vediamo quali esperimenti possiamo condurre nei laboratori inclusi in questo repo:

### primi passi
`lab-01-ounbouldled` rappresenta un punto base di partenza "vanilla" ,ancora non  impacchettato, ( buldled ) dal webpack. Nella `lab-01` ripartiamo dallo stesso punto di partenza ed impariamo ad impacchettarlo.

### gestione degli asset 
Sperimentiamo la gestione degli `asset` associati ai `compoments` che potremo sviluppare.

Si usa la parola `component` quando si parla di  `views`, `templates`, `modules`, etc.

Con la parola `asset` si intendono `css`, `images`, `fonts` o anche file di dati che possiamo decidere se associare ai `components` o considerare globali per tutto il progetto.

i laboratori compresi tra `lab-02` e `lab-05` si inspirano al capitolo [asset-management](https://webpack.js.org/guides/asset-management/) della guida ufficiale.

### gestione dell'output , cioè dei pacchetti generati dal webpack in base alla sua configurazione 
i laboratori [`lab-06`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-06), [`lab-07`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-07) e [`lab-08`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-08) ontengono esempi che si inspirano al capitolo [output-management](https://webpack.js.org/guides/output-management/) della guida ufficiale.

### ambiente di sviluppo , "source maps", "development tools", "watch mode", etc..
i laboratori [`lab-09`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-09), [`lab-10`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-10) e [`lab-11`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-11) contengono esempi che si inspirano al capitolo [development](https://webpack.js.org/guides/development/) della guida ufficiale.

### mix di laboratori base e *templating* con **pug**
-  [`lab-83-pug`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-83-pug)
-  [`lab-pug-01`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-pug-01),
-  [`lab-pug-02`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-pug-02),
-  [`lab-pug-03`](https://github.com/rondinif/ita-webpack4-labs/tree/master/src/lab-pug-03),

## Contributing 
Le tue idee sono importanti, non perdere l'occasione per fornire il tuo speciale contributo a questo repo.  

Simply [we encourage contributions from everyone](https://github.com/rondinif/ita-webpack4-labs/blob/master/.github/CONTRIBUTING.md) , especially you.

## Licence 
MIT
