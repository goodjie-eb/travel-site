// 每趟旅行一筆。每日安排填入對應日期的 items，依行程順序排列。
const trips = [{
  title: '十二月八日行',
  dates: '12/5 至 12/12',
  days: [
    { title: '12/5', items: [
      { time: '04:30', highlight: '集合', text: '桃園機場第1航廈 虎航7號櫃台' },
      { time: '07:00', highlight: '飛機起飛' },
      { time: '10:25', highlight: '抵達 關西機場', notes: ['入境抓1小時、出來後一樓換票券(HARUKA、JR迷你PASS)', 'HARUKA劃位'] },
      { time: '12:14', highlight: '前往 天王寺', text: '搭乘(22)HARUKA 約12:48抵達', notes: ['後面班次：12:44、13:14'] },
      { time: '13:20', text: '到飯店放行李' },
      { time: '14:00', highlight: '午餐', notes: ['だるま道場 天王寺店', '預約時間：14:00、5位', '可以QRcord點餐'] },
      { time: '15:30', highlight: '自由活動', notes: ['飯店16:00可入住，再約時間回去'] }
    ] },
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
      list.className = 'trip-timeline';
      day.items.forEach(item => {
        if (typeof item === 'string') { list.append(element('li', item)); return; }
        const row = document.createElement('li');
        const time = element('time', item.time);
        time.setAttribute('datetime', item.time);
        const content = document.createElement('div');
        content.className = 'timeline-content';
        // 黃色畫線粗體稱為「大標」；大標獨立一行，一般文字一律從下一段開始。
        if (item.highlight) {
          const title = document.createElement('p');
          title.append(element('strong', item.highlight));
          content.append(title);
        }
        if (item.text) content.append(element('p', item.text));
        for (const note of item.notes || []) content.append(element('p', note));
        row.append(time, content);
        list.append(row);
      });
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
