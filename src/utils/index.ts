export function getCookie(domain: string, name: string, callback: (cookie: string | undefined) => void) {
  chrome.cookies.get({ url: domain, name: name }, function (cookie) {
    if (callback) {
      callback(cookie?.value);
    }
  });
}

export function getCookies(domain: string, callback: (cookie: chrome.cookies.Cookie[]) => void) {
  chrome.cookies.getAll({ url: domain }, function (cookie) {
    if (callback) {
      callback(cookie);
    }
  });
}
