# travel-site：給協作 AI 的指引

## 網站用途與範圍
- 將規劃完成的旅行行程做成網頁，分享連結給同行親友，主要以手機閱讀。
- 帳號與專案：goodjie-eb/travel-site（Public），主要分支 main。
- 網址：https://goodjie-eb.github.io/travel-site/
- 初始版本只建立環境與測試頁；不要自行虛構旅行日期、訂房、景點或交通安排。
- 使用者日後透過聊天提供行程，再逐步新增；保留既有旅行，不因新增行程覆蓋舊資料。

## 溝通與隱私規則
- 使用者完全不懂程式。說明一律用繁體中文白話，避免未解釋的術語。
- 需要使用者操作時，一次只給一個具體步驟，說明按鈕名稱，等她回覆完成再繼續。
- 不要求使用者在電腦安裝開發工具。能由 AI 完成的檔案修改、檢查與發布，由 AI 處理。
- 網站和原始碼均公開。如果使用者要放訂房代號、證件、電話、地址或其他個人資料，必須在寫入或發布前提醒她，優先建議移除、遮蔽或改用私人管道分享。
- noindex 只是請搜尋引擎不要收錄，不是密碼保護；不可宣稱網站私密或保證完全不被搜尋。
- 不把密碼、存取權杖、驗證碼或任何秘密放入檔案、提交記錄、Actions 或聊天。

## 技術選擇
使用原生 HTML/CSS/JavaScript 靜態網站，沒有套件安裝或建置依賴。網頁與旅行資料分開，適合逐次增加行程，也方便 AI 維護。沒有後端、資料庫、登入或付費服務。

## 專案結構
- site/index.html：網站首頁、共用畫面與手機優先樣式；含搜尋引擎 noindex 設定。
- site/trips.js：集中管理 trips 陣列與安全的 DOM 呈現。每趟旅行包含 title、dates、days；每天包含 title、items。空陣列顯示尚未安排的提示。
- site/assets/：未來需要圖片時再新增；使用描述清楚的檔名與替代文字。
- .github/workflows/pages.yml：GitHub Actions 檢查與發布；僅將 site/ 發布至 Pages。
- AGENTS.md：本指引。
- README.md：專案簡介。

## 修改與發布規則
- 新增行程優先修改 site/trips.js 的資料；調整外觀修改 site/index.html。隨需求增加才分拆檔案，不任意引入框架或依賴。
- 手機優先：320px 至 430px 不得水平溢出，正文保持清楚可讀，點擊區域至少 44px；桌面也要可閱讀。
- GitHub Pages 是專案子路徑 /travel-site/。使用 ./trips.js、./assets/photo.jpg 等相對路徑，禁止把站內資源寫成 /assets/... 這種網站根路徑。
- 若新增巢狀頁面，正確計算相對路徑，實際開啟該頁與重新整理測試，不能依靠開發伺服器的路由回退。
- 每個 HTML 頁面都必須保留 robots noindex, nofollow 設定；不可用 robots.txt 的全面封鎖取代 noindex，避免搜尋引擎無法讀到 noindex。
- 行程文字以 textContent 呈現，不把使用者內容直接拼接至 innerHTML。
- 所有改動提交或合併至 main 後，自動觸發 GitHub Actions；也保留 workflow_dispatch 手動重跑功能。
- Pages 設定的 Source 必須是 GitHub Actions。工作流程只需要 contents: read、pages: write、id-token: write。
- 修改後檢查 JavaScript 語法、連結與資源路徑，使用手機尺寸檢視，確認 Actions 成功與正式網址正常顯示後才回報發布完成。
- 不需要為簡單文案修改增加大量測試。若無法檢查，清楚說明限制，不假稱成功。

## 之後如何協助使用者
使用者可以回到原本的 AI 聊天，說「請修改 goodjie-eb/travel-site，先讀 AGENTS.md」，再用白話說需求。若新的 AI 沒有此 repo 的權限，要明確說明，帶她逐步連接正確的 GitHub 帳號；不能誤用其他帳號。
