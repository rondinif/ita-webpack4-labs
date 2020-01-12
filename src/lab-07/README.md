# [ita-webpack4-labs](https://github.com/rondinif/ita-webpack4-labs) > **lab-07**: gestione dell'output - HtmlWebpackPlugin

## guida di riferimento
- https://webpack.js.org/guides/output-management/

grazie al plugin `html-webpack-plugin` non serve manuntenere tra i sorgenti una pagina html in cui l'unica cosa che facevamo era "richiamare" i vari asset e bundles generati nella cartella di destinazione (`dist`) nella fase di build; ora tale pagina viene **automaticamente generate**, nel nostro esempio in `../../dist/lab-07/index.html` dal plugin. 
