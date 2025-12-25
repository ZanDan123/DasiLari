# Đà Lạt Tourism Guide - React + Tailwind CSS

Ứng dụng du lịch Đà Lạt với giao diện hiện đại, responsive và tích hợp AI để đề xuất địa điểm tham quan.

## 🚀 Tính năng

- ✅ **Giao diện React + Tailwind CSS** - Hiện đại và responsive
- ✅ **Tour Guide tự động** - Hướng dẫn người dùng lần đầu sử dụng
- ✅ **Bản đồ tương tác** - Hiển thị các địa điểm du lịch với Leaflet
- ✅ **AI Recommendations** - Đề xuất địa điểm dựa trên sở thích
- ✅ **Responsive Design** - Hoạt động mượt mà trên mobile, tablet, desktop
- ✅ **Chỉ đường & Gọi xe** - Tích hợp với Google Maps
- ✅ **Khảo sát tùy chọn** - Không bắt buộc làm khảo sát

## 📦 Cài đặt

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ tự động mở tại `http://localhost:3000`

### Bước 3: Build cho production

```bash
npm run build
```

## 🎨 Cấu trúc Project

```
AI_WorkShop/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Layout chính
│   │   └── Navigation.jsx      # Navigation bar với tour guide
│   ├── pages/
│   │   ├── MapPage.jsx         # Trang bản đồ (trang chủ)
│   │   ├── AboutPage.jsx       # Trang giới thiệu
│   │   └── SurveyPage.jsx      # Trang khảo sát
│   ├── App.jsx                 # App chính với routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind CSS
├── index-new.html              # HTML template
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎯 Hướng dẫn sử dụng

1. **Lần đầu vào website**: Tour guide sẽ tự động xuất hiện để hướng dẫn các chức năng
2. **Bản đồ (Trang chủ)**: 
   - Xem các địa điểm du lịch trên bản đồ
   - Lọc theo danh mục
   - Nhấn vào địa điểm để xem chi tiết
   - Sử dụng "Chỉ đường" hoặc "Gọi xe"
3. **Giới thiệu**: Tìm hiểu về Đà Lạt
4. **Khảo sát**: Làm khảo sát để nhận đề xuất từ AI (tùy chọn)

## 🎨 Theme màu sắc Đà Lạt

- **Pink**: #ff6b9d (Màu hoa)
- **Purple**: #c44569 (Màu lavender)
- **Blue**: #4834df (Bầu trời Đà Lạt)
- **Gradient**: Từ tím đến hồng, phù hợp với phong cảnh Đà Lạt

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Technologies

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS 3** - Styling
- **React Router 6** - Routing
- **React Leaflet** - Maps
- **React Joyride** - Tour guide
- **Lucide React** - Icons

## 💡 Tips

- Tour guide chỉ hiển thị 1 lần. Để xem lại, nhấn nút "Hướng dẫn 💡"
- Khảo sát được lưu trong localStorage
- Bản đồ yêu cầu kết nối internet để tải tiles

## 📄 License

MIT License - Free to use

---

Made with ❤️ for Đà Lạt travelers
