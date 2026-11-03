/**
 * Mock RESTful API Server cho Module 01 & Module 02 (66 Endpoints)
 * - Cách 1 (Dán vào tab MOCKS của Postman): Ctrl+A -> Ctrl+C toàn bộ file này dán đè vào khung code Mock của Postman
 * - Cách 2 (Chạy độc lập bằng Node.js): node drawio/LessonTwo/api/mock-server.js
 */
const http = require('http');
const url = require('url');

const PORT = Number(process.env.PORT) || 8060;
const PREFIX = '/api/v1';
const NOW = '2026-11-03T15:00:00.000Z';

const db = {
  roles: [
    {
      _id: '6720f1a2b3c4d5e6f7a8b801', ID: 'ADMIN', name: 'Quản trị viên hệ thống',
      permissions: [
        'employees.read', 'employees.write', 'roles.read', 'roles.write',
        'branches.read', 'branches.write', 'warehouses.read', 'warehouses.write',
        'customers.read', 'customers.write', 'categories.read', 'categories.write',
        'units.read', 'units.write', 'subcategories.read', 'subcategories.write',
        'type_payments.read', 'type_payments.write', 'content_payments.read', 'content_payments.write'
      ],
      status: 1, createdAt: NOW, updatedAt: NOW
    },
    {
      _id: '6720f1a2b3c4d5e6f7a8b802', ID: 'WAREHOUSE_MANAGER', name: 'Quản lý kho',
      permissions: [
        'branches.read', 'warehouses.read', 'customers.read',
        'categories.read', 'categories.write', 'units.read', 'units.write',
        'subcategories.read', 'subcategories.write'
      ],
      status: 1, createdAt: NOW, updatedAt: NOW
    },
    {
      _id: '6720f1a2b3c4d5e6f7a8b803', ID: 'WAREHOUSE_STAFF', name: 'Nhân viên kho',
      permissions: ['warehouses.read', 'categories.read', 'units.read', 'subcategories.read'],
      status: 1, createdAt: NOW, updatedAt: NOW
    },
    {
      _id: '6720f1a2b3c4d5e6f7a8b804', ID: 'ACCOUNTANT', name: 'Kế toán kho',
      permissions: [
        'branches.read', 'warehouses.read', 'customers.read',
        'categories.read', 'units.read', 'subcategories.read',
        'type_payments.read', 'type_payments.write', 'content_payments.read', 'content_payments.write'
      ],
      status: 1, createdAt: NOW, updatedAt: NOW
    }
  ],
  employees: [
    {
      _id: '6720f1a2b3c4d5e6f7a8b901', ID: 'NV001', name: 'Nguyễn Văn Quản Trị', phone: '0901234567',
      role_id: '6720f1a2b3c4d5e6f7a8b801',
      warehouse_ids: ['6720f1a2b3c4d5e6f7a8b701', '6720f1a2b3c4d5e6f7a8b702'],
      status: 1, createdAt: NOW, updatedAt: NOW
    },
    {
      _id: '6720f1a2b3c4d5e6f7a8b902', ID: 'NV002', name: 'Trần Thị Thủ Kho', phone: '0902345678',
      role_id: '6720f1a2b3c4d5e6f7a8b803',
      warehouse_ids: ['6720f1a2b3c4d5e6f7a8b701'],
      status: 1, createdAt: NOW, updatedAt: NOW
    }
  ],
  branches: [
    { _id: '6720f1a2b3c4d5e6f7a8b201', ID: 'CN01', name: 'Chi nhánh Hà Nội', address: 'Số 1 Cầu Giấy, Hà Nội', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b202', ID: 'CN02', name: 'Chi nhánh TP.HCM', address: 'Số 10 Lý Thường Kiệt, Q.10, TP.HCM', status: 1, createdAt: NOW, updatedAt: NOW }
  ],
  warehouses: [
    { _id: '6720f1a2b3c4d5e6f7a8b701', ID: 'KHO01', name: 'Kho Tổng Hà Nội', phone: '0241234567', address: 'Số 1 Cầu Giấy, Hà Nội', branch_id: '6720f1a2b3c4d5e6f7a8b201', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b702', ID: 'KHO02', name: 'Kho Linh Kiện Cầu Giấy', phone: '0247654321', address: 'Số 50 Xuân Thủy, Cầu Giấy, Hà Nội', branch_id: '6720f1a2b3c4d5e6f7a8b201', status: 1, createdAt: NOW, updatedAt: NOW }
  ],
  customers: [
    { _id: '6720f1a2b3c4d5e6f7a8b301', ID: 'KH001', type: 1, name: 'Nguyễn Văn An', phone: '0987654321', gender: 1, birthday: '1995-05-15', address: ['123 Cầu Giấy, Hà Nội'], email: 'nguyenvanan@gmail.com', tax: '', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b302', ID: 'NCC001', type: 2, name: 'Công ty TNHH Phân phối Kingston', phone: '0241234567', gender: 0, birthday: null, address: ['Số 10 Duy Tân, Cầu Giấy, Hà Nội'], email: 'contact@kingston.vn', tax: '0101234567', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b303', ID: 'KT001', type: 3, name: 'Cửa hàng Sửa chữa Laptop Minh Anh', phone: '0912345678', gender: 1, birthday: null, address: ['88 Lê Thanh Nghị, Hà Nội'], email: 'minhanh@laptop.vn', tax: '', status: 1, createdAt: NOW, updatedAt: NOW }
  ],
  categories: [
    { _id: '6720f1a2b3c4d5e6f7a8b601', name: 'Linh kiện máy tính', parent_id: null, status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b602', name: 'RAM Laptop', parent_id: '6720f1a2b3c4d5e6f7a8b601', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b603', name: 'Ổ cứng SSD', parent_id: '6720f1a2b3c4d5e6f7a8b601', status: 1, createdAt: NOW, updatedAt: NOW }
  ],
  units: [
    { _id: '6720f1a2b3c4d5e6f7a8b501', name: 'Chiếc', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b502', name: 'Thanh', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b503', name: 'Bộ', status: 1, createdAt: NOW, updatedAt: NOW }
  ],
  subcategories: [
    {
      _id: '6720f1a2b3c4d5e6f7a8b401', category_id: '6720f1a2b3c4d5e6f7a8b602', unit_id: '6720f1a2b3c4d5e6f7a8b501',
      name: 'RAM Kingston Fury Beast 8GB DDR4 3200MHz', sku: 'RAM-KST-D4-8G-3200',
      price: 850000, warranty: 36, status: 1, createdAt: NOW, updatedAt: NOW
    },
    {
      _id: '6720f1a2b3c4d5e6f7a8b402', category_id: '6720f1a2b3c4d5e6f7a8b603', unit_id: '6720f1a2b3c4d5e6f7a8b501',
      name: 'SSD Samsung 980 PRO 500GB NVMe', sku: 'SSD-SS-980PRO-500G',
      price: 1650000, warranty: 60, status: 1, createdAt: NOW, updatedAt: NOW
    }
  ],
  type_payments: [
    { _id: '6720f1a2b3c4d5e6f7a8b101', name: 'Tiền mặt', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b102', name: 'Chuyển khoản ngân hàng', status: 1, createdAt: NOW, updatedAt: NOW }
  ],
  content_payments: [
    { _id: '6720f1a2b3c4d5e6f7a8b111', name: 'Thanh toán tiền hàng cho nhà cung cấp', status: 1, createdAt: NOW, updatedAt: NOW },
    { _id: '6720f1a2b3c4d5e6f7a8b112', name: 'Thanh toán tạm ứng nhập kho', status: 1, createdAt: NOW, updatedAt: NOW }
  ]
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(payload, null, 2));
}

function paginate(items, query) {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.max(1, parseInt(query.limit || '20', 10));
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return { data: { items: items.slice((page - 1) * limit, page * limit), pagination: { page, limit, total, totalPages } } };
}

function parseBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', chunk => { raw += chunk; });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch { resolve({}); }
    });
  });
}

function formatRecord(colName, raw, includeDetail = false) {
  const copy = { ...raw };
  delete copy.password;
  delete copy.unsign_search;
  if (colName === 'employees') {
    copy.warehouse_ids = Array.isArray(copy.warehouse_ids) ? copy.warehouse_ids : ['6720f1a2b3c4d5e6f7a8b701'];
    const foundRole = db.roles.find(r => r._id === copy.role_id) || db.roles[0];
    copy.role = { _id: foundRole._id, ID: foundRole.ID, name: foundRole.name };
    if (includeDetail) {
      copy.warehouses = copy.warehouse_ids.map(wid => {
        const w = db.warehouses.find(x => x._id === wid) || db.warehouses[0];
        return { _id: w._id, ID: w.ID, name: w.name };
      });
    }
  }
  if (colName === 'customers') {
    copy.gender = copy.gender !== undefined ? copy.gender : 0;
    copy.birthday = copy.birthday !== undefined ? copy.birthday : null;
    copy.address = Array.isArray(copy.address) ? copy.address : [];
    copy.email = copy.email !== undefined ? copy.email : '';
    copy.tax = copy.tax !== undefined ? copy.tax : '';
  }
  if (colName === 'subcategories') {
    delete copy.ID;
    const cat = db.categories.find(c => c._id === copy.category_id) || db.categories[1];
    const unit = db.units.find(u => u._id === copy.unit_id) || db.units[0];
    copy.category = { _id: cat._id, name: cat.name };
    copy.unit = { _id: unit._id, name: unit.name };
    copy.sku = copy.sku !== undefined ? copy.sku : null;
    copy.price = copy.price !== undefined ? copy.price : 0;
    copy.warranty = copy.warranty !== undefined ? copy.warranty : 0;
  }
  return copy;
}

const RESOURCE_MAP = {
  'roles': 'roles', 'employees': 'employees', 'branches': 'branches', 'warehouses': 'warehouses',
  'customers': 'customers', 'categories': 'categories', 'units': 'units', 'subcategories': 'subcategories',
  'type-payments': 'type_payments', 'content-payments': 'content_payments'
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return sendJson(res, 200, {});

  const parsed = url.parse(req.url, true);
  const query = parsed.query || {};
  const cleanPath = (parsed.pathname || '')
    .replace(/^\/api\/v1\/https?:\/\/[^/]+/, '')
    .replace(/^\/https?:\/\/[^/]+/, '');

  // Hỗ trợ linh hoạt cả khi URL có /api/v1 hoặc không có /api/v1 (khi dán vào Postman Local Mock)
  const subPath = (cleanPath.startsWith(PREFIX) ? cleanPath.slice(PREFIX.length) : cleanPath)
    .replace(/^\/+|\/+$/g, '');
  const [resource, param1, param2] = subPath.split('/');
  const body = await parseBody(req);

  if (resource === 'auth') {
    if (param1 === 'login' && req.method === 'POST') {
      return sendJson(res, 200, {
        data: {
          access_token: 'mock_jwt_access_token_2026_valid',
          refresh_token: 'mock_jwt_refresh_token_2026_valid',
          employee: formatRecord('employees', db.employees[0], false)
        }
      });
    }
    if ((param1 === 'refresh-token' || param1 === 'refresh') && req.method === 'POST') {
      return sendJson(res, 200, {
        data: { access_token: 'mock_jwt_access_token_refreshed_2026', refresh_token: 'mock_jwt_refresh_token_refreshed_2026' }
      });
    }
    if (param1 === 'logout' && req.method === 'POST') return sendJson(res, 200, { data: { message: 'Đăng xuất thành công' } });
    if (param1 === 'password' && req.method === 'PUT') return sendJson(res, 200, { data: { message: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại' } });
  }

  if (resource === 'categories' && param1 === 'tree' && req.method === 'GET') {
    const roots = db.categories.filter(c => !c.parent_id).map(r => ({
      _id: r._id, name: r.name, parent_id: null, status: r.status,
      children: db.categories.filter(c => c.parent_id === r._id).map(ch => ({
        _id: ch._id, name: ch.name, parent_id: ch.parent_id, status: ch.status, children: []
      }))
    }));
    return sendJson(res, 200, { data: roots });
  }

  if (resource === 'subcategories' && param1 === 'lookup' && req.method === 'GET') {
    const code = (query.code || '').toUpperCase();
    const found = db.subcategories.find(s => (s.sku || '').toUpperCase() === code) || db.subcategories[0];
    return sendJson(res, 200, { data: formatRecord('subcategories', found, true) });
  }

  const colName = RESOURCE_MAP[resource];
  if (!colName) return sendJson(res, 404, { error: { code: 'NOT_FOUND', message: `Không tìm thấy tài nguyên ${resource}` } });

  const list = db[colName];
  if (!param1 && req.method === 'GET') {
    let filtered = [...list];
    if (query.type) filtered = filtered.filter(x => String(x.type) === String(query.type));
    return sendJson(res, 200, paginate(filtered.map(item => formatRecord(colName, item, false)), query));
  }
  if (!param1 && req.method === 'POST') {
    const newItem = formatRecord(colName, { _id: '6720f1a2b3c4d5e6f7a8b999', ...body, status: body.status ?? 1, createdAt: NOW, updatedAt: NOW }, false);
    return sendJson(res, 201, { data: newItem });
  }

  const baseItem = list.find(x => x._id === param1) || list[0];
  if (param1 && !param2 && req.method === 'GET') return sendJson(res, 200, { data: formatRecord(colName, baseItem, true) });
  if (param1 && !param2 && req.method === 'PUT') return sendJson(res, 200, { data: formatRecord(colName, { ...baseItem, ...body, updatedAt: NOW }, false) });
  if (param1 && param2 && req.method === 'PUT') {
    if (param2 === 'password') return sendJson(res, 200, { data: { message: 'Đặt lại mật khẩu thành công' } });
    return sendJson(res, 200, { data: formatRecord(colName, { ...baseItem, ...body, updatedAt: NOW }, false) });
  }
  if (param1 && !param2 && req.method === 'DELETE') {
    return sendJson(res, 200, { data: { _id: baseItem._id, deleted: true, message: `Xóa ${resource} thành công` } });
  }
  return sendJson(res, 404, { error: { code: 'NOT_FOUND', message: 'Route không tồn tại' } });
});

server.listen(PORT, () => process.stdout.write(`Mock server on port ${PORT}\n`));
