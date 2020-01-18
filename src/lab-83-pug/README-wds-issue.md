# se non opportunamente configurato vi sono problemi di percorso (404) quando si accedono le risorse generate dal webpack dalla pagina servita del wds ( webpack-dev-server)

visto che la build ( in modalità "production" ) viene servita da:
    http://localhost:8000/dist/lab-83-pug-adv-a/index.html

per evitare problemi con i percorsi dorante lo sviluppo ( development ), ovvero del funzionamento del "wds"
attivato dal task: `$ npm run start-lab-83-pug-adv-a`, occorre specificare: 

    `publicPath: 'http://localhost:8080/dist/lab-83-pug-adv-a/'`

in [./webpack.config-advanced-a.js](webpack.config-advanced-a.js)
``` js
output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `../../dist/${exampleId}${exampleMutation}`),
    publicPath: '/dist/lab-83-pug-adv-a/'
},  

devServer: {
    contentBase: '.', // `./dist/${exampleId}${exampleMutation}`,
    watchContentBase: true
},
```

in questo modo, per esempio, ci troveremo l'icona servita in: 
http://localhost:8080/dist/lab-83-pug-adv-a/assets/icon.094233f6d5faa321ee2183cc23ad7958.png
anzichè in 
http://localhost:8080/assets/icon.094233f6d5faa321ee2183cc23ad7958.png

e pertanto , con il task con il task `$ npm run start-lab-83-pug-adv-a` , aprendo la pagina 
- [http://localhost:8080/dist/lab-83-pug-adv-a/](http://localhost:8080/dist/lab-83-pug-adv-a/)
avremo lo stesso risultato di :
- [http://localhost:8000/dist/lab-83-pug/](http://localhost:8000/dist/lab-83-pug/)
e , nel caso di build in modalità *production* ( con il task `$ npm run start-lab-83-pug-adv-a` 
- [http://localhost:8000/dist/lab-83-pug-adv-a/](http://localhost:8000/dist/lab-83-pug-adv-a/)

hanno aiutato ad arrivare alla soluzione i messaggi che vengono emessi a console dal wds: 
```
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from http://localhost:8080/dist/lab-83-pug-adv-a/
ℹ ｢wds｣: Content not from webpack is served from .
ℹ ｢wdm｣: Hash: b76089be2316627f6d11
```
