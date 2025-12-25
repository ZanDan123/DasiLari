import React from 'react'
import { Link } from 'react-router-dom'
import { Thermometer, Mountain, Building2, Coffee, Palette, Heart, MapPin, Plane, Backpack, Clock, DollarSign, Lightbulb } from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: <Thermometer className="w-12 h-12" />,
      title: 'Khí hậu hoàn hảo',
      description: 'Nằm ở độ cao 1.500m, Đà Lạt có khí hậu mát mẻ quanh năm với nhiệt độ 15-24°C. Buổi sáng sương mù lãng mạn và buổi chiều ấm áp dễ chịu.',
    },
    {
      icon: <Mountain className="w-12 h-12" />,
      title: 'Thiên nhiên tuyệt đẹp',
      description: 'Nổi tiếng với rừng thông, vườn hoa và hồ nước thơ mộng. Đà Lạt là điểm đến hàng đầu cho những người yêu thiên nhiên.',
    },
    {
      icon: <Building2 className="w-12 h-12" />,
      title: 'Di sản thuộc địa Pháp',
      description: 'Được xây dựng như một thành phố nghỉ dưỡng bởi người Pháp vào những năm 1890, Đà Lạt vẫn giữ được kiến trúc thuộc địa quyến rũ.',
    },
    {
      icon: <Coffee className="w-12 h-12" />,
      title: 'Văn hóa cà phê',
      description: 'Đà Lạt được bao quanh bởi các đồn điền cà phê sản xuất hạt Arabica tốt nhất Việt Nam. Thành phố có văn hóa quán cà phê nghệ thuật độc đáo.',
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: 'Nghệ thuật & Lãng mạn',
      description: 'Thường được gọi là "Thành phố tình yêu", Đà Lạt là điểm đến tuần trăng mật yêu thích. Đây cũng là trung tâm nghệ thuật với phòng trưng bày và kiến trúc sáng tạo.',
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Nông sản tươi & Hoa',
      description: 'Vùng này sản xuất dâu tây, atisô, bơ tốt nhất Việt Nam và đa dạng loài hoa tuyệt đẹp. Ghé thăm các trang trại và chợ địa phương.',
    },
  ]

  const infoBoxes = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Vị trí',
      content: 'Tây Nguyên Việt Nam, tỉnh Lâm Đồng, cách TP. Hồ Chí Minh khoảng 300km về phía đông bắc',
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: 'Cách đến',
      items: [
        'Máy bay: Sân bay Liên Khương (30km từ trung tâm) - 45 phút lái xe',
        'Xe khách: 6-8 giờ từ TP.HCM, 4-5 giờ từ Nha Trang',
        'Xe riêng: Đường núi đẹp với cảnh quan tuyệt vời',
      ],
    },
    {
      icon: <Backpack className="w-8 h-8" />,
      title: 'Đồ cần mang',
      items: [
        'Áo khoác nhẹ (buổi tối có thể lạnh, 15°C)',
        'Giày thoải mái để đi bộ khám phá',
        'Máy ảnh để chụp những khoảnh khắc tuyệt đẹp',
        'Áo mưa trong mùa mưa (tháng 5-10)',
      ],
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Thời điểm tốt nhất',
      items: [
        'Mùa khô (11-3): Thời tiết lý tưởng, bầu trời trong xanh',
        'Mùa lễ hội (12-1): Lễ hội hoa và các ngày lễ',
        'Mùa mưa (4-10): Ít du khách, cây cối xanh tươi, thỉnh thoảng có mưa',
      ],
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Mẹo địa phương',
      items: [
        'Thử đặc sản: rượu dâu, trà atisô, và bánh tráng nướng',
        'Thuê xe máy để khám phá theo tốc độ của bạn',
        'Ghé chợ đêm để ăn uống và mua quà lưu niệm',
        'Hầu hết các điểm tham quan có phí vào cửa ($2-5 USD)',
        'Tiếng Anh được nói ở các khu du lịch',
      ],
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Tiền tệ & Chi phí',
      items: [
        'Tiền tệ: Đồng Việt Nam (VND)',
        'Bữa ăn trung bình: $2-10 USD',
        'Chỗ ở: $10-100+ USD/đêm',
        'Vé tham quan: $1-5 USD',
        'ATM rộng rãi, thẻ tín dụng được chấp nhận ở khách sạn',
      ],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 space-y-6 md:space-y-8">
      {/* Hero Section */}
      <div className="glass-card p-6 md:p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="text-[200px] md:text-[300px]">🌸</div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent mb-4 relative z-10">
          Chào mừng đến Đà Lạt
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-semibold relative z-10">
          Thành phố ngàn hoa - Thủ phủ du lịch Tây Nguyên
        </p>
      </div>

      {/* Features Grid */}
      <div className="glass-card p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent mb-6 md:mb-10">
          Điểm nổi bật của Đà Lạt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl border-2 border-transparent hover:border-dalat-pink/30 transition-all duration-300 hover:shadow-dalat-hover hover:-translate-y-2 group"
            >
              <div className="text-dalat-pink mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-dalat-purple mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Information Boxes */}
      <div className="glass-card p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent mb-6 md:mb-10">
          Thông tin cần biết
        </h2>
        <div className="space-y-4 md:space-y-6">
          {infoBoxes.map((box, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-white/80 to-gray-50/80 p-4 md:p-6 rounded-2xl border-l-4 md:border-l-6 border-dalat-pink hover:translate-x-2 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="text-dalat-pink flex-shrink-0 mt-1">
                  {box.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-dalat-purple mb-3">
                    {box.title}
                  </h3>
                  {box.content && (
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {box.content}
                    </p>
                  )}
                  {box.items && (
                    <ul className="space-y-2 text-sm md:text-base text-gray-700">
                      {box.items.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-dalat-pink mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="glass-card p-8 md:p-12 text-center bg-gradient-to-br from-dalat-pink/10 to-dalat-blue/10">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent mb-4">
          Sẵn sàng khám phá?
        </h2>
        <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 font-medium">
          Bắt đầu lên kế hoạch cho chuyến phiêu lưu Đà Lạt hoàn hảo với bản đồ hỗ trợ AI
        </p>
        <Link
          to="/"
          className="inline-block dalat-button text-base md:text-lg"
        >
          Khám phá bản đồ Đà Lạt 🗺️
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
