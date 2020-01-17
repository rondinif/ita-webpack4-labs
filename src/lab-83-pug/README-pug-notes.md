# come funziona pug-loader ?
scopriamo cosa succede forzando un errore:
cosideriamo che `pug` non sia ancora stato installato:
```
ita-webpack4-labs (feat-pug-with-webfont)*$ npx webpack --config src/lab-83-pug/webpack.config.js --mode=development
~/projects/rondinif/ita-webpack4-labs/src/lab-83-pug/src
~/projects/rondinif/ita-webpack4-labs/src/lab-83-pug/dist
Hash: f8c5a923f52721c179bc
Version: webpack 4.41.5
Time: 476ms
Built at: 01/17/2020 1:29:58 AM
                                                                 Asset      Size  Chunks             Chunk Names
           ../../dist/lab-83-pug/a7a36cd3ecf7e5f9aafbfa9b7e3da99c.woff  14.4 KiB          [emitted]  
../../dist/lab-83-pug/assets/icon.094233f6d5faa321ee2183cc23ad7958.png  6.77 KiB          [emitted]  
          ../../dist/lab-83-pug/ef570d8d09eec632f850ab0a0f114eaf.woff2  12.4 KiB          [emitted]  
                                                            index.html  4.65 KiB          [emitted]  
                                                        main.bundle.js   570 KiB    main  [emitted]  main
Entrypoint main = main.bundle.js
[./node_modules/css-loader/dist/cjs.js!./src/lab-83-pug/src/style.css] 2.05 KiB {main} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {main} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {main} [built]
[./src/lab-83-pug/src/fonts/webfont.woff] 103 bytes {main} [built]
[./src/lab-83-pug/src/fonts/webfont.woff2] 104 bytes {main} [built]
[./src/lab-83-pug/src/images/icon.png] 114 bytes {main} [built]
[./src/lab-83-pug/src/index.js] 1.23 KiB {main} [built]
[./src/lab-83-pug/src/style.css] 584 bytes {main} [built]
    + 4 hidden modules

ERROR in   Error: Child compilation failed:
  Module build failed (from ./node_modules/pug-loader/index.js):
  Error: Cannot find module 'pug'
  Require stack:
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/pug-loader/index.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/loader-runner/lib/loadLoader.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/loader-runner/lib/LoaderRunner.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/NormalModule.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/NormalModuleFactory.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/Compiler.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/webpack.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/utils/validate-options.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/utils/convert-argv.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/cli.js
  - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/bin/webpack.js
  
  - loader.js:966 Function.Module._resolveFilename
    internal/modules/cjs/loader.js:966:17
  
  - v8-compile-cache.js:166 Function.resolve
    [ita-webpack4-labs]/[v8-compile-cache]/v8-compile-cache.js:166:23
  
  
  - Error: Cannot find module 'pug'
  
  - Require stack:
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/pug-loader/index.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/loader-runner/lib/loadLoader.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/loader-runner/lib/LoaderRunner.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/NormalModule.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/NormalModuleFactory.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/Compiler.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/webpack.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/utils/validate-options.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/utils/convert-argv.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/cli.js
  
  - - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/bin/webpack.js
  
  - compiler.js:79 
    [ita-webpack4-labs]/[html-webpack-plugin]/lib/compiler.js:79:16
  
  - Compiler.js:343 
    [ita-webpack4-labs]/[webpack]/lib/Compiler.js:343:11
  
  - Compiler.js:681 
    [ita-webpack4-labs]/[webpack]/lib/Compiler.js:681:15
  
  
  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [ita-webpack4-labs]/[tapable]/lib/Hook.js:154:20
  
  - Compiler.js:678 
    [ita-webpack4-labs]/[webpack]/lib/Compiler.js:678:31
  
  
  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [ita-webpack4-labs]/[tapable]/lib/Hook.js:154:20
  
  - Compilation.js:1423 
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1423:35
  
  
  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [ita-webpack4-labs]/[tapable]/lib/Hook.js:154:20
  
  - Compilation.js:1414 
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1414:32
  
  
  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [ita-webpack4-labs]/[tapable]/lib/Hook.js:154:20
  
  - Compilation.js:1409 
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1409:36
  
  
  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [ita-webpack4-labs]/[tapable]/lib/Hook.js:154:20
  
  - Compilation.js:1405 
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1405:32
  
  
  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [ita-webpack4-labs]/[tapable]/lib/Hook.js:154:20
  
  - Compilation.js:1342 Compilation.seal
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1342:27
  
  - Compiler.js:675 
    [ita-webpack4-labs]/[webpack]/lib/Compiler.js:675:18
  
  - Compilation.js:1261 
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1261:4
  
  
  - Hook.js:154 AsyncSeriesHook.lazyCompileHook
    [ita-webpack4-labs]/[tapable]/lib/Hook.js:154:20
  
  - Compilation.js:1253 Compilation.finish
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1253:28
  
  - Compiler.js:672 
    [ita-webpack4-labs]/[webpack]/lib/Compiler.js:672:17
  
  
  - Compilation.js:1185 
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1185:12
  
  - Compilation.js:1097 
    [ita-webpack4-labs]/[webpack]/lib/Compilation.js:1097:9
  

Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [./node_modules/html-webpack-plugin/lib/loader.js!./src/lab-83-pug/src/views/index.pug] 1.47 KiB {0} [built] [failed] [1 error]
    
    ERROR in ./src/lab-83-pug/src/views/index.pug (./node_modules/html-webpack-plugin/lib/loader.js!./src/lab-83-pug/src/views/index.pug)
    Module build failed (from ./node_modules/pug-loader/index.js):
    Error: Cannot find module 'pug'
    Require stack:
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/pug-loader/index.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/loader-runner/lib/loadLoader.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/loader-runner/lib/LoaderRunner.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/NormalModule.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/NormalModuleFactory.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/Compiler.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/lib/webpack.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/utils/validate-options.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/utils/convert-argv.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack-cli/bin/cli.js
    - ~/projects/rondinif/ita-webpack4-labs/node_modules/webpack/bin/webpack.js
        at Function.Module._resolveFilename (internal/modules/cjs/loader.js:966:17)
        at Function.resolve (~/projects/rondinif/ita-webpack4-labs/node_modules/v8-compile-cache/v8-compile-cache.js:166:23)
        at Object.module.exports (~/projects/rondinif/ita-webpack4-labs/node_modules/pug-loader/index.js:11:28)
```
