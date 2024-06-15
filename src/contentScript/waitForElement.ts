export function waitForElement(selector: string): Promise<HTMLElement> {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element as HTMLElement);
          break;
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // なぜかうまく動かないのでコメントアウトする
    // 既に存在する場合は即座に解決
    const element = document.querySelector(selector);
    if (element) {
      observer.disconnect();
      resolve(element as HTMLElement);
    }
  });
}
