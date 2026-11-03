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
      { time: '13:20', highlight: '飯店 寄放行李' },
      { time: '14:00', highlight: '午餐', notes: [{ text: 'だるま道場 天王寺店', href: 'https://maps.app.goo.gl/1RvBALE66AuQnn936' }, { prefix: '預約時間：', emphasis: '14:00', suffix: '、5位' }, '可以QRcord點餐'], photos: [{ src: './codex-clipboard-0a0de4e7-8ad2-4cd4-94c8-ff1c79dd452e.png', alt: 'だるま道場 天王寺店 壽司與生魚片料理' }] },
      { time: '15:30', highlight: '自由活動', notes: ['飯店16:00可入住，約時間回去'] }
    ], reminders: [
      '天王寺商圈很大，提前查好想逛的品牌位置',
      { text: "阿倍野Q's Mall", href: 'https://maps.app.goo.gl/1whDqMtxA7q1XrLUA', suffix: '的B1有伊藤洋華堂超市' },
      '飯店附近商店較少，宵夜零食在商圈先買',
      '環球組隔天要早起，請早點休息'
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
  const reminders = document.createElement('ul');
  reminders.className = 'travel-notes trip-reminders';
  reminders.setAttribute('role', 'list');
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
        for (const note of item.notes || []) {
          const paragraph = document.createElement('p');
          if (typeof note === 'string') paragraph.textContent = note;
          else if (note.href) {
            const link = element('a', note.text);
            link.href = note.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            paragraph.append(link);
          } else {
            const emphasis = element('span', note.emphasis);
            emphasis.className = 'time-emphasis';
            paragraph.append(note.prefix, emphasis, note.suffix);
          }
          content.append(paragraph);
        }
        if (item.photos?.length) {
          const photos = document.createElement('div');
          photos.className = 'trip-photos';
          const gallery = document.createElement('div');
          gallery.className = 'hotel-gallery';
          gallery.id = 'trip-gallery-' + index + '-' + list.children.length;
          gallery.setAttribute('aria-label', item.highlight + '照片');
          item.photos.forEach(photo => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'hotel-photo';
            button.setAttribute('aria-label', '放大' + photo.alt);
            const image = document.createElement('img');
            image.src = photo.src;
            image.alt = photo.alt;
            image.loading = 'lazy';
            image.width = 600;
            image.height = 600;
            button.append(image);
            gallery.append(button);
          });
          const controls = document.createElement('div');
          controls.className = 'gallery-controls';
          const previous = element('button', '←');
          const next = element('button', '→');
          [previous, next].forEach((button, i) => {
            button.type = 'button';
            button.dataset.galleryStep = i ? '1' : '-1';
            button.setAttribute('aria-controls', gallery.id);
            button.setAttribute('aria-label', i ? '下一張照片' : '上一張照片');
          });
          const count = document.createElement('span');
          count.className = 'gallery-count';
          count.setAttribute('aria-live', 'polite');
          controls.append(previous, count, next);
          photos.append(gallery, controls);
          content.append(photos);
        }
        row.append(time, content);
        list.append(row);
      });
      sheet.append(list);
      initializePhotoGalleries(sheet);
    } else {
      sheet.append(element('p', '當天的地點、時間與交通安排待補。'));
    }
    reminders.setAttribute('aria-label', day.title + '行程提醒');
    reminders.replaceChildren(...(day.reminders || []).map(note => {
      const row = document.createElement('li');
      const dot = document.createElement('span');
      dot.className = 'note-dot';
      dot.setAttribute('aria-hidden', 'true');
      const content = document.createElement('span');
      if (typeof note === 'string') content.textContent = note;
      else {
        const link = element('a', note.text);
        link.href = note.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        content.append(link, note.suffix || '');
      }
      row.append(dot, content);
      return row;
    }));
    reminders.hidden = !day.reminders?.length;
  }
  trip.days.forEach((day, i) => {
    const button = element('button', day.title);
    button.type = 'button';
    button.addEventListener('click', () => selectDay(day, i));
    menu.append(button);
  });
  if (trip.days.length) selectDay(trip.days[0], 0);
  article.append(menu, sheet, reminders);
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



