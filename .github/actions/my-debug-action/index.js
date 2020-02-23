const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  // FR: 

  console.log(`The GITHUB_WORKSPACE: ${process.env['GITHUB_WORKSPACE']}`);

  const dir = fs.opendirSync(process.env['GITHUB_WORKSPACE'])
  let dirent
  while ((dirent = dir.readSync()) !== null) {
    console.log(dirent.name)
  }
  dir.closeSync()

} catch (error) {
  core.setFailed(error.message);
}
