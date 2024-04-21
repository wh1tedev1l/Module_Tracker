chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'saveState') {
    let save = {};
    save[request.id] = request.checked;
    save['completedModules'] = request.completedModules;
    chrome.storage.sync.set(save);
  } else if (request.action === 'getState') {
    chrome.storage.sync.get(['completedModules', request.id], function(data) {
      sendResponse({checked: data[request.id] || false, completedModules: data.completedModules || 0});
    });

    // This will keep the message channel open until `sendResponse` is called
    return true;
  }
});