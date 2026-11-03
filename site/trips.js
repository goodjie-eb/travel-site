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
    { title: '12/6', groups: [
      { title: '環球影城組', items: [
        { time: '06:00', highlight: '出門', notes: [{ icon: '🚈', line: '大阪環狀線', route: '天王寺→ 西九條' }, { icon: '🚈', line: 'JR夢咲線', route: '西九條→ 環球影城' }] },
        { time: '08:00', highlight: '入園', notes: ['表定時間是09:00，但有機會提早30分鐘~1小時進場'] },
        { time: '22:00', highlight: '閉園', notes: ['有體力就玩到最後，累就提早回家'] }
      ], reminders: [{ prefix: '請下載 ', text: '環球影城APP', href: 'https://apps.apple.com/cn/app/%E3%83%A6%E3%83%8B%E3%83%90%E3%83%BC%E3%82%B5%E3%83%AB-%E3%82%B9%E3%82%BF%E3%82%B8%E3%82%AA-%E3%82%B8%E3%83%A3%E3%83%91%E3%83%B3-%E5%85%AC%E5%BC%8F%E3%82%A2%E3%83%97%E3%83%AA/id532097000' },
        '門票、快速通關 請點群組記事本',
        { prefix: '看快速通關時間 ', text: '請點', dialog: { title: '快速通關時間', items: [
          { time: '13:40-14:40', text: '超級任天堂世界入園' },
          { time: '13:40-14:10', text: '庫巴的挑戰' },
          { time: '14:10-14:40', text: '咚奇剛的瘋狂礦車' },
          { time: '17:40-18:10', text: '小小兵 成為大壞蛋之路' },
          { time: '(任選時段)', text: '哈利波特禁忌之旅' },
          { time: '(任選時段)', text: '飛天翼龍' }
        ] } },
        '會待到晚上請注意保暖'
      ] },
      { title: '自由活動組', items: [] }
    ] },
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

function openSchedule(schedule) {
  const dialog = document.createElement('dialog');
  dialog.className = 'schedule-dialog';
  dialog.setAttribute('aria-labelledby', 'schedule-title');
  const header = document.createElement('div');
  header.className = 'schedule-header';
  const title = element('h3', schedule.title);
  title.id = 'schedule-title';
  const close = element('button', '×');
  close.type = 'button';
  close.className = 'schedule-close';
  close.setAttribute('aria-label', '關閉快速通關時間');
  close.addEventListener('click', () => dialog.close());
  header.append(title, close);
  const list = document.createElement('ul');
  list.className = 'pass-schedule';
  list.setAttribute('role', 'list');
  schedule.items.forEach(item => {
    const row = document.createElement('li');
    if (item.time) row.append(element('span', item.time));
    else row.className = 'untimed';
    row.append(element(item.bold ? 'strong' : 'span', item.text));
    list.append(row);
  });
  dialog.append(header, list);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  document.body.append(dialog);
  dialog.showModal();
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
  // 單日與分組共用同一套時間軸、文字與照片呈現。
  function renderItems(items, target, galleryPrefix) {
    if (items.length) {
      const list = document.createElement('ol');
      list.className = 'trip-timeline';
      items.forEach(item => {
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
          else if (note.line) {
            paragraph.className = 'transit-note';
            const line = document.createElement('span');
            line.className = 'transit-line';
            const icon = element('span', note.icon || '🚈');
            icon.setAttribute('aria-hidden', 'true');
            line.append(icon, element('span', note.line));
            const route = element('span', note.route);
            route.className = 'transit-route';
            paragraph.append(line, route);
          } else if (note.href) {
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
          gallery.id = 'trip-gallery-' + galleryPrefix + '-' + list.children.length;
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
      target.append(list);
      initializePhotoGalleries(target);
    } else {
      target.append(element('p', '當天的地點、時間與交通安排待補。'));
    }
  }
  function reminderRow(note) {
    const row = document.createElement('li');
    const dot = document.createElement('span');
    dot.className = 'note-dot';
    dot.setAttribute('aria-hidden', 'true');
    const content = document.createElement('span');
    if (typeof note === 'string') content.textContent = note;
    else if (note.dialog) {
      const trigger = element('button', note.text);
      trigger.type = 'button';
      trigger.className = 'text-link';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.addEventListener('click', () => openSchedule(note.dialog));
      content.append(note.prefix || '', trigger, note.suffix || '');
    } else {
      const link = element('a', note.text);
      link.href = note.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      content.append(note.prefix || '', link, note.suffix || '');
    }
    row.append(dot, content);
    return row;
  }
  function selectDay(day, index) {
    Array.from(menu.children).forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
    });
    sheet.replaceChildren(element('h3', day.title + '｜第 ' + (index + 1) + ' 天'));
    sheet.classList.toggle('grouped-day', Boolean(day.groups?.length));
    if (day.groups?.length) {
      day.groups.forEach((group, groupIndex) => {
        const panel = document.createElement('div');
        panel.className = 'sheet trip-group';
        panel.append(element('h3', group.title));
        renderItems(group.items || [], panel, index + '-' + groupIndex);
        if (group.reminders?.length) {
          const groupReminders = document.createElement('ul');
          groupReminders.className = 'travel-notes trip-reminders';
          groupReminders.setAttribute('role', 'list');
          groupReminders.setAttribute('aria-label', group.title + '提醒');
          groupReminders.append(...group.reminders.map(reminderRow));
          panel.append(groupReminders);
        }
        sheet.append(panel);
      });
    } else renderItems(day.items || [], sheet, index);
    reminders.setAttribute('aria-label', day.title + '行程提醒');
    reminders.replaceChildren(...(day.reminders || []).map(reminderRow));
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






