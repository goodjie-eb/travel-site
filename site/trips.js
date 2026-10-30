// 旅行資料集中放這裡；目前保持空白，不虛構正式行程。
// 新行程格式：{ title: "旅行名稱", dates: "日期範圍", days: [
//   { title: "第一天", items: ["交通與行程說明"] }
// ] }
const trips = [];

// 使用 textContent，避免把行程文字當成 HTML 執行。
const list = document.getElementById("trip-list");
if (list && trips.length > 0) {
  list.replaceChildren();
  for (const trip of trips) {
    const article = document.createElement("article");
    article.className = "trip";
    const title = document.createElement("h3");
    title.textContent = trip.title;
    const dates = document.createElement("p");
    dates.textContent = trip.dates;
    article.append(title, dates);
    for (const day of trip.days || []) {
      const heading = document.createElement("h4");
      heading.textContent = day.title;
      const items = document.createElement("ul");
      for (const item of day.items || []) {
        const li = document.createElement("li");
        li.textContent = item;
        items.append(li);
      }
      article.append(heading, items);
    }
    list.append(article);
  }
}
