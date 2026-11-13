// 每趟旅行一筆。每日安排填入對應日期的 items，依行程順序排列。
const trips = [{
  title: '十二月八日行',
  dates: '12/5 至 12/12',
  days: [
    { title: '12/5', subtitle: '前往日本', items: [
      { time: '04:15', highlightTime: true, highlight: '集合', text: '桃園機場第1航廈 虎航7號櫃台' },
      { time: '07:00', highlight: '飛機起飛' },
      { time: '10:25', highlight: '抵達 關西機場', notes: ['入境抓1小時、出來後一樓換票券(HARUKA)'] },
      { time: '12:14', highlight: '前往 天王寺', notes: [
        {
          icon: '🚈', badge: 'HARUKA', badgeColor: 'blue', badgeSuffix: '(22)',
          route: '約12:48抵達', followUp: '後面班次：12:44、13:14'
        },
        { icon: '🚶', line: '到飯店 ', text: 'YUMERA Hotel', href: '?page=stay' }
      ] },
      { time: '13:20', highlight: '飯店 寄放行李' },
      { time: '14:00', highlight: '午餐', notes: [
        { text: '江戶前迴轉壽司 MIO廣場店', href: 'https://maps.app.goo.gl/6K5PET6hxTrPwi4VA' },
        '無法預先預約、平板點餐'
      ], photoMode: 'overlay', photos: [
        { src: './codex-clipboard-bb14ddb7-7bfa-440b-b022-87ce93342773.png', alt: '江戶前迴轉壽司店內座位與吧檯' },
        { src: './codex-clipboard-6c32536d-e65a-4557-938a-bebdca71e0c5.png', alt: '迴轉輸送帶與平板點餐畫面' },
        { src: './codex-clipboard-5d45f208-d8de-4617-9d94-495b5970af25.png', alt: '鮭魚握壽司拼盤' },
        { src: './codex-clipboard-f82841c3-f8c4-4df6-9eef-8bdcd3fc6487.png', alt: '握壽司與軍艦壽司拼盤' }
      ] },
      { time: '15:30', highlight: '自由活動', notes: [
        '飯店16:00可入住',
        { parts: [
          '一起先逛 ',
          { text: 'UNIQLO', href: 'https://maps.app.goo.gl/K8ARQbqisbVgeaLN7' },
          '、',
          { text: 'GU', href: 'https://maps.app.goo.gl/GPeGbg8TYnkZ1xdW6' },
          '、伊藤洋華堂超市'
        ] },
        '📍環球組買隔天早餐'
      ] }
    ], reminders: [
      '天王寺商圈很大，提前查好想逛的品牌位置',
      { text: "阿倍野Q's Mall", href: 'https://maps.app.goo.gl/1whDqMtxA7q1XrLUA', suffix: '的B1有伊藤洋華堂超市' },
      '飯店附近商店較少，宵夜零食在商圈先買',
      '環球組隔天要早起，請早點休息'
    ] },
    { title: '12/6', subtitle: '分頭行動', groups: [
      { title: '環球影城組', items: [
        { time: '05:40', highlight: '出門', notes: [
          { icon: '🚈', badge: '大阪環狀線', route: '天王寺→ 西九條' },
          {
            icon: '🚈', badge: 'JR夢咲線', badgeColor: 'blue',
            route: '西九條→ 環球影城', followUp: { bold: '車費約 ¥240' }
          }
        ] },
        {
          time: '08:00', highlight: '入園',
          notes: ['表定時間是09:00，但有機會提早30分鐘~1小時進場'],
          photosBelowHeading: true, photoMode: 'overlay', photos: [
            { src: './codex-clipboard-04083c4e-6fb4-4148-ad4d-c379e96368ca.png', alt: '日本環球影城入口地球儀' },
            { src: './codex-clipboard-e5be036e-54cc-4600-8984-728412a845f2.png', alt: '超級任天堂世界園區' },
            { src: './codex-clipboard-2935b1a9-44ac-44b2-b6a0-3d7d75ec77dd.png', alt: '哈利波特園區的霍格華茲城堡' }
          ]
        },
        { time: '22:00', highlight: '閉園', notes: [
          '有體力就玩到最後，累就提早回家',
          { icon: '🚈', badge: 'JR夢咲線', badgeColor: 'blue', route: '環球影城→ 西九條' },
          {
            icon: '🚈', badge: '大阪環狀線',
            route: '西九條→ 天王寺', followUp: { bold: '車費約 ¥240' }
          }
        ] }
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
    { title: '12/7', subtitle: '勝尾寺', items: [
      { time: '06:30', highlight: '出門', notes: [
        { icon: '🚶', line: '到 天王寺車站 (15分鐘)' },
        {
          icon: '🚇', line: '搭 ', badge: '御堂筋線',
          details: ['至 箕面萱野站 (45分鐘)', { bold: '車費約 ¥580' }]
        }
      ] },
      { time: '07:30', highlight: '箕面萱野站', notes: [
        {
          icon: '🚕', line: '計程車前往 (15分鐘)',
          details: ['南出口 招呼站', '(巴士站牌對面)', { bold: '車費約 ¥3,600' }]
        },
        '📍 分兩台 可找人分'
      ] },
      { time: '08:00', highlight: '勝尾寺', notes: [
        '入山費 ¥500 / 人',
        '📍 明信片蓋張',
        '📍 買達摩、御守',
        '📍 停留約 2.5小時',
        '📍 離開前先上廁所！'
      ], photosBelowHeading: true, photoMode: 'overlay', photos: [
        { src: './codex-clipboard-28a28963-0606-4f68-a3c3-064333b6372f.png', alt: '勝尾寺一整櫃紅色達摩' },
        { src: './codex-clipboard-6fe3dac9-9468-4af0-a67e-4c968b821acb.png', alt: '勝尾寺的紅橋與秋日楓葉' },
        { src: './codex-clipboard-5dd4d475-cb0d-45ba-991d-13cb2701b33c.png', alt: '勝尾寺門前手持的小達摩' }
      ] },
      { time: '11:00', highlight: '前往箕面瀑布', notes: [
        {
          icon: '🚕', line: '計程車前往 (5分鐘)',
          details: [
            '勝尾寺門口 可以攔',
            { bold: '車費約 ¥1,500' },
            '(走路要40分鐘)',
            '到 大日駐車場 下車'
          ]
        },
        { icon: '🚶', line: '到 箕面瀑布 (20分鐘)', details: ['約11:30~11:40 到'] },
        '📍 離開瀑布前 上廁所！'
      ], photosBelowHeading: true, photos: [
        { src: './codex-clipboard-63cc3706-c1dc-436c-837a-8f58aa5e79c1.png', alt: '箕面瀑布與兩旁的秋日紅葉' }
      ] },
      { time: '12:00', highlight: '散步 下山', notes: [
        {
          icon: '🚶', line: '到 阪急箕面站 (1小時)',
          details: ['沿途經過：箕面公園、', '瀧安寺、昆蟲館、餐廳']
        },
        '📍 如中間用餐 再抓1小時'
      ] },
      { time: '14:00', highlight: '到 阪急箕面站', notes: [
        {
          icon: '🚌', line: '搭回 箕面萱野站 (15分鐘)',
          details: ['(36號、21號公車)', '約14:20到', { bold: '車費約 ¥250' }]
        }
      ] },
      { time: '15:00', highlight: '回 大阪市區', notes: [
        {
          icon: '🚇', line: '搭 ', badge: '御堂筋線',
          details: ['至 心齋橋站 (35分鐘)', '約 15:35抵達', { bold: '車費約 ¥530' }]
        }
      ] },
      { time: '15:40', highlight: '自由活動', notes: ['18:10集合 慢慢走到餐廳'] },
      { time: '18:30', highlight: '晚餐', notes: [
        { text: '忍鬨燒肉 日本橋店', href: 'https://maps.app.goo.gl/tSCjVkUKKfzLY6Ek7' },
        { prefix: '預約時間：', emphasis: '18:30', suffix: '、6位' }
      ], photoMode: 'overlay', photos: [
        { src: './codex-clipboard-682196ef-8ab0-4661-a72b-2055c25de85a.png', alt: '塞滿蔥花的厚切牛舌' },
        { src: './codex-clipboard-faa5c9c2-938c-452f-8b03-707d8e4a0670.png', alt: '燒肉拼盤與蛋黃牛肉卷' },
        { src: './codex-clipboard-03a4a0f2-b1d0-411d-8ec9-f576bc4491df.png', alt: '忍鬨燒肉日本橋店的店面招牌' }
      ] },
      { time: '20:00', highlight: '回飯店', notes: [
        { icon: '🚇', line: '搭 ', badge: '堺筋線', badgeColor: 'brown', route: '日本橋→ 動物園前', routeBelow: true },
        {
          icon: '🚇', line: '轉 ', badge: '御堂筋線',
          route: '動物園前→ 天王寺', routeBelow: true, followUp: { bold: '車費約 ¥190' }
        }
      ] }
    ] },
    { title: '12/8', subtitle: '移動至京都', items: [
      { time: '10:00', highlight: '退房', notes: [
        '提早退，寄放行李',
        { icon: '🚶', line: '散步到 新世界(20分鐘)', details: ['(搭車差不多時間)'] }
      ] },
      { time: '10:30', highlight: '午餐', notes: [
        { text: '土手燒 Nonkiya（のんきや）', href: 'https://maps.app.goo.gl/NVbNKwAF22nD8M6x8' },
        '關東煮、味增牛筋',
        '立食、10個位子、只收現金',
        { photoLabel: '土手燒 Nonkiya（のんきや）', photoMode: 'overlay', photos: [
          { src: './codex-clipboard-fd9b4ec5-de48-42a8-b719-78c0f1d40d66.png', alt: '味噌燉牛筋串' },
          { src: './codex-clipboard-0357af22-4890-43aa-af3a-5115db1d8e38.png', alt: '關東煮的白蘿蔔與魚板' },
          { src: './codex-clipboard-30cbf632-571b-4146-80fc-a385d9c11f8a.png', alt: 'Nonkiya 店門的紅色布簾與立食吧檯' }
        ] },
        { parts: ['新世界區', { bold: '吃炸串' }, ' (隨意找)'] }
      ] },
      { time: '12:00', highlight: '自由活動、最後陪佳怡' },
      { time: '14:15', highlight: '到飯店拿行李', notes: [
        '佳怡往機場 約16:00到',
        { icon: '🚈', badge: 'HARUKA', badgeColor: 'blue', highlight: '往京都' },
        { prefix: '', emphasis: '28號：14:20~ 15:04', suffix: '' },
        { prefix: '', emphasis: '30號：14:50~ 15:34', suffix: '' },
        '32號：15:20~ 16:04',
        {
          icon: '🚇', line: '搭 ', badge: '烏丸線', badgeColor: 'green',
          details: ['到 四條站 (電梯4號出口)', { bold: '車費約 ¥220' }]
        },
        { icon: '🚶', line: '走路6分鐘', details: ['約16:00抵達'] }
      ] },
      { time: '16:00', highlight: '飯店 入住', notes: [
        { icon: '🍱', badge: '晚餐選擇', badgeColor: 'black' },
        { text: '東洋亭 百年漢堡排', href: 'https://maps.app.goo.gl/xdbjAtcy693DuTeu9' },
        { icon: '🚌', line: '搭到 四条河原町 (15分鐘)', details: [{ bold: '車費約 ¥230' }] },
        '午餐優惠~ 17:00止 (要吃要趕一下)',
        '或是不趕 直接吃正常時段',
        { photoLabel: '東洋亭 百年漢堡排', photoMode: 'overlay', photos: [
          { src: './codex-clipboard-4b1b206c-5596-413c-989a-5aef9b782e1d.png', alt: '東洋亭鋁箔包漢堡排' },
          { src: './codex-clipboard-f73995c7-8c7d-4695-8028-24b333dd506c.png', alt: '荷包蛋與菇類佐漢堡排' },
          { src: './codex-clipboard-ff9fbcdb-ba9f-452e-afb3-34effb06b8ee.png', alt: '東洋亭的洋食展示櫥窗' }
        ] },
        { parts: [{ text: '麵屋 豬一 本店', href: 'https://maps.app.goo.gl/vMfTKMDLJnRJPCRF9' }, ' (走路15分鐘)'] },
        { parts: [{ text: '麵屋 豬一 二店', href: 'https://maps.app.goo.gl/HgE293SwGxuEStZo6' }, ' (走路10分鐘)'] },
        '只能現場排隊',
        '晚餐17:30開始',
        '約1小時前去抽號碼',
        '⚠️ 低消一人一碗',
        '⚠️ 只能拍食物 不能拍店內',
        { photoLabel: '麵屋 豬一 二店', photoMode: 'overlay', photos: [
          { src: './codex-clipboard-2663953f-0867-48c4-b1d3-ab2507bdd944.png', alt: '麵屋豬一的牛肉拉麵' },
          { src: './codex-clipboard-17187123-06d8-4f21-a806-9651ac190bfa.png', alt: '麵屋豬一的叉燒拉麵' },
          { src: './codex-clipboard-2ebf07d3-e35c-4e58-9fae-173ecc95cc27.png', alt: '麵屋豬一二店的店面' }
        ] }
      ] },
      { time: '18:30', highlight: '自由活動', notes: [
        { parts: [{ bold: '逛街' }, '→ 四条河原町'] },
        { parts: [{ bold: '夜訪' }, '→ 八坂神社'] },
        '⚠️ 提前先準備隔天早餐'
      ] }
    ], reminders: [
      { prefix: '買茅乃舍 到 ', text: '大丸百貨', href: 'https://maps.app.goo.gl/uW5ouEe3p6XD7M1P6', suffix: ' 開到 20:00' },
      { parts: [
        '住宿附近超市 ',
        { text: 'Life超市', href: 'https://maps.app.goo.gl/YMumCDqTTwaukVE7' },
        '、',
        { text: '森田屋超市', href: 'https://maps.app.goo.gl/zc2CAnamkseKXnZc6' }
      ] },
      '隔天早出門晚回家，請早點休息'
    ] },
    { title: '12/9', subtitle: '宇治、奈良', items: [] },
    { title: '12/10', subtitle: '伏見稻荷大社', items: [
      { time: '08:00', highlight: '早餐', notes: [
        { text: '京都 いとおかし', href: 'https://maps.app.goo.gl/4XatDEfKUdRCrHX68' },
        { prefix: '預約時間：', emphasis: '08:00', suffix: '、4+1位' },
        '遲到15分鐘會取消',
        '🍱極厚烤銀鮭定食',
        { photoLabel: '京都 いとおかし', photoMode: 'overlay', photos: [
          { src: './codex-clipboard-43e67d98-c993-49ca-ace8-87169a1b53c6.png', alt: '京都 いとおかし 餐廳外觀' },
          { src: './codex-clipboard-dcf872f6-f56f-4048-8792-f0abaf495cc2.png', alt: '京都 いとおかし 極厚烤銀鮭定食' }
        ] },
        { icon: '🚶', line: '散步 15分鐘' }
      ] },
      { time: '09:20', highlight: '買抹茶粉、吃生乳捲', notes: [
        { text: '丸久小山園 西洞院店', href: 'https://maps.app.goo.gl/dSBG81pVE4u5DNPA6' },
        '09:30 販賣部開',
        '10:30 茶房開',
        { photoLabel: '丸久小山園 西洞院店', photoMode: 'overlay', photos: [
          { src: './codex-clipboard-cbc9a29d-45df-4cb9-bc99-7bb8562c3aff.png', alt: '丸久小山園的抹茶商品展示櫃' },
          { src: './codex-clipboard-700928da-b773-418f-9833-87fddd3d5ea2.png', alt: '抹茶生乳捲' },
          { src: './codex-clipboard-3c006b33-9ae7-4f4e-b05f-d2f5abb78aa9.png', alt: '抹茶甜點與鮮奶油' }
        ] },
        '等茶房開的時間可以去拜拜',
        { text: '御金神社', href: 'https://maps.app.goo.gl/a5taHPYEKbnFk75FA' },
        { photoLabel: '御金神社', photoMode: 'overlay', photos: [
          { src: './codex-clipboard-5e31a840-ce93-46a2-b93e-770c66b7d407.png', alt: '御金神社的金色鳥居' },
          { src: './codex-clipboard-299f7a24-5703-42f8-9af2-e4df9394e4a6.png', alt: '御金神社的御守與授與品' }
        ] },
        { icon: '🚶', line: '到 烏丸御池站 (10分鐘)' },
        { icon: '🚇', line: '搭 ', badge: '烏丸線', badgeColor: 'green', details: ['至 京都站'] },
        {
          icon: '🚈', line: '轉 ', badge: 'JR奈良線', badgeColor: 'brown',
          details: ['至 JR稻荷站', { bold: '車費約 ¥370', suffix: ' (40分鐘)' }]
        }
      ] },
      { time: '12:30', highlight: '周邊店家', notes: [
        { text: '吉伊卡哇 京都伏見', href: 'https://maps.app.goo.gl/EYYkY32R2Z3Q7v6Y6' },
        '📍 婕要逛，其他人逛其它店~',
        '📍 買狐狸煎餅、稻荷壽司'
      ], photoMode: 'overlay', photos: [
        { src: './codex-clipboard-7179601c-1369-491b-811c-0d91e975ee72.png', alt: '吉伊卡哇京都伏見店的櫥窗圖案' },
        { src: './codex-clipboard-bb4687b0-63ca-411f-9aba-282653aafb60.png', alt: '吉伊卡哇京都伏見店的外觀' },
        { src: './codex-clipboard-d36e6a70-f41f-434f-b94d-efebae6c750c.png', alt: '狐狸造型煎餅' },
        { src: './codex-clipboard-02b51ed1-4eba-4dd8-a81b-c9ec02518b5c.png', alt: '盤中的稻荷壽司' }
      ] },
      { time: '13:30', highlight: '伏見稻荷大社、千本鳥居', notes: [
        '📍 停留約1個半小時',
        {
          icon: '🚇', line: '搭 ', badge: '京阪本線',
          details: ['到 神宮丸太町', { bold: '車費約 ¥300', suffix: ' (26分鐘)' }]
        },
        { icon: '🚶', line: '走10分鐘' }
      ], photosBelowHeading: true, photoMode: 'overlay', photos: [
        { src: './codex-clipboard-42c21236-85a4-42e4-8330-a2a09cb0b3da.png', alt: '伏見稻荷大社的社殿與石階' },
        { src: './codex-clipboard-c9a93329-0466-4226-9321-a97c91700935.png', alt: '千本鳥居的朱紅色鳥居步道' }
      ] },
      { time: '15:40', highlight: '荒神口 鴨川跳石', notes: [
        '📍 停留30分鐘',
        { icon: '🚶', line: '回 神宮丸太町 (6分鐘)' },
        '📍 附近有婕想逛的店',
        { icon: '🚶', line: '神宮丸太町→店 (6分鐘)' },
        { text: 'Gotō Sports', href: 'https://maps.app.goo.gl/n4gfjrNNr13wnTVs7' },
        '📍 停留至17:20',
        {
          icon: '🚇', line: '搭 ', badge: '京阪本線',
          details: ['神宮丸太町→祗園四條', { bold: '車費約 ¥240', suffix: ' (10分鐘)' }]
        }
      ], photosBelowHeading: true, photoMode: 'overlay', photos: [
        { src: './codex-clipboard-d24dd278-543e-4972-b00b-f10172a7648c.png', alt: '荒神口鴨川上的跳石與河岸' },
        { src: './codex-clipboard-b1024e38-c6e4-4ba6-8ec3-af783c8431e0.png', alt: '鴨川跳石中的烏龜造型石塊' }
      ] },
      { time: '18:30', highlight: '晚餐', notes: [
        { text: '富之上壽喜燒', href: 'https://maps.app.goo.gl/KfCkxBgErBiWPbHe9' },
        { prefix: '預約時間：', emphasis: '18:30', suffix: '、5位' },
        '3種價位套餐',
        '(神戶牛、黑毛和牛、國產牛)'
      ], photoMode: 'overlay', photos: [
        { src: './codex-clipboard-96381793-993d-4912-8e5a-28c0f7df94f9.png', alt: '富之上壽喜燒的鍋物與牛肉片' },
        { src: './codex-clipboard-dde6852b-4a8b-43f7-b3d7-e73f58186847.png', alt: '壽喜燒套餐的牛肉片' },
        { src: './codex-clipboard-7dc33c36-e0b5-49c5-87e4-50a34951973b.png', alt: '富之上壽喜燒的店面' }
      ] },
      { time: '19:40', highlight: '回飯店', notes: [
        {
          icon: '🚌', line: '四条京阪前→四条西洞院',
          details: [{ bold: '車費約 ¥230', suffix: ' (20分鐘)' }]
        }
      ] }
    ], reminders: [
      { bold: true, parts: ['早餐後可以脫隊，但', { highlight: '晚餐要自己去餐廳' }] }
    ] },
    { title: '12/11', subtitle: '嵐山一日遊', items: [
      { time: '08:15', highlight: '出門', notes: [
        {
          icon: '🚌', line: '四条西洞院→二條站前',
          details: ['(46號、55號)', { bold: '車費約 ¥230', suffix: ' (15分鐘)' }]
        },
        {
          icon: '🚈', line: '搭 ', badge: '山陰本線', badgeColor: 'purple', badgeSuffix: ' 普通車',
          details: [
            'JR二條→ JR龜岡',
            { bold: '車費約 ¥320', suffix: ' (25分鐘)' },
            '08:32→ 09:01',
            '08:45→ 09:08',
            '08:57→ 09:21'
          ]
        },
        { icon: '🚶', line: '到 保津川乘船處 2F報到' },
        { photoLabel: '保津川乘船處', photos: [
          { src: './codex-clipboard-3d1724ca-b0be-4024-8494-5e11b011055b.png', alt: '保津川乘船處外觀與二樓報到標示' }
        ] },
        '📍 可以帶零食、飲料上船',
        '📍 出發前一定要上廁所！'
      ] },
      { time: '10:00', highlight: '保津川遊船', notes: [
        '約1個半~2小時',
        '尾段有uber船，只收現金',
        '📍 以防萬一 帶個鞋套',
        '📍 戴帽子、注意保暖'
      ], photoMode: 'overlay', photos: [
        { src: './codex-clipboard-e1c57c47-33ad-4f46-9e3b-f81fdc7e4172.png', alt: '從保津川遊船望向山谷與橋梁' },
        { src: './codex-clipboard-2e72e306-48c3-4434-87de-7ac8bae133b8.png', alt: '船夫划船經過保津川的紅葉河岸' },
        { src: './codex-clipboard-adc9ff68-41cd-4372-9924-630302c252d8.png', alt: '保津川上販售點心和飲料的小船' }
      ] },
      { time: '12:00', highlight: '下船  逛嵐山' },
      { time: '16:00', highlight: '搭小火車', notes: [
        { icon: '🚂', badge: '嵯峨野15號', badgeColor: 'black', details: [
          { emphasis: '16:02', suffix: ' 嵯峨→ 16:25 龜岡' },
          '富貴5號車廂  靠窗位'
        ] }
      ] },
      { time: '16:30', highlight: '到站、準備回程', notes: [
        { icon: '🚶', line: '約10分鐘' },
        '可在馬堀站附近晚餐',
        '或搭回去二條站',
        {
          icon: '🚈', line: '搭 ', badge: '山陰本線', badgeColor: 'purple', badgeSuffix: ' 普通車',
          details: ['JR馬堀→ JR二條', { bold: '車費約 ¥240', suffix: ' (20分鐘)' }]
        }
      ] }
    ] },
    { title: '12/12', subtitle: '最後衝刺  準備回家', items: [
      { time: '06:00', highlight: '一早出門  衝清水寺', notes: [
        {
          icon: '🚌', line: '四条西洞院→清水道',
          details: ['(207號)', { bold: '車費約 ¥230', suffix: ' (30分鐘)' }, '05:49→ 06:19', '06:15→ 06:45']
        },
        '⚠️ 7點就會開始有人 中午大爆炸'
      ] }
    ] }
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
  function createTripGallery(photoGroup, id, label) {
    const photos = document.createElement('div');
    photos.className = 'trip-photos' + (photoGroup.photoMode === 'overlay' && photoGroup.photos.length > 1 ? ' photo-carousel' : '');
    const gallery = document.createElement('div');
    gallery.className = 'hotel-gallery';
    gallery.id = id;
    gallery.setAttribute('aria-label', label + '照片');
    photoGroup.photos.forEach(photo => {
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
    const previous = element('button', photoGroup.photoMode === 'overlay' ? '‹' : '←');
    const next = element('button', photoGroup.photoMode === 'overlay' ? '›' : '→');
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
    return photos;
  }

  // 單日與分組共用同一套時間軸、文字與照片呈現。
  function renderItems(items, target, galleryPrefix) {
    if (items.length) {
      const list = document.createElement('ol');
      list.className = 'trip-timeline';
      items.forEach(item => {
        if (typeof item === 'string') { list.append(element('li', item)); return; }
        const row = document.createElement('li');
        if (item.time) {
          const time = element('time', item.time);
          time.dateTime = item.time;
          if (item.highlightTime) time.classList.add('timeline-time-highlight');
          row.append(time);
        }
        const content = document.createElement('div');
        content.className = 'timeline-content';
        // 黃色畫線粗體稱為「大標」；大標獨立一行，一般文字一律從下一段開始。
        if (item.highlight) {
          const title = document.createElement('p');
          title.append(element('strong', item.highlight));
          content.append(title);
        }
        if (item.text) content.append(element('p', item.text));
        const galleryId = 'trip-gallery-' + galleryPrefix + '-' + list.children.length;
        for (const [index, note] of (item.notes || []).entries()) {
          if (note.photos?.length) {
            content.append(createTripGallery(note, galleryId + '-note-' + index, note.photoLabel));
            continue;
          }
          const paragraph = document.createElement('p');
          if (typeof note === 'string') paragraph.textContent = note;
          else if (note.highlight && !note.badge) paragraph.append(element('strong', note.highlight));
          else if (note.line || note.badge) {
            paragraph.className = 'transit-note';
            if (note.routeBelow) paragraph.classList.add('transit-note-stacked');
            const line = document.createElement('span');
            line.className = 'transit-line';
            const icon = element('span', note.icon || '🚈');
            icon.setAttribute('aria-hidden', 'true');
            const label = element('span', note.line || '');
            if (note.badge) {
              const badge = element('span', note.badge);
              badge.className = 'transit-line-badge';
              if (note.badgeColor) badge.dataset.color = note.badgeColor;
              const trainName = document.createElement('span');
              trainName.className = 'transit-badge-group';
              trainName.append(badge, note.badgeSuffix || '');
              label.append(trainName);
              if (note.highlight) label.append(' ', element('strong', note.highlight));
            }
            if (note.href) {
              const link = element('a', note.text);
              link.href = note.href;
              label.append(link);
            }
            for (const detail of note.details || []) {
              label.append(document.createElement('br'));
              if (typeof detail === 'string') {
                label.append(detail);
                continue;
              }
              const text = detail.emphasis ? element('span', detail.emphasis) : element('b', detail.bold);
              if (detail.emphasis) text.className = 'time-emphasis';
              label.append(text, detail.suffix || '');
            }
            line.append(icon, label);
            paragraph.append(line);
            if (note.route) {
              const route = element('span', note.route);
              route.className = 'transit-route';
              paragraph.append(route);
            }
            if (note.followUp) {
              const followUp = typeof note.followUp === 'string'
                ? element('span', note.followUp)
                : element('b', note.followUp.bold);
              followUp.className = 'transit-follow-up';
              paragraph.append(followUp);
            }
          } else if (note.href || note.parts) {
            for (const part of note.parts || [note]) {
              if (typeof part === 'string') {
                paragraph.append(part);
                continue;
              }
              if (part.bold) {
                paragraph.append(element('b', part.bold));
                continue;
              }
              const link = element('a', part.text);
              link.href = part.href;
              link.target = '_blank';
              link.rel = 'noopener noreferrer';
              paragraph.append(link);
            }
          } else {
            const emphasis = element('span', note.emphasis);
            emphasis.className = 'time-emphasis';
            paragraph.append(note.prefix, emphasis, note.suffix);
          }
          content.append(paragraph);
        }
        if (item.photos?.length) {
          const photos = createTripGallery(item, galleryId, item.highlight);
          if (item.photosBelowHeading && item.highlight) {
            content.firstElementChild.after(photos);
          } else {
            content.append(photos);
          }
        }
        row.append(content);
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
    const content = document.createElement(note.bold ? 'strong' : 'span');
    if (typeof note === 'string') content.textContent = note;
    else if (note.dialog) {
      const trigger = element('button', note.text);
      trigger.type = 'button';
      trigger.className = 'text-link';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.addEventListener('click', () => openSchedule(note.dialog));
      content.append(note.prefix || '', trigger, note.suffix || '');
    } else {
      for (const part of note.parts || [note]) {
        if (typeof part === 'string') {
          content.append(part);
          continue;
        }
        if (part.highlight) {
          const highlight = element('span', part.highlight);
          highlight.className = 'reminder-highlight';
          content.append(highlight);
          continue;
        }
        const link = element('a', part.text);
        link.href = part.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        content.append(part.prefix || '', link, part.suffix || '');
      }
    }
    row.append(dot, content);
    return row;
  }
  function selectDay(day, index) {
    Array.from(menu.children).forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
    });
    const dayHeading = element('h3', day.title + '｜第 ' + (index + 1) + ' 天');
    if (day.subtitle) {
      const subtitle = element('span', day.subtitle);
      subtitle.className = 'day-subtitle';
      dayHeading.append(subtitle);
    }
    sheet.replaceChildren(dayHeading);
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






