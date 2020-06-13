# docs 
La [web-page del progetto](https://rondinif.github.io/ita-webpack4-labs/) non 
richiede la gestione di uno specifico server web in quanto è una [GitHub Page](https://pages.github.com)

La [web-page del progetto](https://rondinif.github.io/ita-webpack4-labs/) 
comprende una parte statica generata al momento della build
del codice sorgente presente in questa cartella.

Il prodotto della esecuzione dello script `build-docs` 
è una web-page **pre-rendirizzata** compilata nella cartella target `docs`
che è la cartella pubblicata da [GitHub Pages](https://pages.github.com)

# build and deploy docs degli sviluppi locali 
per la complazione e la pubblicazione dei docs da ambiente di sviluppo locale
```
git checkout docs
npm --ignore-scripts=false run build-docs
git add * 
git commit -m "docs(update): there are news"  
git push origin docs:docs
```
quindi creare la PR in modo che la documentazione venga mergiata a master
requisito necessario per vederne la pubblicazione

## verica ed approvazione e pubblicare modifica autogenerate dal bot di elaborazione dei commenti alla issue
i commenti aggiunti alla issue [rondinif's bot for automatic change of the commited state](https://github.com/rondinif/ita-webpack4-labs/issues/18) 
vengono automaticamente elaborate dalla action [rondinif/ita-webpack4-labs/.github/actions/rf-automatic-change-committed-state-action](./.github/actions/rf-automatic-change-committed-state-action/index.js)

il codice che è stato incluso nella action riceve nell'evento il commento inserito o modificato 
e se tale commento può servire per  creare automaticamente un aggiornamento allo stato della applicazione. In tal caso il messaggio viene trasformato in un oggetto js che viene fuso (merged) 
con il commited state corrente ( committato nel git-repo ) , le 
modifiche automatiche allo stato committato vengono apportate a entrambe i files: 
- [src/docs/src/store/commited-state.json](https://github.com/rondinif/ita-webpack4-labs/blob/docs/src/docs/src/store/commited-state.json)
- [src/docs/src/store/commited-state.pug](https://github.com/rondinif/ita-webpack4-labs/blob/docs/src/docs/src/store/commited-state.pug)

l'automazione prosegue come definito in [issues.yml](./.github/workflows/issues.yml) 
con la `git commit` e `git push` delle mofiche restituendo il controllo 
del flusso di lavoro all'owner del repository 
in quanto si vuole poter verificare ad uno sviluppatore la modifica automatica fatta dal bot;

la *verifica* permette di prenderne visione ed eventualmente intervenire
manualmente prima che il *'change'* venga reso publico sulla [nella web-page del progetto](https://rondinif.github.io/ita-webpack4-labs/); tutte le operazioni qui descritte possono 
effetuate da `cli` ( riga di comando ) o con strumenti adatti allo sviluppo (ide: per esempio vs-code )

### vedifica correttezza e presa visione delle modifiche
``` sh
git log
cat src/docs/src/store/commited-state.json | jq
cat src/docs/src/store/commited-state.pug
```
### ssr build + commit push
``` sh
# ssr of the templage - build docs
npm --ignore-scripts=false run build-docs
# preview the generated web-app
opne ./docs/index.html

# commit and push changes
git add * 
git commit -m "docs(update): confirm auto generated change"  
git push origin docs:docs
```

### create pull request
a questo punto il flusso di lavoro per la pubblicazione dei cambiamenti 
alla [web-page del progetto](https://rondinif.github.io/ita-webpack4-labs/) è 
lo stesso sia per gli inteventi di change fatti munalmente seguendo il classico ciclo di sviluppo 
sia per gli interventi di change assistiti dal bot e preveder che venga fatta una PR 
da docs per il merge sul master. le impostazioni delle gh-pages sono tali per 
cui una volta modificata la cartella `docs` sulla `master` branch venga 
pubblicata la [web-page del progetto](https://rondinif.github.io/ita-webpack4-labs/)
aggiornata.   
