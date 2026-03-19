// ========================================
// 第七週作業 Jest 測試
// 執行方式：npm test
// ========================================

// 載入環境變數
require('dotenv').config({ path: '../../.env' });

const homework = require('./homework.js');

// 測試超時設定
jest.setTimeout(30000);

// 測試資料
const testOrders = [
  { id: 'order-1', createdAt: Math.floor(Date.now() / 1000) - 86400 * 3, paid: false },
  { id: 'order-2', createdAt: Math.floor(Date.now() / 1000) - 86400 * 10, paid: true },
  { id: 'order-3', createdAt: Math.floor(Date.now() / 1000), paid: false }
];

// ========================================
// 任務一：dayjs 日期處理 (25%)
// ========================================
describe('任務一：dayjs 日期處理', () => {

  describe('formatOrderDate', () => {
    const timestamp = 1704067200; // 2024/01/01

    test('應回傳字串', () => {
      const result = homework.formatOrderDate(timestamp);
      expect(typeof result).toBe('string');
    });

    test('格式應包含 / 和 :', () => {
      const result = homework.formatOrderDate(timestamp);
      expect(result).toMatch(/\//);
      expect(result).toMatch(/:/);
    });
  });

  describe('getDaysAgo', () => {
    test('應回傳字串', () => {
      const result = homework.getDaysAgo(testOrders[0].createdAt);
      expect(typeof result).toBe('string');
    });

    test('應包含 "天" 或 "今天"', () => {
      const result = homework.getDaysAgo(testOrders[0].createdAt);
      expect(result).toMatch(/天|今/);
    });
  });

  describe('isOrderOverdue', () => {
    test('應回傳布林值', () => {
      const result = homework.isOrderOverdue(testOrders[1].createdAt);
      expect(typeof result).toBe('boolean');
    });

    test('10 天前應回傳 true', () => {
      const result = homework.isOrderOverdue(testOrders[1].createdAt);
      expect(result).toBe(true);
    });

    test('3 天前應回傳 false', () => {
      const result = homework.isOrderOverdue(testOrders[0].createdAt);
      expect(result).toBe(false);
    });
  });

  describe('getThisWeekOrders', () => {
    test('應回傳陣列', () => {
      const result = homework.getThisWeekOrders(testOrders);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});

// ========================================
// 任務二：資料驗證 (20%)
// ========================================
describe('任務二：資料驗證', () => {

  describe('validateOrderUser', () => {
    const validUser = {
      name: '王小明',
      tel: '0912345678',
      email: 'test@example.com',
      address: '台北市信義區',
      payment: 'Credit Card'
    };

    const invalidUser = {
      name: '',
      tel: '1234',
      email: 'invalid',
      address: '',
      payment: 'Bitcoin'
    };

    test('有效資料應回傳物件', () => {
      const result = homework.validateOrderUser(validUser);
      expect(typeof result).toBe('object');
      expect(result).not.toBeNull();
    });

    test('有效資料 isValid 應為 true', () => {
      const result = homework.validateOrderUser(validUser);
      expect(result.isValid).toBe(true);
    });

    test('無效資料 isValid 應為 false', () => {
      const result = homework.validateOrderUser(invalidUser);
      expect(result.isValid).toBe(false);
    });

    test('無效資料應有 errors 陣列', () => {
      const result = homework.validateOrderUser(invalidUser);
      expect(Array.isArray(result.errors)).toBe(true);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateCartQuantity', () => {
    test('數量 5 應 isValid 為 true', () => {
      const result = homework.validateCartQuantity(5);
      expect(result.isValid).toBe(true);
    });

    test('數量 0 應 isValid 為 false', () => {
      const result = homework.validateCartQuantity(0);
      expect(result.isValid).toBe(false);
    });

    test('數量 100 應 isValid 為 false', () => {
      const result = homework.validateCartQuantity(100);
      expect(result.isValid).toBe(false);
    });
  });
});

// ========================================
// 任務三：ID 產生 (10%)
// ========================================
describe('任務三：ID 產生', () => {

  describe('generateOrderId', () => {
    test('應回傳字串', () => {
      const result = homework.generateOrderId();
      expect(typeof result).toBe('string');
    });

    test('應以 ORD- 開頭', () => {
      const result = homework.generateOrderId();
      expect(result.startsWith('ORD-')).toBe(true);
    });

    test('每次產生應不同', () => {
      const id1 = homework.generateOrderId();
      const id2 = homework.generateOrderId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('generateCartItemId', () => {
    test('應回傳字串', () => {
      const result = homework.generateCartItemId();
      expect(typeof result).toBe('string');
    });

    test('應以 CART- 開頭', () => {
      const result = homework.generateCartItemId();
      expect(result.startsWith('CART-')).toBe(true);
    });
  });
});

// ========================================
// 任務四：Axios API 串接 (20%)
// ========================================
describe('任務四：Axios API 串接', () => {

  describe('getProductsWithAxios', () => {
    test('應回傳陣列', async () => {
      if (!homework.API_PATH) {
        console.log('提示：請在 .env 設定 API_PATH');
        return;
      }

      const result = await homework.getProductsWithAxios();
      expect(Array.isArray(result)).toBe(true);
    });

    test('應有產品資料', async () => {
      if (!homework.API_PATH) return;

      const result = await homework.getProductsWithAxios();
      expect(result.length).toBeGreaterThan(0);
    });
  });
});

// ========================================
// 任務五：OrderService 整合 (25%)
// ========================================
describe('任務五：OrderService 整合', () => {

  describe('formatOrders', () => {
    test('應回傳陣列', () => {
      const result = homework.OrderService.formatOrders(testOrders);
      expect(Array.isArray(result)).toBe(true);
    });

    test('應加上 formattedDate 欄位', () => {
      const result = homework.OrderService.formatOrders(testOrders);
      expect(result[0]).toHaveProperty('formattedDate');
    });
  });

  describe('filterUnpaidOrders', () => {
    test('應回傳陣列', () => {
      const result = homework.OrderService.filterUnpaidOrders(testOrders);
      expect(Array.isArray(result)).toBe(true);
    });

    test('應正確篩選未付款訂單（2 筆）', () => {
      const result = homework.OrderService.filterUnpaidOrders(testOrders);
      expect(result.length).toBe(2);
    });
  });
});
