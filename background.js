const theUrl = "https://www.17lands.com/card_ratings";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url === theUrl) {
    await chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ["dist/bundle.js"],
      })
      .then(() => console.log("injected script file"));
  }
});
