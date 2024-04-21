// Get all li elements with id starting with 'context_module_item_'

let liElements = document.querySelectorAll('li[id^="context_module_item_"]');

let moduleCount = 0;
let completedModules = 0;
let assignmentCount = 0;
let completedAssignments = 0;

liElements.forEach(li => {
  // Check the course type
  let typeIcon = li.querySelector('.type_icon');
  let courseType = typeIcon ? typeIcon.title : '';

    moduleCount++;

    // Create a checkbox
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'module_' + moduleCount;

    // Request the saved state of the checkbox from the background script
    chrome.runtime.sendMessage({action: 'getState', id: checkbox.id}, function(response) {
        checkbox.checked = response.checked;
        completedModules = response.completedModules;
    });

    // Add an event listener to the checkbox
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        completedModules++;
      } else {
        completedModules--;
      }

      chrome.runtime.sendMessage({action: 'saveState', id: checkbox.id, checked: this.checked, completedModules: completedModules});

    });

    // Insert the checkbox after the title
    let title = li.querySelector('.ig-title');
    if (title) {
      title.parentNode.insertBefore(checkbox, title.nextSibling);
    }
});


chrome.runtime.onMessage.addListener(
    
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      sendResponse({assignments: assignmentCount, modules: moduleCount, completed: completedModules});
  });