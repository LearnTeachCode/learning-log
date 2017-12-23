console.log("Yay, script.js has loaded!");


/* ------------------------------------------------------------
  LOCAL STATE:
-------------------------------------------------------------- */
const templateRepoName = 'learning-log-template';

// ***********   TEMPORARY DISABLE FOR DEVELOPMENT/TESTING:  *************
// let githubAccessToken, userData, userRepo;
let githubAccessToken;
let userData = {name: null, photo: null};
let userRepo = {name: templateRepoName, url: 'https://github.com/LearningNerd/' + templateRepoName};


/* -------------------------------------------------
  LIST OF DYNAMIC ELEMENTS (by HTML id):
  - loginmodal      container for login screen
  - modal-content   container main content inside modal
  - loginloading    loading message inside modal
  - loginlink       link for GitHub login, using for event listener to update UI

  - maincontent     container for all content after logging in
  - write           container for instructions and form
  - username        user name <h2> with welcome message
  - useravatar      user avatar <img>
  - userrepo        link to user's learning log GitHub repo

  - published       container for info on published log
  - logtitle        title of learning log entry
  - viewlog         link to view log on GitHub
  - editlog         link to EDIT log on GitHub

  - log-content     textarea containing user's learning log
  - logform         form element for the learning log

---------------------------------------------------- */
let loginModalView = document.getElementById('loginmodal');
let loginModalContentView = document.getElementById('modal-content');
let loginLoadingView = document.getElementById('loginloading');
let loginLinkView = document.getElementById('loginlink');

let mainContentView = document.getElementById('maincontent');
let writeView = document.getElementById('write');
let userNameView = document.getElementById('username');
let userAvatarView = document.getElementById('useravatar');
let userRepoView = document.getElementById('userrepo');

let publishedView = document.getElementById('published');
let logTitleView = document.getElementById('logtitle');
let viewLogView = document.getElementById('viewlog');
let editLogView = document.getElementById('editlog');

let logContentView = document.getElementById('log-content');
let logFormView = document.getElementById('logform');

/* -------------------------------------------------
  GITHUB AUTHENTICATION 
---------------------------------------------------- */

// Get temp code from the URL
let tempCode = getTempCode();

console.log("Just got tempCode: " + tempCode);

// If GitHub tempcode already exists (which means user has started the login process),
if ( tempCode ) {
  
  // Update UI: show loading message and hide other modal content    
  loginModalContentView.style.display = "none";
  loginLoadingView.style.display = "block";

  // Remove parameter from URL, updating this entry in the client's browser history (for cleaner history)
  history.replaceState(null, '', '/');

  console.log("Just updated browser history to remove temp code parameter from URL.");

  // Authenticate + log in with GitHub + set up reop
  loginAndInitialize(tempCode);

}
/* ------------------------------------------------- */


// When user clicks the login link, show loading message, in case of slow internet!
loginLinkView.addEventListener('click', function() {
  // TODO: is there a better event than 'click', for better accesibility when activating links??

  // Update UI: show loading message and hide other modal content
  loginModalContentView.style.display = "none";
  loginLoadingView.style.display = "block";
});



// Authenticate and log in with GitHub
async function loginAndInitialize (tempCode) {

  console.log('loginAndInitialize() was just called!');

  try {

    // Exchange temp code for access token from Gatekeeper and save it locally:
    let gateKeeperResponse = await getJSON('https://learning-log-gatekeeper.herokuapp.com/authenticate/' + tempCode);
    githubAccessToken = gateKeeperResponse.token;
    console.log("access token from Gatekeeper:" + githubAccessToken);

    // Get GitHub user data:    
    let userResponse = await requestWithGitHubToken('GET', 'https://api.github.com/user');
    console.log('**************** Logged in! GitHub User Data: *********************');
    console.log(userResponse);

    // Save local state:
    userData = {name: userResponse.login, photo: userResponse.avatar_url};


/* ************************    TEMPORARILY DISABLE FOR DEVELOPMENT/TESTING!!!!!  ******************************************

    // ********   TODO / POSSIBLE BUG: Can forking support renamed repos???  ***********

    // Fork the template repo
    let forkRepoResponse = await requestWithGitHubToken('POST', 'https://api.github.com/repos/' + userData.login + '/' + templateRepoName + '/forks', null);
    userRepo = {name: forkRepoResponse.name, url: forkRepoResponse.html_url}

    console.log('**************** Repo fork request completed! Reponse: *********************');
    console.log(forkRepoResponse);

*/

    // Update UI: show user name, avatar, GitHub repo info, and form
    updateLoggedInView(userData.name, userData.photo, userRepo.url);

  } catch (err) {

    handleError("Error during GitHub login and project setup: " + err);
    return; // STOP EVERYTHING!     

  } // end of catch block

} // end of loginAndInitialize()


// On form submission, handle publishing user data and updating UI
function publishLog(event) {

  // Prevent browser's default behavior and *don't* refresh the page on form submission
  event.preventDefault();

  // Create new file in user's GitHub repo
  createFile(logContentView.textContent);

}


async function createFile(entryContent) {

  // TODO: log error and show in notification: "Please log in with GitHub first! Then you can create your learning log."
  // If user hasn't signed in first, notify user to do so before submitting notes!
  // if (!githubAccessToken) {    
    
  //   return; // Abort!!!
  // }

  let fileName = getCurrentFileDate() + "-log.md";
  let entryTitle = "Learning Log for " + getCurrentTitleDate();

    let fileContent = '# ' + entryTitle + '\r\n\r\n' + entryContent;

  // TODO (?): Save log entries in a Jekyll friendly format for publishing as a website?
//     let fileContent =
// `---
// title: ${entryTitle}
// layout: post
// ---
// ${entryContent}
// `;

    // Encode into base64, because GitHub requires that format for creating/editing files    
    // NOTE: this is a quick hack to to avoid broken special characters in the encoding process. See below:
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#Unicode_strings    
    fileContent = window.btoa(unescape(encodeURIComponent(fileContent)));

    let newFileData = {
      "path": fileName,
      "message": "New learning log (posted by @LearnTeachCode app: https://github.com/LearnTeachCode/learning-log)",
      "content": fileContent
    };

    try {
      // Create new file on GitHub for this learning log entry
      let createFileResponse = await requestWithGitHubToken('PUT', 'https://api.github.com/repos/' + userData.name + '/' + userRepo.name + '/contents/' + fileName, newFileData);

      console.log('**************** File created on GitHub! Reponse: *********************');
      console.log(createFileResponse);

      // Update UI if file created successfully
      updateFileCreatedView(entryTitle, createFileResponse.content.html_url);

    } catch (err) {

      handleError("Error while creating new file on GitHub : " + err);
      return; // STOP EVERYTHING!     
    }

}


// Update views for logged in user
function updateLoggedInView (userName, userAvatar, repoLink) {  
  // Register event listener for submitting the form
  logFormView.addEventListener('submit', publishLog);

  // Display user data:
  userNameView.textContent = 'Welcome, ' + userName + '!';
  userAvatarView.src = userAvatar;

  // Log and display githubData to test it out!
  userRepoView.innerHTML = '<a href="' + repoLink + '">' + repoLink + '</a>';

  // Fade in main content section (using CSS transition)
  mainContentView.style.display = 'block';
  mainContentView.style.opacity = '1';

  // Hide loginModalView (using CSS transition to gradually fade it out) 
  loginModalView.style.opacity = '0';
  
  // Then setting a delay to hide the modal entirely and show main page content
  window.setTimeout(function(){    
    loginModalView.style.display = 'none';
  }, 1200);
}


// Update UI after file successfully created
function updateFileCreatedView(title, viewLink) {
  
  // Generate edit link by replacing "blob" in the url with "edit":
  let editLink = viewLink.replace('blob', 'edit');

  // Hide the "write" section with intructions and form
  writeView.style.display = 'none';

  // Set learning log info in UI elements:
  logTitleView.textContent = '"' + title + '"';
  viewLogView.innerHTML = '<a href="' + viewLink + '">' + viewLink + '</a>';
  editLogView.innerHTML = '<a href="' + editLink + '">' + editLink + '</a>';

  // Display info about published log:
  publishedView.style.display = 'block';
  logTitleView.style.display = inline;
  viewLogView.style.display = inline;
  editLogView.style.display = inline;

}


/* -------------------------------------------------
  HELPER FUNCTIONS
---------------------------------------------------- */

// Returns a promise, as a simple wrapper around XMLHTTPRequest
// via http://eloquentjavascript.net/17_http.html
function get(url) {
  return new Promise(function(succeed, fail) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status < 400)
        succeed(req.responseText);
      else
        fail(new Error("Request failed: " + req.statusText));
    });
    req.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    req.send(null);
  });
}


// Return object from parsed JSON data from a given URL
// via http://eloquentjavascript.net/17_http.html
function getJSON(url) {
  return get(url).then(JSON.parse).catch(handleError);
}


// Returns a promise for a GET request to GitHub, using current access token
function requestWithGitHubToken(method, url, postDataObject) {
  return new Promise(function(succeed, fail) {
    let req = new XMLHttpRequest();

    req.open(method, url, true);

    if (method === 'POST' || method === 'PUT') {
      // Set header for POST, like sending form data
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    
    // Set header for GitHub auth
    req.setRequestHeader('Authorization', 'token ' + githubAccessToken);

    req.addEventListener("load", function() {
      if (req.status < 400)
        succeed( JSON.parse(req.responseText) );
      else
        fail(new Error("Request failed: " + req.statusText));
    });
    req.addEventListener("error", function() {
      fail(new Error("Network error"));
    });

    if (postDataObject) {
      req.send(JSON.stringify(postDataObject));
    } else {
      req.send(null);
    }
    
  });
}


// Get temp code from URL param
// via https://github.com/prose/gatekeeper
function getTempCode() {
  // If the "code" URL param exists,
  if ( window.location.href.match(/\?code=(.*)/) ) {
    // Return the temp code from the URL
    return window.location.href.match(/\?code=(.*)/)[1];
  }
  // If temp code doesn't exist, return null:
  return null;
}

// Lazy error handling for now
function handleError(error) {
  console.log("Error: " + error);
}

// Get current date in 2018-12-31 format
function getCurrentFileDate() {
  let today = new Date();
  let year = String( today.getFullYear() );
  let month = String( today.getMonth() + 1 );
  let day = String( today.getDate() );

  return year + '-' + zeroPadDate(month) + '-' + zeroPadDate(day);
}

// Get current date in "December 31st, 2017" format
function getCurrentTitleDate() {
  let today = new Date();
  let year = today.getFullYear();
  let monthIndex = today.getMonth();
  let dayNum = today.getDate();

  // Array of month names to pick from using month number as the index
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // Fancy one-liner for appending "th", "st", etc. Code via https://github.com/taylorhakes/fecha
  let day = dayNum + [ 'th', 'st', 'nd', 'rd' ][ dayNum % 10 > 3 ? 0 : (dayNum - dayNum % 10 !== 10) * dayNum % 10 ];

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

// Prepend a "0" for date strings
// NOTE: could also just use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
function zeroPadDate(str) {
  if (str.length < 2) {
    return '0' + str;
  } else {
    return str;
  }
}
