# Da Lat Tourism Website 🌸

A comprehensive tourism guide website for Da Lat, Vietnam, designed specifically for international tourists. This website features an interactive AI-powered map, personalized recommendations, and integrated navigation/ride-hailing services.

## Features ✨

### 1. **Initial Survey Page** (`index.html`)
- Welcomes visitors with a comprehensive survey
- Collects user preferences:
  - Name and country
  - Interests (nature, culture, food, adventure, photography, relaxation)
  - Stay duration
  - Budget range
  - Transportation needs
- Uses data to personalize the experience

### 2. **AI-Powered Interactive Map** (`map.html`)
- **Interactive Map**: Uses Leaflet.js with OpenStreetMap
- **AI Recommendations**: Generates personalized suggestions based on survey responses
- **12+ Popular Attractions** including:
  - Xuan Huong Lake
  - Crazy House
  - Datanla Waterfall
  - Langbiang Mountain
  - And many more!
- **Category Filtering**: Filter attractions by type (nature, culture, food, adventure, photography)
- **Location Details**: Click any attraction to see:
  - Beautiful images
  - Detailed descriptions
  - Distance and entry fees
  - Action buttons

### 3. **Navigation & Transportation Features**
When selecting an attraction, users get two options:

#### 📍 **Get Directions**
- Google Maps integration
- Real-time distance calculation from user's location
- Estimated travel time
- Direct link to open in Google Maps app

#### 🚗 **Call a Ride**
- Links to ride-hailing services:
  - **Grab** (most popular in Vietnam)
  - **Gojek**
  - Local taxi numbers
- Estimated ride costs
- Tips for international tourists

### 4. **About Page** (`about.html`)
- Comprehensive information about Da Lat
- What makes Da Lat special (climate, nature, culture, etc.)
- Practical travel information:
  - How to get there
  - What to bring
  - Best time to visit
  - Local tips
  - Currency and costs

## Technology Stack 💻

- **React 18**: Modern UI framework with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Leaflet.js**: Open-source mapping library
- **React Router**: Client-side routing
- **Joyride**: Guided tours for onboarding

### Backend Integration 🔌

This frontend connects to the **DasiLari Backend API** (FastAPI):

| Feature | API Endpoint | Method |
|---------|-------------|--------|
| Survey | `/api/survey` | POST |
| User Profile | `/api/users/{id}` | GET |
| Destinations | `/api/destinations` | GET |
| Photo Spots | `/api/destinations/photo-spots` | GET |
| AI Chat | `/api/chat` | POST |
| Generate Itinerary | `/api/itineraries/generate` | POST |

## How to Run 🚀

### Prerequisites
- Node.js 18+
- Backend API running on port 8000

### Development Setup

1. **Start the Backend first**:
```bash
cd DasiLari_BE
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

2. **Start the Frontend**:
```bash
cd DasiLasi_FE
npm install
npm run dev
```

3. Open http://localhost:3000 in your browser

### Environment Variables

Create a `.env` file (optional):
```env
# Leave empty to use Vite proxy (recommended for development)
VITE_API_URL=

# For production:
# VITE_API_URL=https://your-api-domain.com
```

## File Structure 📁

```
AI_WorkShop/
│
├── index.html          # Landing page with survey
├── map.html            # Interactive map with attractions
├── about.html          # Information about Da Lat
├── styles.css          # All styling
├── survey.js           # Survey form functionality
├── map.js              # Map and AI recommendation logic
└── README.md           # This file
```

## How to Use 🚀

### Local Setup
1. Download all files to a folder
2. Open `index.html` in a web browser
3. No server required - works with local file:// protocol

### Recommended Workflow
1. **Start**: Open `index.html`
2. **Survey**: Fill out your preferences
3. **Explore**: Automatically redirected to map with personalized recommendations
4. **Discover**: Click on attractions to see details
5. **Navigate**: Choose to get directions or call a ride
6. **Learn**: Visit About page for comprehensive Da Lat information

## Features in Detail 🔍

### AI Recommendation System
The AI analyzes:
- **User Interests**: Matches attractions with preferred categories
- **Budget**: Suggests appropriate attractions based on budget range
- **Duration**: Recommends distant attractions for longer stays
- **Scoring Algorithm**: Each attraction gets a score (0-100)
- **Top 5 Display**: Shows best matches with match percentage

### Responsive Design
- **Desktop**: Full sidebar with map
- **Tablet**: Collapsible sidebar
- **Mobile**: Stacked layout (sidebar on top, map below)

### User Experience
- **Visual Feedback**: Hover effects, smooth transitions
- **Loading States**: Shows processing status
- **Error Handling**: Graceful degradation if location unavailable
- **Accessibility**: Semantic HTML, proper contrast ratios

## Attractions Included 📍

1. **Xuan Huong Lake** - City center lake
2. **Crazy House** - Unique architecture
3. **Da Lat Market** - Local food and culture
4. **Datanla Waterfall** - Adventure activities
5. **Tuyen Lam Lake** - Largest lake
6. **Truc Lam Monastery** - Buddhist temple
7. **Bao Dai Palace** - Historical site
8. **Valley of Love** - Romantic destination
9. **Railway Station** - Colonial architecture
10. **Langbiang Mountain** - Highest peak
11. **Flower Gardens** - Botanical beauty
12. **Pongour Waterfall** - Natural wonder

## Customization Options 🎨

### Add More Attractions
Edit `map.js` and add to the `attractions` array:

```javascript
{
    name: "New Attraction",
    lat: 11.9404,
    lng: 108.4583,
    category: ["nature", "culture"],
    description: "Description here...",
    image: "image-url",
    distance: "Distance info",
    entryFee: "$X"
}
```

### Change Color Scheme
Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #e91e63;
    --secondary-color: #9c27b0;
    --accent-color: #ff4081;
}
```

### Modify AI Algorithm
Edit the `generateAIRecommendations()` function in `map.js` to adjust scoring weights.

## Browser Compatibility 🌐

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements 🔮

Potential additions:
- [ ] Multi-language support (Vietnamese, Chinese, Korean, etc.)
- [ ] Weather integration
- [ ] Hotel booking links
- [ ] Restaurant recommendations
- [ ] User reviews and ratings
- [ ] Itinerary planner
- [ ] Offline map caching
- [ ] AR navigation features
- [ ] Social sharing features
- [ ] Real-time events calendar

## Credits & Resources 📚

- **Maps**: OpenStreetMap contributors & Leaflet.js
- **Images**: Unsplash (placeholder images)
- **Icons**: Unicode emoji characters
- **Fonts**: System fonts for fast loading

## License 📄

Free to use for educational and commercial purposes. Attribution appreciated.

## Support 💬

For questions or suggestions about Da Lat tourism, refer to:
- Da Lat Tourism Official Website
- Vietnam Tourism Board
- Local tour guides and information centers

---

**Built with ❤️ for travelers exploring the beautiful City of Eternal Spring** 🌸

**Last Updated**: December 2024
