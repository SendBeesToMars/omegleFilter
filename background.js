chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({filter : "m"});
  chrome.storage.sync.set({range : "2"});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.omegle.com', schemes: ["https"]},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});