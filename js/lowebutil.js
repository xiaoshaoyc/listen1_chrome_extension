/* global window  */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
function getParameterByName(name, url) { // eslint-disable-line no-unused-vars
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line no-useless-escape
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);

  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function cookieGet(cookie, callback){
  if (typeof chrome !== 'undefined') {
    return chrome.cookies.get(cookie, (arg1, arg2) => {
      callback(arg1, arg2);
    });
  } else {
    const remote = require('electron').remote; // eslint-disable-line
    remote.session.defaultSession.cookies.get(cookie).then((arg1, arg2) => {
      callback(null, arg1, arg2);
    });
  }
}

function cookieSet(cookie, callback){
  if (typeof chrome !== 'undefined') {
    return chrome.cookies.set(cookie, (arg1, arg2) => {
      callback(arg1, arg2);
    });
  } else {
    const remote = require('electron').remote; // eslint-disable-line
    remote.session.defaultSession.cookies.set(cookie).then((arg1, arg2) => {
      callback(null, arg1, arg2);
    });
  }
}