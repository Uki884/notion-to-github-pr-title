{
  chrome.action.onClicked.addListener((_tab) => {
    chrome.tabs.create({
      url: "about:blank",
    });
  });
}

