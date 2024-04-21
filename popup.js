chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    if (response) {
        let totalModules = response.modules;
        let completedModules = response.completed;
      document.getElementById('modules').textContent = 'Modules: ' + (response.modules || 0);
      document.getElementById('completed').textContent = 'Completed: ' + (response.completed || 0);

      let percentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    // Update the width of the progress bar
    document.getElementById('progress-bar').style.width = percentage + '%';
    }
  });
});