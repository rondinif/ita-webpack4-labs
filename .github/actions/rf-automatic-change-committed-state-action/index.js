const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs')

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

function getTest(ar) {
  let re = /.*test: (.*)/gm;
  return getStringFromArraByRegex(ar, re)
}

function getGroupId(ar) {
  let re = /.*group-id: (.*)/gm;
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
  // console.log(`The event payload: ${payload}`); // DEBUG: uncomment this to show the payload
  // FR: 
  if (github.context.payload.issue.title == 'rondinif\'s bot for automatic change of the commited state') {
    if (github.context.payload.comment.user.login == process.env['INPUT_WHO-TO-GREET']) {
      if (github.context.payload.issue.state == 'open') {
        const body = github.context.payload.comment.body;
        const arBody = body.split("\n");
        console.log(`\n\n\\nprocessing the body:\n${JSON.stringify(arBody)}\n\n\n`)

        console.log(`the groupId is: ${getGroupId(arBody)}`);
        console.log(`the labId is: ${getLabId(arBody)}`);
        console.log(`the labName is: ${getLabName(arBody)}`);
        console.log(`the getPageTopic is: ${getPageTopic(arBody)}`);
        console.log(`the getPageDescription is: ${getPageDescription(arBody)}`);

        // the lab in the issue to merge into the committet state
        let rawdata = fs.readFileSync(`${process.env['GITHUB_WORKSPACE']}/src/docs/src/store/commited-state.json`);
        let commited = JSON.parse(rawdata);;

        // check if we have everything we need to proceed
        let ck = Boolean(commited.tag);
        ck = ck && Boolean(getGroupId(arBody));
        ck = ck && Boolean(getLabId(arBody));
        ck = ck && Boolean(getLabName(arBody));
        ck = ck && Boolean(getPageTopic(arBody));
        ck = ck && Boolean(getPageDescription(arBody));

        if (ck) {

          let nextCommitedState = {
            tag: commited.tag + '.' + github.context.payload.comment.id,
            state: {
              groups: [{
                groupid: getGroupId(arBody),
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

          console.log("SEARCHING GROUPS:[")
          console.log(`commited.state.groups: ${JSON.stringify(commited.state.groups)} `);
          console.log(`getGroupId(arBody)...: ${getGroupId(arBody)}`);
          console.log("]")
         
          let groups = commited.state.groups.filter((g) => g.groupid == getGroupId(arBody));
          if (groups.length > 0) { // edit group
            console.log('##[new-commited-state:[EDIT GROUP]:');
            const groupIndex = findWithAttr(commited.state.groups, 'groupid', getGroupId(arBody));

            console.log("SEARCHING LABS:[");
            console.log(`groupIndex.............: ${groupIndex}`);
            console.log(`groups[0].labs: ${JSON.stringify(groups[0].labs)} `);
            console.log(`getLabId(arBody)...: ${getLabId(arBody)}`);
            console.log("]")

            const labs = groups[0].labs.filter((l) => l.id == getLabId(arBody));
            if (labs.length > 0) { // edit lab            
              console.log('##[new-commited-state:[EDIT LAB]:');
              const labIndex = findWithAttr(groups[0].labs, 'id', getLabId(arBody)); 

              console.log("SEARCHING PAGES:[");
              console.log(`labIndex.............: ${labIndex}`);
              console.log(`labs[0].pages: ${JSON.stringify(labs[0].pages)} `);
              console.log(`getPageTopic(arBody)...: ${getPageTopic(arBody)}`);
              console.log("]")
  
              const pages = labs[0].pages.filter((p) => p.topic == getPageTopic(arBody));
              if (pages.length > 0) { // edit page
                console.log('##[new-commited-state:[EDIT PAGETOPIC]:');
                const pageIndex = findWithAttr(pages, 'topic', getPageTopic(arBody));

                console.log(`##[new-commited-state:[EDIT PAGETOPIC] groupIndex:${groupIndex}`);
                console.log(`##[new-commited-state:[EDIT PAGETOPIC] labIndex:${labIndex}`);
                console.log(`##[new-commited-state:[EDIT PAGETOPIC] pageIndex:${pageIndex}`);
                
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
            commited.state.groups.push(nextCommitedState.state.groups[0]);
          }

          console.log('-------------------------------------------------');
          console.log(JSON.stringify(commited));
          console.log('-------------------------------------------------');
          // fs.writeFileSync overwrite the file by default, there is no need for extra checks
          fs.writeFileSync(
              `${process.env['GITHUB_WORKSPACE']}/src/docs/src/store/commited-state.json`,
              JSON.stringify(commited));

          var objStr = JSON.stringify(commited).replace(/\"([^(\")"]+)\":/g, "$1:");
          console.log('-------------------------------------------------');
          console.log(`mixin load() \n  - locals.committed = ${objStr}`);
          console.log('-------------------------------------------------');
          // fs.writeFileSync overwrite the file by default, there is no need for extra checks
          fs.writeFileSync(
            `${process.env['GITHUB_WORKSPACE']}/src/docs/src/store/commited-state.pug`,
            `mixin load() \n  - locals.committed = ${objStr}`);

        }
        else {
          console.log("CHECK-FAILS comment message and commited state validation rules prevents to continue");
        }
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
    console.log("NOTHING TODO because of this is not an issue that concerns the rondinif\'s bot for automatic change of the commited state");
  }



  console.log(`The GITHUB_WORKSPACE: ${process.env['GITHUB_WORKSPACE']}`);
  /*
  const fs = require('fs');
  let rawdata = fs.readFileSync('src/docs/src/store/commited-state.json')
  let commited=JSON.parse(rawdata);
  */

  /* DEBUG: uncomment this to show the list of files in workspace 
  const dir = fs.opendirSync(process.env['GITHUB_WORKSPACE'])
  let dirent
  while ((dirent = dir.readSync()) !== null) {
    console.log(dirent.name)
  }
  dir.closeSync()
  */

} catch (error) {
  core.setFailed(error.message);
}
