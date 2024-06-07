importScripts('ai_model.js');

let bypassEnabled = false;

chrome.webRequest.onBeforeRequest.addListener(
  async function(details) {
    if (bypassEnabled) {
      const bypassNeeded = await analyzeRequest(details);
      if (bypassNeeded) {
        const newUrl = details.url.replace("blockedwebsite.com", "allowedwebsite.com");
        return { redirectUrl: newUrl };
      }
    }
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ bypassEnabled: false });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.bypassEnabled) {
    bypassEnabled = changes.bypassEnabled.newValue;
  }
});
