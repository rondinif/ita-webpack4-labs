console.log('this trace run on the browser by src/lab-pug-03/src/index-debug.js');
if (process.env.NODE_ENV !== 'production') {
    console.log(`Running in the "${process.env.NODE_ENV}" mode.`);
  }
else {
    console.log('We are in production!');
}
console.log(`process.env:\n${JSON.stringify(process.env)}`);