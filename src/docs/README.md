# build and deploy docs from local.dev env
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