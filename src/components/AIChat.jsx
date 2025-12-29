import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Sparkles } from 'lucide-react'
import { sendChatMessage } from '../services/api'

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your DasiLari AI assistant. 😊 I can help you with:\n\n📍 Destination suggestions\n🗺️ Travel itineraries\n📸 Photo spot recommendations\n🚗 Transportation options\n🤝 Finding travel buddies\n\nJust chat with me naturally - no commands needed! How can I help you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [myTravelList, setMyTravelList] = useState([])
  const [myPhotoList, setMyPhotoList] = useState([])
  const [userId, setUserId] = useState(null)
  const [useLocalFallback, setUseLocalFallback] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Load travel lists from localStorage
    const travelList = JSON.parse(localStorage.getItem('myTravelList') || '[]')
    const photoList = JSON.parse(localStorage.getItem('myPhotoList') || '[]')
    const storedUserId = localStorage.getItem('userId')
    setMyTravelList(travelList)
    setMyPhotoList(photoList)
    if (storedUserId) setUserId(parseInt(storedUserId))
  }, [isOpen]) // Reload when chat opens

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    // Check user's travel list
    if (msg.includes('my list') || msg.includes('travel list') || msg.includes('what did i add') || msg.includes('my places')) {
      if (myTravelList.length === 0 && myPhotoList.length === 0) {
        return "You haven't added any places to your lists yet! 📝\n\nVisit the **Itinerary** page to add travel destinations, or the **Photos** page to add photo spots.\n\nOnce you add places, I can help you:\n- Create a custom itinerary\n- Suggest the best route\n- Find nearby restaurants\n- Book transportation"
      }
      
      let response = "Here's what you've saved:\n\n"
      
      if (myTravelList.length > 0) {
        response += "🗺️ **Travel List** (" + myTravelList.length + " places):\n"
        myTravelList.forEach((place, index) => {
          response += `${index + 1}. ${place.name}\n`
        })
        response += "\n"
      }
      
      if (myPhotoList.length > 0) {
        response += "📸 **Photo Spots** (" + myPhotoList.length + " locations):\n"
        myPhotoList.forEach((spot, index) => {
          response += `${index + 1}. ${spot.name}\n`
        })
        response += "\n"
      }
      
      response += "Would you like me to create a custom itinerary based on these places?"
      return response
    }
    
    // Create itinerary based on travel list
    if ((msg.includes('create') || msg.includes('make') || msg.includes('plan')) && 
        (msg.includes('itinerary') || msg.includes('schedule') || msg.includes('route'))) {
      
      if (myTravelList.length === 0 && myPhotoList.length === 0) {
        return "I'd love to create an itinerary for you! But first, please add some places to your travel list:\n\n1. Visit the **Itinerary** page\n2. Browse suggested places\n3. Click 'Add to My Travel List'\n4. Come back and I'll create a perfect route for you! 🗺️"
      }
      
      const allPlaces = [...myTravelList, ...myPhotoList]
      let response = "🎉 Great! Based on your selected places, here's my suggested itinerary:\n\n"
      
      // Group by time of day
      const morningPlaces = allPlaces.filter(p => p.bestTime === 'sunrise' || p.bestTime === 'morning')
      const afternoonPlaces = allPlaces.filter(p => p.bestTime === 'afternoon')
      const eveningPlaces = allPlaces.filter(p => p.bestTime === 'sunset' || p.bestTime === 'evening')
      const otherPlaces = allPlaces.filter(p => !p.bestTime)
      
      if (morningPlaces.length > 0) {
        response += "**🌅 Morning:**\n"
        morningPlaces.forEach(place => {
          response += `- ${place.name}\n`
        })
        response += "\n"
      }
      
      if (afternoonPlaces.length > 0 || otherPlaces.length > 0) {
        response += "**☀️ Afternoon:**\n"
        afternoonPlaces.concat(otherPlaces).forEach(place => {
          response += `- ${place.name}\n`
        })
        response += "\n"
      }
      
      if (eveningPlaces.length > 0) {
        response += "**🌆 Evening:**\n"
        eveningPlaces.forEach(place => {
          response += `- ${place.name}\n`
        })
        response += "\n"
      }
      
      response += "💡 **Tips:**\n"
      response += "- Start early to avoid crowds\n"
      response += "- Book transportation between locations\n"
      response += "- Allocate 2-3 hours per location\n"
      response += "\nWould you like me to help book rides or suggest nearby restaurants?"
      
      return response
    }
    
    // Photo spot recommendations
    if (msg.includes('photo') || msg.includes('picture') || msg.includes('instagram')) {
      return "📸 Here are the best photo spots in Da Lat:\n\n1. **Cu Lan Hill** - Pine forests & tea hills, best at sunrise\n2. **Xuan Huong Lake** - Beautiful reflections, sunset perfect\n3. **Crazy House** - Unique architecture, great for creative shots\n4. **La Dalatte Cafe** - Stunning views of the valley\n5. **Linh Phuoc Pagoda** - Colorful mosaic temple\n\nWould you like specific photography tips for any of these locations?"
    }
    
    // Mood-based itinerary
    if (msg.includes('mood') || msg.includes('feel') || msg.includes('romantic') || msg.includes('adventure')) {
      if (msg.includes('romantic') || msg.includes('love')) {
        return "💕 Perfect romantic itinerary for you:\n\n**Morning:**\n- Sunrise at Xuan Huong Lake\n- Coffee at the Love Valley\n\n**Afternoon:**\n- Visit Crazy House (unique experience)\n- Lunch at romantic restaurant\n\n**Evening:**\n- Sunset at Dalat Flower Gardens\n- Dinner at rooftop restaurant\n- Night market stroll\n\nWant more romantic spot suggestions?"
      }
      if (msg.includes('adventure') || msg.includes('active')) {
        return "🤠 Adventurous itinerary just for you:\n\n**Morning:**\n- Canyoning at Datanla Falls\n- Alpine coaster ride\n\n**Afternoon:**\n- Mountain biking trails\n- Visit Langbiang Mountain\n\n**Evening:**\n- Night market food tour\n- Try local street food\n\nNeed transportation recommendations?"
      }
      return "😊 Based on your mood, I can suggest different itineraries! Are you feeling:\n\n💕 Romantic\n🤠 Adventurous\n😌 Relaxed\n🎭 Cultural\n\nTell me more about your mood!"
    }
    
    // Travel buddies
    if (msg.includes('buddy') || msg.includes('buddies') || msg.includes('group') || msg.includes('meet')) {
      return "🤝 Great! I can help you find travel buddies!\n\nBased on your survey, I'll match you with travelers who:\n- Have similar destinations\n- Travel at the same time\n- Share your interests\n\nYou can join groups for morning activities and go solo in the afternoon if you prefer!\n\nWould you like me to show you potential travel buddies near your location?"
    }
    
    // Transportation
    if (msg.includes('transport') || msg.includes('car') || msg.includes('ride') || msg.includes('taxi')) {
      return "🚗 Transportation options in Da Lat:\n\n**Ride Services:**\n- Grab (most popular)\n- Gojek\n- Local taxi: +84-xxx-xxx-xxx\n\n**Rentals:**\n- Motorbike: $5-10/day\n- Car with driver: $30-50/day\n- Self-drive car: $40-60/day\n\nI can help you book a ride to any attraction. Which service would you prefer?"
    }
    
    // Destinations
    if (msg.includes('where') || msg.includes('visit') || msg.includes('go') || msg.includes('destination')) {
      return "🗺️ Top destinations I recommend:\n\n1. **Xuan Huong Lake** - Beautiful walks, perfect for all\n2. **Crazy House** - Must-see unique architecture\n3. **Datanla Falls** - Adventure activities\n4. **Bao Dai Palace** - Historical experience\n5. **Cu Lan Hill** - Best photo spots\n6. **Da Lat Market** - Local food & culture\n\nWhich type of place interests you most? Nature, culture, adventure, or food?"
    }
    
    // Itinerary
    if (msg.includes('itinerary') || msg.includes('plan') || msg.includes('schedule')) {
      return "📋 I'd love to create a personalized itinerary for you!\n\nLet me know:\n- How many days are you staying?\n- What's your current mood?\n- Any must-visit places?\n- Breakfast/lunch/dinner preferences?\n\nI'll create a perfect day-by-day plan based on your preferences!"
    }
    
    // Default response
    return "I'm here to help! You can ask me about:\n\n📍 Where to go and what to visit\n📸 Best photo locations\n🗺️ Creating your itinerary\n😊 Mood-based recommendations\n🚗 Transportation & directions\n🤝 Finding travel buddies\n\nWhat would you like to know?"
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsTyping(true)

    // Try API first if user_id exists, fallback to local
    if (!useLocalFallback && userId) {
      try {
        const response = await sendChatMessage({
          message: currentInput,
          user_id: userId,
        })
        
        const aiResponse = {
          role: 'assistant',
          content: response.response || response.message || getAIResponse(currentInput)
        }
        setMessages(prev => [...prev, aiResponse])
        setIsTyping(false)
        return
      } catch (error) {
        console.warn('API call failed, using local fallback:', error)
        setUseLocalFallback(true)
      }
    }

    // Local fallback (also used when no userId)
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: getAIResponse(currentInput)
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          data-tour="ai-chat"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-dalat-pink to-dalat-blue text-white p-4 rounded-full shadow-2xl hover:shadow-dalat-hover transition-all duration-300 hover:scale-110 flex items-center space-x-2 group"
        >
          <MessageCircle className="w-6 h-6" />
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="hidden md:inline-block font-semibold">Chat with AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-dalat-pink to-dalat-blue text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <div>
                <h3 className="font-bold text-lg">DasiLari AI</h3>
                <p className="text-xs opacity-90">Your travel assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-dalat-pink to-dalat-blue text-white'
                      : 'bg-white shadow-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white shadow-md p-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-dalat-pink rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-dalat-pink rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-dalat-pink rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-dalat-pink focus:ring-4 focus:ring-dalat-pink/20 outline-none transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-dalat-pink to-dalat-blue text-white p-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Tip: Just chat naturally - no commands needed!
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default AIChat
