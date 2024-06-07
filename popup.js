document.addEventListener('DOMContentLoaded', () => {
  const statusElement = document.getElementById('status');
  const toggleButton = document.getElementById('toggle');

  chrome.storage.sync.get('bypassEnabled', (data) => {
    updateStatus(data.bypassEnabled);
  });

  toggleButton.addEventListener('click', () => {
    chrome.storage.sync.get('bypassEnabled', (data) => {
      let newStatus = !data.bypassEnabled;
      chrome.storage.sync.set({ bypassEnabled: newStatus }, () => {
        updateStatus(newStatus);
      });
    });
  });

  function updateStatus(isEnabled) {
    statusElement.textContent = isEnabled ? 'Bypass is on' : 'Bypass is off';
  }
});
