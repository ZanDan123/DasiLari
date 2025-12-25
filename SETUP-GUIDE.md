# 🌸 HƯỚNG DẪN CÀI ĐẶT - ĐÀ LẠT TOURISM APP

## ✅ Đã hoàn thành

Website Đà Lạt Tourism đã được chuyển đổi sang **React + Tailwind CSS** với các tính năng:

### 🎯 Tính năng mới

1. **✨ Tour Guide tự động** 
   - Hướng dẫn người dùng lần đầu sử dụng
   - Highlight các nút chức năng
   - Có thể bật lại bằng nút "Hướng dẫn 💡"

2. **🗺️ Trang chủ là Bản đồ**
   - Không cần làm khảo sát trước
   - Vào thẳng giao diện bản đồ
   - AI đề xuất địa điểm (nếu đã làm khảo sát)

3. **📱 Responsive Design**
   - Hoạt động hoàn hảo trên Mobile (< 768px)
   - Tablet (768px - 1024px)
   - Desktop (> 1024px)
   - Không bị tràn màn hình

4. **🎨 Theme Đà Lạt**
   - Màu sắc hồng-tím-xanh đặc trưng
   - Glassmorphism effect
   - Animations mượt mà

5. **🤖 AI Recommendations**
   - Phân tích sở thích từ khảo sát
   - Đề xuất địa điểm phù hợp
   - Highlight trên sidebar

6. **🧭 Chức năng đầy đủ**
   - Chỉ đường (Google Maps)
   - Gọi xe
   - Xem thông tin chi tiết
   - Lọc theo danh mục

## 🚀 Cách chạy

### Server đang chạy tại: http://localhost:3000

Nếu server chưa chạy, mở terminal và gõ:

```bash
npm run dev
```

## 📂 Cấu trúc files

```
AI_WorkShop/
├── src/                    # Thư mục React source code
│   ├── components/         # Components tái sử dụng
│   │   ├── Layout.jsx
│   │   └── Navigation.jsx (có tour guide)
│   ├── pages/             # Các trang
│   │   ├── MapPage.jsx    (Trang chủ - Bản đồ)
│   │   ├── AboutPage.jsx  (Giới thiệu Đà Lạt)
│   │   └── SurveyPage.jsx (Khảo sát)
│   ├── App.jsx            # Main app với routing
│   └── index.css          # Tailwind CSS
├── index.html             # HTML template mới
├── index-old.html         # HTML cũ (đã backup)
├── package.json           # Dependencies
└── vite.config.js         # Vite config
```

## 🎮 Hướng dẫn sử dụng

### Lần đầu vào website:
1. Website sẽ mở trang **Bản đồ** (không cần làm khảo sát)
2. **Tour Guide** tự động xuất hiện sau 1 giây
3. Tour guide sẽ highlight và giải thích:
   - ✅ Nút Bản đồ (trang hiện tại)
   - ✅ Nút Giới thiệu
   - ✅ Nút Khảo sát
   - ✅ Phần AI đề xuất
   - ✅ Các địa điểm du lịch

### Các chức năng chính:

#### 🗺️ Trang Bản đồ (Trang chủ)
- Xem bản đồ với các địa điểm du lịch
- **Lọc theo danh mục**: Thiên nhiên, Văn hóa, Ẩm thực, v.v.
- **Nhấp vào địa điểm** để xem chi tiết
- **Chỉ đường**: Mở Google Maps
- **Gọi xe**: Kết nối dịch vụ (demo)

#### 📋 Trang Khảo sát
- Điền thông tin cá nhân
- Chọn sở thích
- AI sẽ đề xuất địa điểm phù hợp
- **Có thể bỏ qua** và vào bản đồ luôn

#### ℹ️ Trang Giới thiệu
- Thông tin về Đà Lạt
- Khí hậu, văn hóa, ẩm thực
- Mẹo du lịch

### Xem lại Tour Guide:
Nhấn nút **"Hướng dẫn 💡"** trên thanh Navigation

## 📱 Responsive Design

### Mobile (< 768px):
- Sidebar hiển thị trên cùng
- Bản đồ ở dưới
- Menu hamburger
- Touch-friendly buttons

### Tablet (768px - 1024px):
- Layout tối ưu cho màn hình trung bình
- Sidebar và map cân đối

### Desktop (> 1024px):
- Sidebar bên trái (cố định)
- Bản đồ full màn hình bên phải
- Tất cả chức năng hiển thị đầy đủ

## 🎨 Customization

### Thay đổi màu sắc:
Mở file `tailwind.config.js` và chỉnh trong phần `colors.dalat`:

```js
colors: {
  dalat: {
    pink: '#ff6b9d',    // Màu chính
    purple: '#c44569',  // Màu phụ
    blue: '#4834df',    // Accent
  }
}
```

### Thêm địa điểm mới:
Mở file `src/pages/MapPage.jsx` và thêm vào mảng `attractions`:

```js
{
  id: 7,
  name: 'Địa điểm mới',
  category: 'nature',
  lat: 11.9404,
  lng: 108.4388,
  description: 'Mô tả...',
  icon: '🌟',
}
```

## 🔧 Build cho Production

```bash
npm run build
```

Files sẽ được tạo trong thư mục `dist/`

## ❓ Troubleshooting

### Nếu website không chạy:
1. Chắc chắn đã cài Node.js (version 16+)
2. Chạy `npm install` lại
3. Xóa `node_modules/` và cài lại

### Nếu bản đồ không hiển thị:
- Kiểm tra kết nối internet
- Leaflet cần tải map tiles từ OpenStreetMap

### Nếu tour guide không xuất hiện:
- Xóa localStorage: F12 → Application → Local Storage → Clear
- Reload trang

## 📞 Liên hệ

Nếu cần hỗ trợ, vui lòng tạo issue hoặc liên hệ developer.

---

🌸 **Chúc bạn có trải nghiệm tuyệt vời với Đà Lạt Tourism!** 🌸
