# [ita-webpack4-labs](../..) > **lab-02**: asset-management
utilizzo dei "loaders" per impacchettare risorse (to bundle assets) come stili css e immagini png, icone etc.

## guida di riferimento
- https://webpack.js.org/guides/asset-management/
- https://webpack.js.org/guides/getting-started/#basic-setup
## per eseguire la `build`
### variante `url-loader.webpack.config.js`
``` bash
$ npm run build-lab-02a
# $ tree -C dist/lab-02a
# dist/lab-02a
# └── bundle.js
```
### variante `file-loader-1.webpack.config.js`
``` bash
$ npm run build-lab-02b
# $ tree -C dist/lab-02b
# dist/lab-02b
# ├── bundle.js
# └── images
#    └── icon.png
```
### variante `file-loader-2.webpack.config.js`
``` bash
$ npm run build-lab-02c
# $ tree -C dist/lab-02c
# dist/lab-02c
# ├── assets
# │   └── icon.f1fbe1fbbab2d9141eed527cf3ee03ea.png
# └── bundle.js
```

## vantaggi
- webpack will dynamically bundle all dependencies (creating what's known as a dependency graph)
    - **explicit dependencies**: every module now explicitly states its dependencies and we'll avoid bundling modules that aren't in use.
    - you can also include any other type of file, besides JavaScript, for which there is a **loader**
## come funziona
- webpack uses a regular expression to determine which files it should look for and serve to a specific loader. In this case, any file that ends with .css will be served to the style-loader and the css-loader
- when that module is run, a <style> tag with the stringified css will be inserted into the <head> of your html file
- Using the `file-loader` we can easily incorporate those in our system images a
like backgrounds and icons :
- when you `import MyImage from './my-image.png'`, that image will be processed and added to your output directory and the `MyImage` variable will contain the final `url` of that image after processing

## riferimenti 
- https://github.com/webpack-contrib/file-loader