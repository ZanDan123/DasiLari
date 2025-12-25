// Initialize map centered on Da Lat
let map;
let markers = [];
let currentLocation = null;

// Da Lat coordinates
const DALAT_CENTER = [11.9404, 108.4583];

// Da Lat attractions data with categories
const attractions = [
    {
        name: "Xuan Huong Lake",
        lat: 11.9365,
        lng: 108.4383,
        category: ["nature", "photography", "relaxation"],
        description: "A beautiful crescent-shaped lake in the heart of Da Lat. Perfect for walking, cycling, and enjoying the cool mountain air. The lake is surrounded by pine trees and flowers, offering stunning photo opportunities especially at sunrise and sunset.",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
        distance: "City Center",
        entryFee: "Free"
    },
    {
        name: "Crazy House (Hang Nga Villa)",
        lat: 11.9447,
        lng: 108.4197,
        category: ["culture", "photography", "adventure"],
        description: "An incredibly unique architectural marvel designed by Vietnamese architect Dang Viet Nga. This fairy-tale-like structure features organic forms, cave-like rooms, and artistic elements throughout. A must-visit for architecture and photography enthusiasts.",
        image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d2f5?w=800",
        distance: "3.5km from center",
        entryFee: "$2"
    },
    {
        name: "Da Lat Market",
        lat: 11.9404,
        lng: 108.4380,
        category: ["food", "culture"],
        description: "The central market of Da Lat offering fresh produce, local specialties, and street food. Try strawberries, artichokes, avocados, and local snacks. The night market (from 6 PM) is especially vibrant with food stalls and souvenirs.",
        image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=800",
        distance: "City Center",
        entryFee: "Free"
    },
    {
        name: "Datanla Waterfall",
        lat: 11.9094,
        lng: 108.4389,
        category: ["nature", "adventure"],
        description: "An exciting waterfall with adventure activities. Take a thrilling alpine coaster ride down to the falls, or hike the trail. At the bottom, enjoy the cascading water and natural pools. Adventure packages include abseiling and sliding.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800",
        distance: "5km from center",
        entryFee: "$1.50 (+ activities)"
    },
    {
        name: "Tuyen Lam Lake",
        lat: 11.9631,
        lng: 108.3881,
        category: ["nature", "relaxation", "photography"],
        description: "The largest freshwater lake in Da Lat, surrounded by evergreen forests and hills. Perfect for peaceful boat rides, kayaking, or simply relaxing by the water. The scenery is breathtaking with mist rolling over the mountains.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        distance: "7km from center",
        entryFee: "$1 (+ boat rental)"
    },
    {
        name: "Truc Lam Zen Monastery",
        lat: 11.9667,
        lng: 108.3869,
        category: ["culture", "relaxation", "photography"],
        description: "A peaceful Buddhist monastery on the hills overlooking Tuyen Lam Lake. The architecture is stunning, and the atmosphere is serene. You can reach it by cable car for spectacular views. Free meditation sessions available.",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
        distance: "8km from center",
        entryFee: "Free"
    },
    {
        name: "Bao Dai Summer Palace",
        lat: 11.9258,
        lng: 108.4428,
        category: ["culture", "photography"],
        description: "The former summer residence of Vietnam's last emperor, Bao Dai. This well-preserved palace showcases 1930s architecture and offers insight into royal life. The gardens are beautiful and the views are panoramic.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        distance: "2km from center",
        entryFee: "$1.50"
    },
    {
        name: "Valley of Love (Thung Lung Tinh Yeu)",
        lat: 11.9714,
        lng: 108.4297,
        category: ["nature", "relaxation", "photography"],
        description: "A romantic valley with gardens, lakes, and whimsical decorations. Rent paddle boats, enjoy horse riding, or take photos with flower installations. Popular with couples and families. The landscaping is beautiful year-round.",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        distance: "5km north",
        entryFee: "$2"
    },
    {
        name: "Dalat Railway Station",
        lat: 11.9336,
        lng: 108.4506,
        category: ["culture", "photography"],
        description: "A charming Art Deco railway station built in 1938. Take a nostalgic cogwheel train ride to Trai Mat village (8km). The station itself is an architectural gem perfect for vintage photos.",
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800",
        distance: "1km from center",
        entryFee: "Free (train ticket $7)"
    },
    {
        name: "Langbiang Mountain",
        lat: 12.0417,
        lng: 108.4500,
        category: ["adventure", "nature", "photography"],
        description: "The highest peak in the area at 2,167m. Hike or take a jeep to the summit for breathtaking 360-degree views of Da Lat and surrounding valleys. Challenge level: Moderate. Morning visits offer the best views before clouds form.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        distance: "12km north",
        entryFee: "$2 (+ jeep $10)"
    },
    {
        name: "Da Lat Flower Gardens",
        lat: 11.9372,
        lng: 108.4361,
        category: ["nature", "photography", "relaxation"],
        description: "Extensive gardens showcasing thousands of flower varieties including roses, hydrangeas, and rare orchids. The gardens are meticulously maintained and bloom year-round. Special displays during the Da Lat Flower Festival.",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        distance: "City Center",
        entryFee: "$1.50"
    },
    {
        name: "Pongour Waterfall",
        lat: 11.7381,
        lng: 108.3478,
        category: ["nature", "photography"],
        description: "Often called the most beautiful waterfall in Da Lat region. The water cascades over 7 tiers creating a spectacular natural amphitheater. Best visited during rainy season (May-October) when water flow is strongest.",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
        distance: "50km south",
        entryFee: "$1"
    }
];

// Initialize map
function initMap() {
    map = L.map('map').setView(DALAT_CENTER, 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add custom marker icon
    const customIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: #e91e63; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); margin-top: 5px; text-align: center; color: white; font-size: 14px;">📍</div></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });
    
    // Add markers for all attractions
    attractions.forEach(attraction => {
        const marker = L.marker([attraction.lat, attraction.lng])
            .addTo(map)
            .bindPopup(`<b>${attraction.name}</b><br>${attraction.distance}`)
            .on('click', () => showLocationDetails(attraction));
        
        markers.push({ marker, attraction });
    });
    
    // Try to get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                currentLocation = [position.coords.latitude, position.coords.longitude];
                L.marker(currentLocation, {
                    icon: L.divIcon({
                        className: 'user-location-marker',
                        html: '<div style="background-color: #4285F4; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                        iconSize: [20, 20]
                    })
                }).addTo(map).bindPopup('You are here');
            },
            error => console.log('Location access denied')
        );
    }
}

// Load user preferences and generate AI recommendations
function loadUserPreferences() {
    const userPrefs = JSON.parse(localStorage.getItem('userPreferences'));
    
    if (userPrefs) {
        document.getElementById('userInfo').innerHTML = `
            <h3>Welcome, ${userPrefs.name}!</h3>
            <p>From ${userPrefs.country}</p>
            <p>Stay: ${userPrefs.duration} | Budget: ${userPrefs.budget}</p>
        `;
        
        generateAIRecommendations(userPrefs);
    } else {
        setTimeout(() => {
            document.getElementById('aiRecommendations').innerHTML = `
                <div class="recommendation-item">
                    <strong>🌊 Xuan Huong Lake</strong> - Start here for a peaceful introduction to Da Lat
                </div>
                <div class="recommendation-item">
                    <strong>🏛️ Crazy House</strong> - Unique architecture perfect for photos
                </div>
                <div class="recommendation-item">
                    <strong>🌸 Da Lat Flower Gardens</strong> - Beautiful year-round blooms
                </div>
            `;
        }, 500);
    }
}

// AI-powered recommendation system
function generateAIRecommendations(userPrefs) {
    setTimeout(() => {
        const recommendations = [];
        
        // Score each attraction based on user interests
        const scoredAttractions = attractions.map(attraction => {
            let score = 0;
            
            // Match with user interests
            userPrefs.interests.forEach(interest => {
                if (attraction.category.includes(interest)) {
                    score += 10;
                }
            });
            
            // Budget considerations
            const entryFee = parseFloat(attraction.entryFee.replace(/[^0-9.]/g, '')) || 0;
            if (userPrefs.budget === 'low' && entryFee <= 2) score += 5;
            if (userPrefs.budget === 'medium' && entryFee <= 5) score += 5;
            if (userPrefs.budget === 'high' || userPrefs.budget === 'luxury') score += 5;
            
            // Duration considerations
            const duration = parseInt(userPrefs.duration) || 3;
            if (duration >= 3) {
                // Recommend more distant places for longer stays
                if (attraction.distance.includes('km') && parseInt(attraction.distance) > 10) {
                    score += 3;
                }
            } else {
                // Prefer closer attractions for short stays
                if (attraction.distance.includes('Center') || parseInt(attraction.distance) < 5) {
                    score += 5;
                }
            }
            
            return { ...attraction, score };
        });
        
        // Sort by score and get top 5
        const topRecommendations = scoredAttractions
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
        
        // Display recommendations
        const html = topRecommendations.map((rec, index) => `
            <div class="recommendation-item" onclick="focusAttraction('${rec.name}')">
                <strong>${index + 1}. ${rec.name}</strong>
                <br><small>Match: ${rec.score}% | ${rec.distance} | ${rec.entryFee}</small>
            </div>
        `).join('');
        
        document.getElementById('aiRecommendations').innerHTML = html;
    }, 1000);
}

// Display all attractions in sidebar
function displayAttractions(filter = 'all') {
    const filteredAttractions = filter === 'all' 
        ? attractions 
        : attractions.filter(a => a.category.includes(filter));
    
    const html = filteredAttractions.map(attraction => `
        <div class="attraction-item" onclick="focusAttraction('${attraction.name}')">
            <h4>${attraction.name}</h4>
            <p>${attraction.distance} • ${attraction.entryFee}</p>
        </div>
    `).join('');
    
    document.getElementById('attractionItems').innerHTML = html;
}

// Focus on specific attraction
function focusAttraction(name) {
    const attraction = attractions.find(a => a.name === name);
    if (attraction) {
        map.setView([attraction.lat, attraction.lng], 15);
        showLocationDetails(attraction);
    }
}

// Show location details in modal
function showLocationDetails(attraction) {
    const modal = document.getElementById('locationModal');
    document.getElementById('modalTitle').textContent = attraction.name;
    document.getElementById('modalImage').src = attraction.image;
    document.getElementById('modalDescription').innerHTML = `
        <p>${attraction.description}</p>
        <p><strong>Distance:</strong> ${attraction.distance}</p>
        <p><strong>Entry Fee:</strong> ${attraction.entryFee}</p>
        <p><strong>Categories:</strong> ${attraction.category.join(', ')}</p>
    `;
    
    modal.style.display = 'block';
    
    // Set up action buttons
    document.getElementById('getDirections').onclick = () => getDirections(attraction);
    document.getElementById('callRide').onclick = () => callRide(attraction);
}

// Get directions to location
function getDirections(attraction) {
    const directionsDiv = document.getElementById('directionsInfo');
    
    if (currentLocation) {
        // Calculate approximate distance (simplified)
        const distance = calculateDistance(
            currentLocation[0], currentLocation[1],
            attraction.lat, attraction.lng
        );
        
        directionsDiv.innerHTML = `
            <h3>📍 Directions</h3>
            <p><strong>From your location to ${attraction.name}</strong></p>
            <p>Approximate distance: ${distance.toFixed(1)} km</p>
            <p>Estimated time by motorbike: ${Math.ceil(distance * 3)} minutes</p>
            <br>
            <p><strong>Navigation Options:</strong></p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lng}" 
               target="_blank" class="btn-primary" style="display: inline-block; text-decoration: none; margin-right: 10px;">
                Open in Google Maps
            </a>
            <br><br>
            <p><em>💡 Tip: Save this location offline in Google Maps for areas with weak signal.</em></p>
        `;
    } else {
        directionsDiv.innerHTML = `
            <h3>📍 Directions</h3>
            <p><strong>${attraction.name}</strong></p>
            <p>${attraction.distance} from city center</p>
            <br>
            <a href="https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}" 
               target="_blank" class="btn-primary" style="display: inline-block; text-decoration: none;">
                View on Google Maps
            </a>
            <br><br>
            <p><em>Enable location services to get personalized directions from your current location.</em></p>
        `;
    }
    
    directionsDiv.style.display = 'block';
    document.getElementById('rideInfo').style.display = 'none';
}

// Call a ride to location
function callRide(attraction) {
    const rideDiv = document.getElementById('rideInfo');
    const userPrefs = JSON.parse(localStorage.getItem('userPreferences'));
    
    let estimatedCost = '$3-8';
    if (attraction.distance.includes('km')) {
        const km = parseInt(attraction.distance);
        if (km > 10) estimatedCost = '$8-15';
        else if (km > 5) estimatedCost = '$5-10';
    }
    
    rideDiv.innerHTML = `
        <h3>🚗 Call a Ride</h3>
        <p><strong>Destination:</strong> ${attraction.name}</p>
        <p><strong>Estimated Cost:</strong> ${estimatedCost}</p>
        <br>
        <p><strong>Available Ride Services in Da Lat:</strong></p>
        
        <div style="margin: 15px 0;">
            <strong>🟢 Grab (Recommended)</strong>
            <p>Most popular ride-hailing app in Vietnam</p>
            <a href="https://www.grab.com/" target="_blank" class="btn-secondary" 
               style="display: inline-block; text-decoration: none; margin-top: 5px;">
                Open Grab App/Website
            </a>
        </div>
        
        <div style="margin: 15px 0;">
            <strong>🔵 Gojek</strong>
            <p>Alternative ride-hailing service</p>
            <a href="https://www.gojek.com/" target="_blank" class="btn-secondary" 
               style="display: inline-block; text-decoration: none; margin-top: 5px;">
                Open Gojek App/Website
            </a>
        </div>
        
        <div style="margin: 15px 0;">
            <strong>🚕 Local Taxi</strong>
            <p>Call these numbers:</p>
            <p>📞 Mai Linh Taxi: <a href="tel:0263-3-565656">0263 3 565 656</a></p>
            <p>📞 Dalat Taxi: <a href="tel:0263-3-811-811">0263 3 811 811</a></p>
        </div>
        
        <br>
        <p><em>💡 Tip: Download Grab or Gojek app before your trip for the easiest experience. 
        They accept cash and card payments.</em></p>
        
        ${userPrefs && userPrefs.transport === 'no' ? 
            '<p><strong>Note:</strong> Since you indicated you need ride services, we recommend downloading Grab app in advance!</p>' 
            : ''}
    `;
    
    rideDiv.style.display = 'block';
    document.getElementById('directionsInfo').style.display = 'none';
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Modal close functionality
document.querySelector('.close').onclick = function() {
    document.getElementById('locationModal').style.display = 'none';
};

window.onclick = function(event) {
    const modal = document.getElementById('locationModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Category filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        displayAttractions(this.dataset.category);
    });
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    loadUserPreferences();
    displayAttractions();
});
