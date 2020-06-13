# Perchè questo progetto richiede di installare un tot di dipendenze

Nel corso dello sviluppo dei *laboratori* contenuti in questo repo 
si è reso necessario installare diversi pacchetti ( "dipendenze" del progetto ), come ad esempio:
``` bash 
npm install --save lodash
npm install --save-dev style-loader css-loader
npm install --save-dev url--loader
npm install --save-dev url-loader
npm install --save-dev dotenv-flow-webpack 
npm install --save-dev xml-loader
npm install --save-dev csv-loader
npm install --save-dev html-webpack-plugin
npm install --save-dev webpack-dev-server
npm install --save-dev express webpack-dev-middleware
npm install --save-dev express webpack-dev-middleware
npm install --save-dev dotenv-flow-webpack
# lista non esaustiva ottenuta con: 
# history | grep 'npm install'

# additional modules installed with ignore-scrips=true configuration
npm --ignore-scrips=false install sass-loader node-sass --save-dev
node node_modules/node-sass/scripts/install.js 
# Downloading binary from https://github.com/sass/node-sass/releases/download/v4.14.1/darwin-x64-72_binding.node
# Download complete
# Binary saved to ~/projects/rondinif/ita-webpack4-labs/node_modules/node-sass/vendor/darwin-x64-72/binding.node
```
quando il progetto viene scaricato sull'ambiente di sviluppo ( o di build ), 
ad esempio clonand il repo con `git clone 
Le dipendenze necessarie per *tutti i laboratori* sono riportate nel `package.json` e vengono quindi installate con un unico comando:  `npm i`

Dato che lo scopo del progetto `ita-webpack4-labs` è permetterci di imparare e conoscere **webpack4** è bene sapere esattamente quando questi pacchetti vengono effitavente usati e a cosa servono; in tal modo se vogiamo riprendere uno specifico *laboratorio* e da li iniziare un nuovo progetto ( usando il *laboratorio* come *"boilerplate"*) possiamo sapere cosa possiamo eliminare dal `package.json` nel nuovo progetto senza timore di problemi.

Anche nel caso preferissimo partire puliti (*from scratch*), seguendo la strada dello [scaffolding](https://webpack.js.org/guides/scaffolding/) ( per esempio con: `webpack-cli init <your-scaffold>` ) questo doc. sarà utile per avere una idea più chiara di quali pacchetti (dipendenze) dobbiamo installare per avere a disposizione funzionalità anaoghe a quelle trattate nei diversi *laboratori*.

Per uleriori informazioni leggere anche il README.md contenuto nella cartella dello specifico *lab* e 

## devdepencies 
<!-- WEBPACK  -->
###    "webpack": "^4.41.4",
###    "webpack-cli": "^3.3.10",
- lab-01
- lab-02
- lab-03
- lab-04
- lab-05
- lab-06
- lab-07
- lab-08
- lab-09
- lab-10
- lab-11
- lab-83
- lab-83-pug 
- lab-pug-01
- lab-pug-02
- lab-pug-03

<!-- LOADERS -->

###     "css-loader": "^3.4.0",
- lab-02
- lab-03
- lab-04
- lab-83
- lab-83-pug 
- lab-pug-01
- lab-pug-02
- lab-pug-sass-01

###     "style-loader": "^1.1.2",
- lab-02
- lab-03
- lab-04
- lab-83
- lab-83-pug 
- lab-pug-01
- lab-pug-02
- lab-pug-sass-01

###     "file-loader": "^5.0.2",
- lab-02
- lab-03
file loader viene utilizizzato per caricare nel pacchetto ( dist ) files binari quali ad esempio i fonts o le immagini referenziate nei css
- lab-04
- lab-83
- lab-83-pug 
- lab-pug-01
- lab-pug-02

###    "csv-loader": "^3.0.2",
- lab-04 ( in realtà non è stato utilizzato )
###    "xml-loader": "^1.2.1"
- lab-04 
utilizzato per caricare i dati da xml e loggarli sulla console

###  /*  "json-loader": "^0.5.7" - NON SERVE*/
NB: con webpack4 non serve il `json-loader` per caricare files json, 
se stai cercando esercitazioni nelle quali venga caricato json a *build-time* puoi fare riferimento ai labs:
- lab-pug-01
- lab-pug-02
- lab-pug-03 

###    "apply-loader": "^2.0.0",
<!-- PUG / JADE -->
### "pug-loader": "^2.4.0" + "pug": "^2.0.4",
- lab-83-pug 
- lab-pug-01
- lab-pug-02
- lab-pug-03

<!-- SASS SCSS -->
### sass-loader": "^8.0.2", 
- lab-pug-sass-01

### "node-sass": "^4.14.1",

- lab-pug-sass-01

<!-- PLUGINS -->
### "html-webpack-plugin": "^3.2.0",
- lab-07
- lab-08
- lab-09
- lab-10
- lab-83
- lab-83-pug 
- lab-pug-01
- lab-pug-02

### "clean-webpack-plugin": "^3.0.0",
- lab-08
- lab-09
- lab-10
- lab-83
- lab-83-pug 
- lab-pug-01
- lab-pug-02
- lab-pug-03

### dotenv-flow-webpack: "^1.0.0",
- lab-pug-03

<!-- DEVTOOLS -->
### "webpack-dev-server": "^3.10.1",
- lab-10
- lab-83-pug 
- lab-pug-01 (-adv-a)
- lab-pug-02 (-adv-a)

### "webpack-dev-middleware": "^3.7.2",
- lab-11

### "express": "^4.17.1",
- lab-11

<!-- ----[ APPLICATION DEPENDECIES ] ------- -->
## dependencies
###    "lodash": "^4.17.15" 
- lab-01
- lab-02
- lab-03
- lab-04
- lab-05
- lab-83
- lab-83-pug 
- lab-pug-01
<!-- - lab-pug-02  ?? controllare -->







<!--
20200612 - temporaneamente sospeso perchè npm audit riportava vulnerabilità in una delle sue dipendenze

## altre dev-dependencies
###    "commitlint": "^8.2.0",
migliora i processi di *ci/cd* mantenendo uniforme lo stile dei messaggi di commit, vedi anche 
- [husky - git hooks made easy ](https://github.com/typicode/husky) 
- [commitlint -  lint commit messages ](https://github.com/conventional-changelog/commitlint) 
- [slides circa i vantaggi di usare *convenzioni* anche per i messaggi di commit - by Mario Nebl](https://slides.com/marionebl/the-perks-of-committing-with-conventions#/10)
-->