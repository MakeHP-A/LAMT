// JSONファイルのパス
const jsonFilePath = "news.json";

// ニュースを表示するコンテナ
const newsContainer = document.getElementById("news-container");

// JSONを読み込み、ニュースを表示する関数
async function loadNews() {
  try {
    // JSONファイルを取得
    const response = await fetch(jsonFilePath);
    const newsData = await response.json();

    // 日付順にソート（降順）
    newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 最新3件を取得
    const latestNews = newsData.slice(0, 3);

    // HTMLに挿入
    latestNews.forEach(news => {
      const newsElement = document.createElement("div");
      newsElement.classList.add("news");
      
      // ニュースコンテンツを生成
      newsElement.innerHTML = `
        <h5>${news.title}</h5>
        <p>${news.content}</p>
        <span class="toggle-button">続きを読む</span>
      `;

      // ボタンの挙動を設定
      const toggleButton = newsElement.querySelector(".toggle-button");
      const newsContent = newsElement.querySelector("p");

      toggleButton.addEventListener("click", () => {
        if (newsContent.classList.contains("expanded")) {
          newsContent.classList.remove("expanded");
          toggleButton.textContent = "続きを読む";
        } else {
          newsContent.classList.add("expanded");
          toggleButton.textContent = "折り畳む";
        }
      });

      newsContainer.appendChild(newsElement);
    });
  } catch (error) {
    console.error("ニュースの読み込みに失敗しました:", error);
    newsContainer.innerHTML = "<p>ニュースの読み込みに失敗しました。</p>";
  }
}

// ニュースの読み込みを実行
loadNews();
