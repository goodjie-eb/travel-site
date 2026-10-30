// 每趟旅行一筆。每日安排填入對應日期的 items，依行程順序排列。
const trips = [{
  title: '十二月八日行',
  dates: '12/5 至 12/12',
  days: [
    { title: '12/5', items: [] },
    { title: '12/6', items: [] },
    { title: '12/7', items: [] },
    { title: '12/8', items: [] },
    { title: '12/9', items: [] },
    { title: '12/10', items: [] },
    { title: '12/11', items: [] },
    { title: '12/12', items: [] }
  ]
}];

function element(tag, text) {
  const node = document.createElement(tag);
  node.textContent = text;
  return node;
}

function showTrip(trip) {
  const article = document.createElement('article');
  article.append(element('h3', trip.title), element('p', '選擇日期查看當天行程。'));
  const menu = document.createElement('div');
  menu.className = 'day-grid';
  menu.setAttribute('role', 'group');
  menu.setAttribute('aria-label', trip.dates + '每日行程');
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.setAttribute('aria-live', 'polite');
  function selectDay(day, index) {
    Array.from(menu.children).forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
    });
    sheet.replaceChildren(element('h3', day.title + '｜第 ' + (index + 1) + ' 天'));
    if (day.items.length) {
      const list = document.createElement('ol');
      day.items.forEach(item => list.append(element('li', item)));
      sheet.append(list);
    } else {
      sheet.append(element('p', '當天的地點、時間與交通安排待補。'));
    }
  }
  trip.days.forEach((day, i) => {
    const button = element('button', day.title);
    button.type = 'button';
    button.addEventListener('click', () => selectDay(day, i));
    menu.append(button);
  });
  if (trip.days.length) selectDay(trip.days[0], 0);
  article.append(menu, sheet);
  return article;
}

const list = document.getElementById('trip-list');
if (list && trips.length) list.replaceChildren(...trips.map(showTrip));

// 各人的勾選只儲存在自己的瀏覽器，不上傳到公開網站。
for (const box of document.querySelectorAll('.checks input')) {
  const key = 'travel-site:dec05-12:check:' + box.value;
  try { box.checked = localStorage.getItem(key) === '1'; } catch { /* 仍可勾選 */ }
  box.addEventListener('change', () => {
    try {
      if (box.checked) localStorage.setItem(key, '1');
      else localStorage.removeItem(key);
    } catch { /* 儲存空間不可用時保留本頁勾選狀態 */ }
  });
}
