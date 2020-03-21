module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(326);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 190:
/***/ (function() {

eval("require")("@actions/core");


/***/ }),

/***/ 326:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(190);
const github = __webpack_require__(895);
const fs = __webpack_require__(747)

function getStringFromArraByRegex(ar, re) {
  var result = "";
  var index = 0;
  while (index < ar.length) {
    let arRes = re.exec(ar[index])
    if (arRes != null) {
      result = arRes[1];
      break;
    }
    index++;
  }
  return result
}

function getGroupId(ar) {
  let re = /.*group-id: (.*)/gm;
  return getStringFromArraByRegex(ar, re)
}

function getGroupName(ar) {
  let re = /.*group-name: (.*)/gm;
  return getStringFromArraByRegex(ar, re)
}

function getLabId(ar) {
  let re = /.*lab-id: (.*)/gm;
  return getStringFromArraByRegex(ar, re)
}

function getLabName(ar) {
  let re = /.*lab-name: (.*)/gm;
  return getStringFromArraByRegex(ar, re)
}

function getPageTopic(ar) {
  let re = /.*page-topic: (.*)/gm;
  return getStringFromArraByRegex(ar, re)
}

function getPageDescription(ar) {
  let re = /.*page-description: (.*)/gm;
  return getStringFromArraByRegex(ar, re)
}

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

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
  if (github.context.payload.issue.title == 'testing issue') {
    if (github.context.payload.comment.user.login == process.env['INPUT_WHO-TO-GREET']) {
      if (github.context.payload.issue.state == 'open') {
        const body = github.context.payload.comment.body;
        const arBody = body.split("\n");
        console.log(`\n\n\\nTODO: processing the body:\n${JSON.stringify(arBody)}\n\n\n`)

        console.log(`the groupId is: ${getGroupId(arBody)}`);
        console.log(`the labId is: ${getLabId(arBody)}`);
        console.log(`the labName is: ${getLabName(arBody)}`);
        console.log(`the getPageTopic is: ${getPageTopic(arBody)}`);
        console.log(`the getPageDescription is: ${getPageDescription(arBody)}`);

        // the lab in the issue to merge into the committet state
        let rawdata = fs.readFileSync(`${process.env['GITHUB_WORKSPACE']}/src/docs/src/store/commited-state.json`);
        let commited = JSON.parse(rawdata);;
        let nextCommitedState = {
          tag: commited.tag + '.' + github.context.payload.comment.id,
          state: {
            groups: [{
              id: getGroupId(arBody),
              labs: [{
                id: getLabId(arBody),
                name: getLabName(arBody),
                pages: [
                  {
                    topic: getPageTopic(arBody),
                    description: getPageDescription(arBody)
                  }
                ]
              }]
            }]
          }
        }
        commited.state.tag = nextCommitedState.tag;

        let groups = commited.state.groups.filter((g) => g.groupid == getGroupId(arBody));
        if (groups.length > 0) { // edit group
          console.log('##[new-commited-state:[EDIT GROUP]:');
          const groupIndex = findWithAttr(groups, 'groupid', getGroupId(arBody));
          const labs = groups[0].labs.filter((l) => l.id == getLabId(arBody));
          if (labs.length > 0) { // edit lab            
            console.log('##[new-commited-state:[EDIT LAB]:');
            const labIndex = findWithAttr(labs, 'id', getLabId(arBody));
            const pages = labs[0].pages.filter((p) => p.topic == getPageTopic(arBody));
            if (pages.length > 0) { // edit page
              console.log('##[new-commited-state:[EDIT PAGETOPIC]:');
              const pageIndex = findWithAttr(pages, 'topic', getPageTopic(arBody));
              commited.state.groups[groupIndex].labs[labIndex].name = nextCommitedState.state.groups[0].labs[0].name;
              commited.state.groups[groupIndex].labs[labIndex].pages[pageIndex] = nextCommitedState.state.groups[0].labs[0].pages[0];
            }
            else { // new page topic              
              console.log('##[new-commited-state:[ADD PAGETOPIC]:');
              commited.state.groups[groupIndex].labs[labIndex].name = nextCommitedState.state.groups[0].labs[0].name;
              commited.state.groups[groupIndex].labs[labIndex].pages.push(nextCommitedState.state.groups[0].labs[0].pages[0]);
            }
          }
          else { // new lab
            console.log('##[new-commited-state:[ADD LAB]:');
            commited.state.groups[groupIndex].labs.push(nextCommitedState.state.groups[0].labs[0]);
          }
        }
        else { // new group 
          console.log('##[new-commited-state:[ADD GROUP]:');
          commited.state.groups.push(nextCommitedState.state.groups[0].labs[0]);
        }

        console.log('-------------------------------------------------');
        console.log(JSON.stringify(commited));
        console.log('-------------------------------------------------');

        var objStr = JSON.stringify(commited).replace(/\"([^(\")"]+)\":/g, "$1:");
        console.log('-------------------------------------------------');
        console.log('mixin load() \n  - locals.committed = ' + objStr);
        console.log('-------------------------------------------------');


        /* TODO
        scrivere i nuovi file scommites
        */
      }
      else {
        console.log("NOTHING TODO because of the issue is not **open**");
      }
    }
    else {
      console.log("NOTHING TODO because of the issue.user.login is not equal to who to greet");
    }
  }
  else {
    console.log("NOTHING TODO because of this is not a testing issue");
  }



  console.log(`The GITHUB_WORKSPACE: ${process.env['GITHUB_WORKSPACE']}`);
  /*
  const fs = require('fs');
  let rawdata = fs.readFileSync('src/docs/src/store/commited-state.json')
  let commited=JSON.parse(rawdata);
  */

  const dir = fs.opendirSync(process.env['GITHUB_WORKSPACE'])
  let dirent
  while ((dirent = dir.readSync()) !== null) {
    console.log(dirent.name)
  }
  dir.closeSync()

} catch (error) {
  core.setFailed(error.message);
}


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 895:
/***/ (function() {

eval("require")("@actions/github");


/***/ })

/******/ });