import React, { createContext, useContext, useState, useEffect } from 'react'

// Translations for English, Vietnamese, Korean
const translations = {
  en: {
    // Navigation
    nav: {
      map: 'Map',
      about: 'About',
      survey: 'Survey',
      buddies: 'Buddies',
      itinerary: 'Itinerary',
      photos: 'Photos',
    },
    // Footer
    footer: {
      brandName: '🌸 DasiLari',
      tagline: 'Your Smart Travel Companion in Da Lat',
      quickLinks: 'Quick Links',
      about: 'About',
      aboutText: 'DasiLari uses AI to help you discover the best of Da Lat. Get personalized recommendations, find travel buddies, and create unforgettable memories in Vietnam\'s beautiful highland city.',
      copyright: '© 2025 DasiLari. All rights reserved. Made with ❤️ for travelers.',
      contactUs: 'Contact Us',
      contactText: 'Have questions or feedback? Send us a message!',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      yourMessage: 'Your Message...',
      sending: 'Sending...',
      sendMessage: 'Send Message',
      messageSent: '✅ Message sent successfully! We\'ll get back to you soon.',
      language: 'Language',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      submit: 'Submit',
      cancel: 'Cancel',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      readMore: 'Read More',
      viewMore: 'View More',
      showLess: 'Show Less',
      showGuide: 'Show Guide',
      exploreMap: 'Explore Da Lat Map 🗺️',
    },
    // About Page
    aboutPage: {
      welcomeTitle: 'Welcome to Da Lat',
      welcomeSubtitle: 'City of Eternal Spring - Vietnam\'s Beloved Highland Retreat',
      highlightsTitle: 'Da Lat Highlights',
      essentialInfo: 'Essential Information',
      readyToExplore: 'Ready to Explore?',
      startPlanning: 'Start planning your perfect Da Lat adventure with our AI-powered map',
      tourWelcome: 'Welcome to the About page! Learn everything about Da Lat - the City of Eternal Spring. 🌸',
      features: {
        climate: {
          title: 'Perfect Climate',
          description: 'At 1,500m altitude, Da Lat enjoys cool weather year-round with temperatures of 15-24°C. Mornings are romantically misty and afternoons pleasantly warm.',
        },
        nature: {
          title: 'Stunning Nature',
          description: 'Famous for its pine forests, flower gardens, and serene lakes. Da Lat is a top destination for nature lovers.',
        },
        heritage: {
          title: 'French Colonial Heritage',
          description: 'Built as a hill station by the French in the 1890s, Da Lat retains charming colonial architecture.',
        },
        coffee: {
          title: 'Coffee Culture',
          description: 'Da Lat is surrounded by coffee plantations producing Vietnam\'s finest Arabica beans. The city has a unique artisan coffee shop culture.',
        },
        arts: {
          title: 'Arts & Romance',
          description: 'Often called the "City of Love", Da Lat is a favorite honeymoon destination. It\'s also an arts hub with galleries and creative architecture.',
        },
        produce: {
          title: 'Fresh Produce & Flowers',
          description: 'The region produces Vietnam\'s best strawberries, artichokes, avocados, and a stunning variety of flowers. Visit local farms and markets.',
        },
      },
      info: {
        location: {
          title: 'Location',
          content: 'Central Highlands of Vietnam, Lam Dong Province, about 300km northeast of Ho Chi Minh City',
        },
        howToGet: {
          title: 'How to Get Here',
          items: [
            'By Air: Lien Khuong Airport (30km from city center) - 45 min drive',
            'By Bus: 6-8 hours from HCMC, 4-5 hours from Nha Trang',
            'By Car: Scenic mountain roads with stunning views',
          ],
        },
        whatToBring: {
          title: 'What to Bring',
          items: [
            'Light jacket (evenings can be cool, 15°C)',
            'Comfortable walking shoes for exploring',
            'Camera to capture stunning moments',
            'Rain gear during rainy season (May-October)',
          ],
        },
        bestTime: {
          title: 'Best Time to Visit',
          items: [
            'Dry Season (Nov-Mar): Ideal weather, clear skies',
            'Festival Season (Dec-Jan): Flower festivals and holidays',
            'Rainy Season (Apr-Oct): Fewer tourists, lush greenery, occasional showers',
          ],
        },
        tips: {
          title: 'Local Tips',
          items: [
            'Try local specialties: strawberry wine, artichoke tea, and banh trang nuong',
            'Rent a motorbike to explore at your own pace',
            'Visit the night market for food and souvenirs',
            'Most attractions charge entrance fees ($2-5 USD)',
            'English is spoken in tourist areas',
          ],
        },
        currency: {
          title: 'Currency & Costs',
          items: [
            'Currency: Vietnamese Dong (VND)',
            'Average meal: $2-10 USD',
            'Accommodation: $10-100+ USD/night',
            'Attraction tickets: $1-5 USD',
            'ATMs widely available, credit cards accepted at hotels',
          ],
        },
      },
    },
    // Pages
    pages: {
      map: {
        title: 'Explore Da Lat',
        subtitle: 'Discover beautiful destinations',
      },
      about: {
        title: 'About DasiLari',
        subtitle: 'Your Smart Travel Companion',
      },
      survey: {
        title: 'Travel Survey',
        subtitle: 'Help us personalize your experience',
      },
      buddies: {
        title: 'Travel Buddies',
        subtitle: 'Find your travel companions',
      },
      itinerary: {
        title: 'Your Itinerary',
        subtitle: 'Plan your perfect trip',
      },
      photos: {
        title: 'Photo Gallery',
        subtitle: 'Capture beautiful moments',
      },
    },
  },
  vi: {
    // Navigation
    nav: {
      map: 'Bản đồ',
      about: 'Giới thiệu',
      survey: 'Khảo sát',
      buddies: 'Bạn đồng hành',
      itinerary: 'Lịch trình',
      photos: 'Ảnh',
    },
    // Footer
    footer: {
      brandName: '🌸 DasiLari',
      tagline: 'Người bạn đồng hành thông minh tại Đà Lạt',
      quickLinks: 'Liên kết nhanh',
      about: 'Giới thiệu',
      aboutText: 'DasiLari sử dụng AI để giúp bạn khám phá những điều tuyệt vời nhất của Đà Lạt. Nhận gợi ý cá nhân hóa, tìm bạn đồng hành và tạo những kỷ niệm khó quên tại thành phố cao nguyên xinh đẹp của Việt Nam.',
      copyright: '© 2025 DasiLari. Bản quyền thuộc về chúng tôi. Được tạo với ❤️ cho những người yêu du lịch.',
      contactUs: 'Liên hệ',
      contactText: 'Có câu hỏi hoặc phản hồi? Gửi tin nhắn cho chúng tôi!',
      yourName: 'Tên của bạn',
      yourEmail: 'Email của bạn',
      yourMessage: 'Tin nhắn của bạn...',
      sending: 'Đang gửi...',
      sendMessage: 'Gửi tin nhắn',
      messageSent: '✅ Tin nhắn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm.',
      language: 'Ngôn ngữ',
    },
    // Common
    common: {
      loading: 'Đang tải...',
      error: 'Lỗi',
      success: 'Thành công',
      submit: 'Gửi',
      cancel: 'Hủy',
      close: 'Đóng',
      search: 'Tìm kiếm',
      filter: 'Bộ lọc',
      all: 'Tất cả',
      readMore: 'Đọc thêm',
      viewMore: 'Xem thêm',
      showLess: 'Thu gọn',
      showGuide: 'Hướng dẫn',
      exploreMap: 'Khám phá Bản đồ Đà Lạt 🗺️',
    },
    // About Page
    aboutPage: {
      welcomeTitle: 'Chào mừng đến Đà Lạt',
      welcomeSubtitle: 'Thành phố Mùa Xuân Vĩnh Cửu - Thiên đường Cao nguyên của Việt Nam',
      highlightsTitle: 'Điểm nổi bật của Đà Lạt',
      essentialInfo: 'Thông tin cần thiết',
      readyToExplore: 'Sẵn sàng khám phá?',
      startPlanning: 'Bắt đầu lên kế hoạch cho chuyến phiêu lưu Đà Lạt hoàn hảo với bản đồ AI của chúng tôi',
      tourWelcome: 'Chào mừng đến trang Giới thiệu! Tìm hiểu mọi thứ về Đà Lạt - Thành phố Mùa Xuân Vĩnh Cửu. 🌸',
      features: {
        climate: {
          title: 'Khí hậu hoàn hảo',
          description: 'Ở độ cao 1.500m, Đà Lạt có khí hậu mát mẻ quanh năm với nhiệt độ 15-24°C. Buổi sáng sương mù lãng mạn và buổi chiều ấm áp dễ chịu.',
        },
        nature: {
          title: 'Thiên nhiên tuyệt đẹp',
          description: 'Nổi tiếng với rừng thông, vườn hoa và hồ nước yên bình. Đà Lạt là điểm đến hàng đầu cho những người yêu thiên nhiên.',
        },
        heritage: {
          title: 'Di sản Kiến trúc Pháp',
          description: 'Được xây dựng như một trạm nghỉ mát trên đồi bởi người Pháp vào những năm 1890, Đà Lạt vẫn giữ được kiến trúc thuộc địa quyến rũ.',
        },
        coffee: {
          title: 'Văn hóa Cà phê',
          description: 'Đà Lạt được bao quanh bởi các đồn điền cà phê sản xuất hạt Arabica ngon nhất Việt Nam. Thành phố có văn hóa quán cà phê nghệ thuật độc đáo.',
        },
        arts: {
          title: 'Nghệ thuật & Lãng mạn',
          description: 'Thường được gọi là "Thành phố Tình yêu", Đà Lạt là điểm đến tuần trăng mật yêu thích. Đây cũng là trung tâm nghệ thuật với các phòng tranh và kiến trúc sáng tạo.',
        },
        produce: {
          title: 'Nông sản & Hoa tươi',
          description: 'Vùng này sản xuất dâu tây, atiso, bơ ngon nhất Việt Nam và nhiều loại hoa tuyệt đẹp. Hãy ghé thăm các nông trại và chợ địa phương.',
        },
      },
      info: {
        location: {
          title: 'Vị trí',
          content: 'Tây Nguyên Việt Nam, tỉnh Lâm Đồng, cách TP. Hồ Chí Minh khoảng 300km về phía đông bắc',
        },
        howToGet: {
          title: 'Cách đến Đà Lạt',
          items: [
            'Bằng máy bay: Sân bay Liên Khương (cách trung tâm 30km) - 45 phút lái xe',
            'Bằng xe buýt: 6-8 tiếng từ TPHCM, 4-5 tiếng từ Nha Trang',
            'Bằng ô tô: Đường núi đẹp với cảnh quan tuyệt vời',
          ],
        },
        whatToBring: {
          title: 'Nên mang theo',
          items: [
            'Áo khoác nhẹ (buổi tối có thể se lạnh, 15°C)',
            'Giày đi bộ thoải mái để khám phá',
            'Máy ảnh để ghi lại những khoảnh khắc đẹp',
            'Đồ chống mưa trong mùa mưa (Tháng 5-10)',
          ],
        },
        bestTime: {
          title: 'Thời điểm tốt nhất để ghé thăm',
          items: [
            'Mùa khô (Tháng 11-3): Thời tiết lý tưởng, trời trong xanh',
            'Mùa lễ hội (Tháng 12-1): Lễ hội hoa và các ngày lễ',
            'Mùa mưa (Tháng 4-10): Ít du khách, cây cối xanh tươi, thỉnh thoảng có mưa',
          ],
        },
        tips: {
          title: 'Mẹo địa phương',
          items: [
            'Thử các đặc sản địa phương: rượu dâu, trà atiso, và bánh tráng nướng',
            'Thuê xe máy để tự do khám phá',
            'Ghé chợ đêm để thưởng thức ẩm thực và mua quà lưu niệm',
            'Hầu hết các điểm tham quan có phí vào cửa (50.000-120.000 VNĐ)',
            'Tiếng Anh được nói ở các khu du lịch',
          ],
        },
        currency: {
          title: 'Tiền tệ & Chi phí',
          items: [
            'Tiền tệ: Việt Nam Đồng (VNĐ)',
            'Bữa ăn trung bình: 50.000-250.000 VNĐ',
            'Chỗ ở: 250.000-2.500.000+ VNĐ/đêm',
            'Vé tham quan: 25.000-125.000 VNĐ',
            'ATM có sẵn rộng rãi, thẻ tín dụng được chấp nhận tại khách sạn',
          ],
        },
      },
    },
    // Pages
    pages: {
      map: {
        title: 'Khám phá Đà Lạt',
        subtitle: 'Khám phá những điểm đến tuyệt đẹp',
      },
      about: {
        title: 'Về DasiLari',
        subtitle: 'Người bạn đồng hành thông minh',
      },
      survey: {
        title: 'Khảo sát Du lịch',
        subtitle: 'Giúp chúng tôi cá nhân hóa trải nghiệm của bạn',
      },
      buddies: {
        title: 'Bạn đồng hành',
        subtitle: 'Tìm những người bạn đồng hành',
      },
      itinerary: {
        title: 'Lịch trình của bạn',
        subtitle: 'Lên kế hoạch cho chuyến đi hoàn hảo',
      },
      photos: {
        title: 'Thư viện ảnh',
        subtitle: 'Ghi lại những khoảnh khắc đẹp',
      },
    },
  },
  ko: {
    // Navigation
    nav: {
      map: '지도',
      about: '소개',
      survey: '설문조사',
      buddies: '여행 친구',
      itinerary: '일정',
      photos: '사진',
    },
    // Footer
    footer: {
      brandName: '🌸 DasiLari',
      tagline: '달랏에서의 스마트한 여행 동반자',
      quickLinks: '빠른 링크',
      about: '소개',
      aboutText: 'DasiLari는 AI를 사용하여 달랏의 최고를 발견하도록 도와줍니다. 개인화된 추천을 받고, 여행 친구를 찾고, 베트남의 아름다운 고원 도시에서 잊지 못할 추억을 만드세요.',
      copyright: '© 2025 DasiLari. 모든 권리 보유. 여행자를 위해 ❤️로 제작.',
      contactUs: '문의하기',
      contactText: '질문이나 피드백이 있으시면 메시지를 보내주세요!',
      yourName: '이름',
      yourEmail: '이메일',
      yourMessage: '메시지...',
      sending: '전송 중...',
      sendMessage: '메시지 보내기',
      messageSent: '✅ 메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.',
      language: '언어',
    },
    // Common
    common: {
      loading: '로딩 중...',
      error: '오류',
      success: '성공',
      submit: '제출',
      cancel: '취소',
      close: '닫기',
      search: '검색',
      filter: '필터',
      all: '전체',
      readMore: '더 읽기',
      viewMore: '더 보기',
      showLess: '간략히',
      showGuide: '가이드 보기',
      exploreMap: '달랏 지도 탐험 🗺️',
    },
    // About Page
    aboutPage: {
      welcomeTitle: '달랏에 오신 것을 환영합니다',
      welcomeSubtitle: '영원한 봄의 도시 - 베트남이 사랑하는 고원 휴양지',
      highlightsTitle: '달랏 하이라이트',
      essentialInfo: '필수 정보',
      readyToExplore: '탐험할 준비가 되셨나요?',
      startPlanning: 'AI 기반 지도로 완벽한 달랏 모험을 계획하세요',
      tourWelcome: '소개 페이지에 오신 것을 환영합니다! 영원한 봄의 도시 달랏에 대해 알아보세요. 🌸',
      features: {
        climate: {
          title: '완벽한 기후',
          description: '해발 1,500m에 위치한 달랏은 연중 15-24°C의 시원한 날씨를 즐깁니다. 아침에는 낭만적인 안개가, 오후에는 따뜻한 기온이 이어집니다.',
        },
        nature: {
          title: '아름다운 자연',
          description: '소나무 숲, 꽃 정원, 고요한 호수로 유명합니다. 달랏은 자연을 사랑하는 분들에게 최고의 목적지입니다.',
        },
        heritage: {
          title: '프랑스 식민지 유산',
          description: '1890년대 프랑스인들이 산악 휴양지로 건설한 달랏은 매력적인 식민지 건축물을 그대로 간직하고 있습니다.',
        },
        coffee: {
          title: '커피 문화',
          description: '달랏은 베트남 최고의 아라비카 원두를 생산하는 커피 농장으로 둘러싸여 있습니다. 이 도시는 독특한 장인 커피숍 문화를 가지고 있습니다.',
        },
        arts: {
          title: '예술과 로맨스',
          description: '"사랑의 도시"라고도 불리는 달랏은 인기 있는 신혼여행지입니다. 또한 갤러리와 창의적인 건축물이 있는 예술의 중심지입니다.',
        },
        produce: {
          title: '신선한 농산물과 꽃',
          description: '이 지역은 베트남 최고의 딸기, 아티초크, 아보카도와 다양한 꽃을 생산합니다. 현지 농장과 시장을 방문하세요.',
        },
      },
      info: {
        location: {
          title: '위치',
          content: '베트남 중부 고원, 람동성, 호치민시에서 북동쪽으로 약 300km',
        },
        howToGet: {
          title: '오시는 길',
          items: [
            '항공: 리엔쿠엉 공항 (시내에서 30km) - 45분 소요',
            '버스: 호치민시에서 6-8시간, 냐짱에서 4-5시간',
            '자동차: 멋진 경치의 산악 도로',
          ],
        },
        whatToBring: {
          title: '준비물',
          items: [
            '가벼운 재킷 (저녁에는 15°C로 쌀쌀할 수 있음)',
            '탐험을 위한 편안한 워킹화',
            '아름다운 순간을 담을 카메라',
            '우기(5-10월) 우비',
          ],
        },
        bestTime: {
          title: '방문하기 좋은 시기',
          items: [
            '건기 (11월-3월): 이상적인 날씨, 맑은 하늘',
            '축제 시즌 (12월-1월): 꽃 축제와 휴일',
            '우기 (4월-10월): 관광객이 적고, 푸른 녹음, 가끔 소나기',
          ],
        },
        tips: {
          title: '현지 팁',
          items: [
            '현지 특산품 맛보기: 딸기 와인, 아티초크 차, 반짱느엉',
            '자유로운 탐험을 위해 오토바이 렌트',
            '음식과 기념품을 위해 야시장 방문',
            '대부분의 명소 입장료 있음 ($2-5 USD)',
            '관광지에서는 영어 사용 가능',
          ],
        },
        currency: {
          title: '통화 & 비용',
          items: [
            '통화: 베트남 동 (VND)',
            '평균 식사: $2-10 USD',
            '숙박: $10-100+ USD/박',
            '입장권: $1-5 USD',
            'ATM 널리 이용 가능, 호텔에서 신용카드 사용 가능',
          ],
        },
      },
    },
    // Pages
    pages: {
      map: {
        title: '달랏 탐험',
        subtitle: '아름다운 목적지 발견',
      },
      about: {
        title: 'DasiLari 소개',
        subtitle: '스마트한 여행 동반자',
      },
      survey: {
        title: '여행 설문조사',
        subtitle: '맞춤형 경험을 위해 도와주세요',
      },
      buddies: {
        title: '여행 친구',
        subtitle: '여행 동반자 찾기',
      },
      itinerary: {
        title: '일정',
        subtitle: '완벽한 여행 계획',
      },
      photos: {
        title: '포토 갤러리',
        subtitle: '아름다운 순간 담기',
      },
    },
  },
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('dasilari-language')
    return savedLang || 'en'
  })

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('dasilari-language', language)
  }, [language])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k]
      } else {
        // Fallback to English if translation not found
        let fallback = translations['en']
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk]
          } else {
            return key // Return key if not found in fallback
          }
        }
        return fallback
      }
    }
    
    return value
  }

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
    }
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ]

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      t, 
      languages,
      translations: translations[language]
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
