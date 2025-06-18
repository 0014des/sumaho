const pages = {
  home: {
    url: "https://example.com/home",
    content: `
      <h2>ホーム</h2>
      <p>ここはホームページです。</p>
      <p>下のメニューやボタンで切り替えてください。</p>
    `,
  },
  settings: {
    url: "https://example.com/settings",
    content: `
      <h2>設定</h2>
      <p>ここは設定ページです。</p>
      <p>画面サイズ切り替えもここから操作できます。</p>
    `,
  },
  about: {
    url: "https://example.com/about",
    content: `
      <h2>About</h2>
      <p>スマホエミュレータのデモページです。</p>
      <p>複数ページの切り替えができます。</p>
    `,
  },
};

let historyStack = [];
let currentPage = null;

function renderPage(pageKey, addToHistory = true) {
  if (!pages[pageKey]) return;
  if (currentPage && addToHistory) {
    historyStack.push(currentPage);
  }
  currentPage = pageKey;

  const contentArea = document.getElementById("content-area");
  const urlBar = document.getElementById("url-bar");

  contentArea.innerHTML = pages[pageKey].content;
  urlBar.textContent = pages[pageKey].url;
}

function goBack() {
  if (historyStack.length === 0) {
    alert("戻れるページがありません。");
    return;
  }
  const prevPage = historyStack.pop();
  renderPage(prevPage, false);
}

function updateTime() {
  const timeDisplay = document.getElementById("time-display");
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  timeDisplay.textContent = `${h}:${m}`;
}

function changeScreenSize(sizeKey) {
  const phone = document.getElementById("phone");
  phone.classList.remove("mini", "phone", "tablet");
  phone.classList.add(sizeKey);
}

document.addEventListener("DOMContentLoaded", () => {
  // 初期ページ表示
  renderPage("home");

  // 時刻更新
  updateTime();
  setInterval(updateTime, 1000 * 60);

  // ボタン操作
  document.getElementById("btn-home").addEventListener("click", () => renderPage("home"));
  document.getElementById("btn-back").addEventListener("click", goBack);
  document.getElementById("btn-menu").addEventListener("click", () => {
    // メニューとして設定とAboutを選べる簡易ダイアログ表示
    const choice = prompt("メニューを選択:\n1: 設定\n2: About\nキャンセルで閉じる");
    if (choice === "1") {
      renderPage("settings");
    } else if (choice === "2") {
      renderPage("about");
    }
  });

  // 画面サイズ切替
  document.getElementById("screen-size-select").addEventListener("change", (e) => {
    changeScreenSize(e.target.value);
  });

  // 初期サイズセット
  changeScreenSize("phone");
});
