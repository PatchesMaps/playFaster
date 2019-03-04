chrome.runtime.onInstalled.addListener(function () {
  console.log('Play Faster Installed.')
});

chrome.runtime.onStartup.addListener(function () {
  console.log('Play Faster Startup.');
});

chrome.webNavigation.onDOMContentLoaded.addListener(function () {
  // Start observing the target node for configured mutations
  console.log('Play Faster: onDOMContentLoaded');
});

chrome.tabs.onActivated.addListener(function ({tabId}) {
  console.log('tabs.onActivated');
  chrome.tabs.executeScript(tabId, { file: 'playFaster.js' })
});
