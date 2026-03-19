# 第七週作業：第三方套件實戰整合

## 學習目標

本週學習使用第三方套件優化電商系統：
- **dayjs**：日期處理套件
- **axios**：HTTP 請求套件
- 資料驗證與 ID 產生

---

## Step 1：環境準備

### 1.1 進入作業資料夾

```bash
cd 2025-js-plan/week7/assignment
```

### 1.2 安裝套件

```bash
npm install
```

這會安裝 `dayjs`、`axios`、`dotenv`、`jest` 等套件。

### 1.3 確認 .env 設定

請確認專案根目錄的 `.env` 檔案有正確的 API 設定：

```
API_PATH=你的API路徑
API_KEY=你的API金鑰
```

---

## Step 2：了解作業內容

### 2.1 檔案結構

```
week7/assignment/
├── package.json     # 套件設定
├── homework.js      # 作業檔案（你要編輯的）
├── test.js          # Jest 測試檔案
└── README.md        # 本說明文件
```

### 2.2 作業任務總覽

| 任務 | 配分 | 說明 |
|------|------|------|
| 任務一 | 25% | dayjs 日期處理 |
| 任務二 | 20% | 資料驗證 |
| 任務三 | 10% | ID 產生 |
| 任務四 | 20% | Axios API 串接 |
| 任務五 | 25% | OrderService 整合 |

---

## Step 3：完成各項任務

### 任務一：dayjs 日期處理 (25%)

需完成以下函式：

| 函式名稱 | 說明 | 提示 |
|----------|------|------|
| `formatOrderDate(timestamp)` | 將 Unix timestamp 轉為 `YYYY/MM/DD HH:mm` | `dayjs.unix(timestamp).format()` |
| `getDaysAgo(timestamp)` | 計算距今幾天，回傳 `"3 天前"` 或 `"今天"` | `dayjs().diff()` |
| `isOrderOverdue(timestamp)` | 判斷是否超過 7 天 | 回傳 boolean |
| `getThisWeekOrders(orders)` | 篩選本週的訂單 | `startOf('week')`, `endOf('week')` |

**dayjs 常用語法：**

```javascript
const dayjs = require('dayjs');

// 取得今天
dayjs();

// Unix timestamp 轉換
dayjs.unix(1704067200);

// 格式化輸出
dayjs().format('YYYY/MM/DD HH:mm');

// 計算天數差異
dayjs().diff(dayjs.unix(timestamp), 'day');

// 本週開始/結束
dayjs().startOf('week');
dayjs().endOf('week');
```

### 任務二：資料驗證 (20%)

需完成以下函式：

| 函式名稱 | 說明 |
|----------|------|
| `validateOrderUser(data)` | 驗證訂單使用者資料 |
| `validateCartQuantity(quantity)` | 驗證購物車數量 |

**validateOrderUser 驗證規則：**

| 欄位 | 規則 |
|------|------|
| `name` | 不可為空 |
| `tel` | 必須是 09 開頭的 10 位數字 |
| `email` | 必須包含 @ 符號 |
| `address` | 不可為空 |
| `payment` | 必須是 `'ATM'`, `'Credit Card'`, `'Apple Pay'` 其中之一 |

**回傳格式：**

```javascript
// 驗證成功
{ isValid: true, errors: [] }

// 驗證失敗
{ isValid: false, errors: ['姓名不可為空', '電話格式錯誤'] }
```

**validateCartQuantity 驗證規則：**
- 必須是正整數
- 不可小於 1
- 不可大於 99

### 任務三：ID 產生 (10%)

需完成以下函式：

| 函式名稱 | 說明 | 格式 |
|----------|------|------|
| `generateOrderId()` | 產生訂單編號 | `'ORD-xxxxxxxx'` |
| `generateCartItemId()` | 產生購物車項目 ID | `'CART-xxxxxxxx'` |

**提示：**

```javascript
// 產生唯一識別碼
Date.now().toString(36) + Math.random().toString(36).slice(2)
```

### 任務四：Axios API 串接 (20%)

需完成以下函式：

| 函式名稱 | 說明 |
|----------|------|
| `getProductsWithAxios()` | 取得產品列表 |
| `addToCartWithAxios(productId, quantity)` | 加入購物車 |
| `getOrdersWithAxios()` | 取得訂單（需認證） |

**Axios vs Fetch 比較：**

```javascript
// Axios - 自動解析 JSON
const response = await axios.get(url);
const data = response.data;

// Fetch - 需要手動解析
const response = await fetch(url);
const data = await response.json();
```

**Axios 請求範例：**

```javascript
// GET 請求
const response = await axios.get(url);

// POST 請求
const response = await axios.post(url, { data: value });

// 帶 Header 的請求
const response = await axios.get(url, {
  headers: { authorization: token }
});
```

### 任務五：OrderService 整合 (25%)

需在 `OrderService` 物件中完成以下方法：

| 方法名稱 | 說明 |
|----------|------|
| `fetchOrders()` | 使用 axios 取得訂單 |
| `formatOrders(orders)` | 為每筆訂單加上 `formattedDate` 欄位 |
| `filterUnpaidOrders(orders)` | 篩選 `paid: false` 的訂單 |

---

## Step 4：測試與驗證

### 4.1 基本測試（快速檢查）

```bash
node homework.js
```

這會執行 `homework.js` 底部的測試程式，快速檢查函式是否有正確回傳。

### 4.2 Jest 完整測試

```bash
npm test
```

測試項目（共 20 項）：

| 測試群組 | 測試數量 | 說明 |
|----------|----------|------|
| 任務一：dayjs 日期處理 | 7 項 | formatOrderDate, getDaysAgo, isOrderOverdue, getThisWeekOrders |
| 任務二：資料驗證 | 6 項 | validateOrderUser, validateCartQuantity |
| 任務三：ID 產生 | 4 項 | generateOrderId, generateCartItemId |
| 任務四：Axios API | 2 項 | getProductsWithAxios |
| 任務五：OrderService | 4 項 | formatOrders, filterUnpaidOrders |

### 4.3 測試通過範例

```
 PASS  ./test.js
  任務一：dayjs 日期處理
    formatOrderDate
      ✓ 應回傳字串
      ✓ 格式應包含 / 和 :
    getDaysAgo
      ✓ 應回傳字串
      ✓ 應包含 "天" 或 "今天"
    ...

Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
```

---

## API 參考

### LiveJS API 端點

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | `/api/livejs/v1/customer/{api_path}/products` | 取得產品列表 |
| GET | `/api/livejs/v1/customer/{api_path}/carts` | 取得購物車 |
| POST | `/api/livejs/v1/customer/{api_path}/carts` | 加入購物車 |
| GET | `/api/livejs/v1/admin/{api_path}/orders` | 取得訂單（需認證） |

### 認證方式

管理員 API 需要在 Header 帶入 token：

```javascript
headers: {
  authorization: process.env.API_KEY
}
```

---

## 常見問題

### Q1: 測試顯示 API_PATH 未定義？

確認 `.env` 檔案位置正確，應在專案根目錄（`2025-js-plan/` 資料夾）。

### Q2: dayjs 怎麼處理本週判斷？

```javascript
const orderDate = dayjs.unix(timestamp);
const weekStart = dayjs().startOf('week');
const weekEnd = dayjs().endOf('week');

// 檢查是否在本週範圍內
const isThisWeek = orderDate.isAfter(weekStart) && orderDate.isBefore(weekEnd);
```

### Q3: axios 和 fetch 的主要差異？

1. **JSON 解析**：axios 自動解析，fetch 需要 `.json()`
2. **錯誤處理**：axios 會在非 2xx 時拋出錯誤，fetch 只在網路錯誤時拋出
3. **請求攔截**：axios 支援攔截器，fetch 不支援

### Q4: 驗證函式回傳格式是什麼？

```javascript
// validateOrderUser
{ isValid: boolean, errors: string[] }

// validateCartQuantity
{ isValid: boolean, error?: string }
```

---

## 繳交方式

1. 完成 `homework.js` 中的所有函式
2. 執行 `npm test` 確保所有測試通過
3. 將程式碼上傳至 GitHub
4. 提交 GitHub 連結

---

## 參考解答

完成作業後，可參考 `solution/` 資料夾中的解答。
