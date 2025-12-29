import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, MapPin, Heart, MessageCircle, HelpCircle, Bell, X, Send, UserPlus, Check, Car, UsersIcon } from 'lucide-react'
import Joyride from 'react-joyride'
import { useTour } from '../hooks/useTour'

const BuddiesPage = () => {
  const [userPreferences, setUserPreferences] = useState(null)
  const [matches, setMatches] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [activeChat, setActiveChat] = useState(null)
  const [chatMessages, setChatMessages] = useState({})
  const [messageInput, setMessageInput] = useState('')
  const [groups, setGroups] = useState([])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState([])
  const [showRideBooking, setShowRideBooking] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  
  // Tour guide
  const { run, startTour, handleJoyrideCallback } = useTour('buddies')
  
  const tourSteps = [
    {
      target: 'body',
      content: 'Welcome to the Buddies page! Find and connect with other travelers who share your interests and destinations. 👥',
      placement: 'center',
    },
  ]

  useEffect(() => {
    const savedSurvey = localStorage.getItem('dalatSurvey')
    if (savedSurvey) {
      const prefs = JSON.parse(savedSurvey)
      setUserPreferences(prefs)
      
      if (prefs.findBuddies) {
        generateMatches(prefs)
      }
    }
    
    // Load saved data
    const savedNotifications = localStorage.getItem('buddiesNotifications')
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    
    const savedChats = localStorage.getItem('buddiesChats')
    if (savedChats) setChatMessages(JSON.parse(savedChats))
    
    const savedGroups = localStorage.getItem('buddiesGroups')
    if (savedGroups) setGroups(JSON.parse(savedGroups))
  }, [])

  const generateMatches = (prefs) => {
    const mockUsers = [
      {
        id: 1,
        name: 'Sarah Johnson',
        country: 'USA',
        travelStyle: 'solo',
        interests: ['nature', 'photography', 'adventure'],
        destinations: ['Xuan Huong Lake', 'Cu Lan Hill', 'Datanla Falls'],
        matchScore: 95,
        avatar: '👩🏼'
      },
      {
        id: 2,
        name: 'Takeshi Yamamoto',
        country: 'Japan',
        travelStyle: 'solo',
        interests: ['photography', 'culture', 'food'],
        destinations: ['Crazy House', 'Bao Dai Palace', 'Da Lat Market'],
        matchScore: 88,
        avatar: '👨🏻'
      },
      {
        id: 3,
        name: 'Emma Williams',
        country: 'UK',
        travelStyle: 'group',
        interests: ['adventure', 'nature', 'food'],
        destinations: ['Datanla Falls', 'Langbiang Mountain', 'Cu Lan Hill'],
        matchScore: 92,
        avatar: '👩🏻'
      },
      {
        id: 4,
        name: 'Marco Rossi',
        country: 'Italy',
        travelStyle: 'group',
        interests: ['culture', 'food', 'photography'],
        destinations: ['Da Lat Market', 'Linh Phuoc Pagoda', 'Crazy House'],
        matchScore: 85,
        avatar: '👨🏽'
      },
      {
        id: 5,
        name: 'Lisa Chen',
        country: 'Singapore',
        travelStyle: 'solo',
        interests: ['photography', 'nature', 'relaxation'],
        destinations: ['Cu Lan Hill', 'Xuan Huong Lake', 'Flower Gardens'],
        matchScore: 90,
        avatar: '👩🏻'
      }
    ]

    // Filter matches based on shared interests
    const filteredMatches = mockUsers.filter(user => {
      const sharedInterests = user.interests.filter(interest => 
        prefs.interests?.some(pref => pref.toLowerCase().includes(interest))
      )
      return sharedInterests.length > 0
    })

    setMatches(filteredMatches.sort((a, b) => b.matchScore - a.matchScore))
  }

  const sendTagAlongRequest = (user) => {
    const newNotification = {
      id: Date.now(),
      type: 'tagalong',
      from: userPreferences.name,
      to: user.name,
      userId: user.id,
      message: `${userPreferences.name} wants to tag along with you!`,
      status: 'pending',
      timestamp: new Date().toISOString()
    }
    
    const updatedNotifications = [...notifications, newNotification]
    setNotifications(updatedNotifications)
    localStorage.setItem('buddiesNotifications', JSON.stringify(updatedNotifications))
    
    alert(`Request sent to ${user.name}!`)
  }

  const handleNotificationResponse = (notification, response) => {
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, status: response } : n
    )
    setNotifications(updatedNotifications)
    localStorage.setItem('buddiesNotifications', JSON.stringify(updatedNotifications))
    
    if (response === 'accepted') {
      // Create chat room
      const chatId = `chat_${notification.userId}_${Date.now()}`
      const newChat = {
        id: chatId,
        participants: [notification.from, notification.to],
        messages: [{
          from: 'System',
          text: `${notification.to} accepted your request! You can now chat.`,
          timestamp: new Date().toISOString()
        }]
      }
      
      const updatedChats = { ...chatMessages, [chatId]: newChat }
      setChatMessages(updatedChats)
      localStorage.setItem('buddiesChats', JSON.stringify(updatedChats))
    }
  }

  const openChat = (user) => {
    // Find or create chat
    const existingChat = Object.values(chatMessages).find(chat => 
      chat.participants.includes(user.name) && chat.participants.includes(userPreferences.name)
    )
    
    if (existingChat) {
      setActiveChat(existingChat)
    } else {
      const chatId = `chat_${user.id}_${Date.now()}`
      const newChat = {
        id: chatId,
        participants: [userPreferences.name, user.name],
        messages: [],
        type: 'direct'
      }
      setActiveChat(newChat)
    }
    setShowChat(true)
  }

  const sendMessage = () => {
    if (!messageInput.trim() || !activeChat) return
    
    const newMessage = {
      from: userPreferences.name,
      text: messageInput,
      timestamp: new Date().toISOString()
    }
    
    const updatedChat = {
      ...activeChat,
      messages: [...(activeChat.messages || []), newMessage]
    }
    
    const updatedChats = { ...chatMessages, [activeChat.id]: updatedChat }
    setChatMessages(updatedChats)
    localStorage.setItem('buddiesChats', JSON.stringify(updatedChats))
    setActiveChat(updatedChat)
    setMessageInput('')
  }

  const createGroup = () => {
    if (selectedMembers.length < 2) {
      alert('Please select at least 2 members to create a group')
      return
    }
    
    const groupName = prompt('Enter group name:')
    if (!groupName) return
    
    const newGroup = {
      id: `group_${Date.now()}`,
      name: groupName,
      members: [userPreferences.name, ...selectedMembers.map(m => m.name)],
      createdBy: userPreferences.name,
      createdAt: new Date().toISOString()
    }
    
    const updatedGroups = [...groups, newGroup]
    setGroups(updatedGroups)
    localStorage.setItem('buddiesGroups', JSON.stringify(updatedGroups))
    
    // Create group chat
    const chatId = `groupchat_${newGroup.id}`
    const groupChat = {
      id: chatId,
      name: groupName,
      participants: newGroup.members,
      messages: [{
        from: 'System',
        text: `Group "${groupName}" created!`,
        timestamp: new Date().toISOString()
      }],
      type: 'group',
      groupId: newGroup.id
    }
    
    const updatedChats = { ...chatMessages, [chatId]: groupChat }
    setChatMessages(updatedChats)
    localStorage.setItem('buddiesChats', JSON.stringify(updatedChats))
    
    setShowCreateGroup(false)
    setSelectedMembers([])
    alert(`Group "${groupName}" created!`)
  }

  const openGroupChat = (group) => {
    const groupChatId = `groupchat_${group.id}`
    const groupChat = chatMessages[groupChatId]
    if (groupChat) {
      setActiveChat(groupChat)
      setShowChat(true)
    }
  }

  const bookRideForGroup = (group) => {
    setSelectedGroup(group)
    setShowRideBooking(true)
  }

  const confirmRideBooking = () => {
    const destination = prompt('Where do you want to go?')
    if (!destination) return
    
    alert(`Ride booked for ${selectedGroup.members.length} members to ${destination}!\n\nA driver will contact the group soon.`)
    setShowRideBooking(false)
  }

  if (!userPreferences || !userPreferences.findBuddies) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <Users className="w-24 h-24 mx-auto text-dalat-pink mb-4" />
            <h2 className="text-3xl font-bold mb-4">Find Travel Buddies</h2>
            <p className="text-gray-600 mb-6">
              Complete the survey and enable "Find Travel Buddies" to connect with other travelers!
            </p>
            <Link
              to="/survey"
              className="inline-block px-8 py-3 bg-gradient-to-r from-dalat-pink to-dalat-blue text-white font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Take Survey
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8 pb-24 relative">
      {/* Tour Guide */}
      <Joyride
        steps={tourSteps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#ec4899',
            zIndex: 1000,
          },
        }}
      />

      {/* Guide Button */}
      <button
        onClick={startTour}
        className="fixed bottom-24 right-8 bg-dalat-pink text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Start Guide
        </span>
      </button>

      {/* Notification Bell */}
      <div className="fixed top-20 right-8 z-40">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <Bell className="w-6 h-6 text-dalat-pink" />
          {notifications.filter(n => n.status === 'pending').length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notifications.filter(n => n.status === 'pending').length}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-lg">Notifications</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map(notification => (
                  <div key={notification.id} className="p-4">
                    <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                    <div className="text-xs text-gray-400 mb-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                    
                    {notification.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleNotificationResponse(notification, 'accepted')}
                          className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleNotificationResponse(notification, 'denied')}
                          className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Deny
                        </button>
                      </div>
                    )}
                    
                    {notification.status === 'accepted' && (
                      <div className="text-green-600 text-sm font-medium">✓ Accepted</div>
                    )}
                    
                    {notification.status === 'denied' && (
                      <div className="text-red-600 text-sm font-medium">✗ Denied</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-dalat-pink to-dalat-blue bg-clip-text text-transparent">
          Find Your Travel Buddies
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Connect with travelers who share your interests and destinations
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => setShowCreateGroup(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Create Group
          </button>
        </div>
      </div>

      {/* Groups Section */}
      {groups.length > 0 && (
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <UsersIcon className="w-6 h-6 text-dalat-pink" />
            Your Groups
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map(group => (
              <div key={group.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{group.members.length} members</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.members.map((member, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {member}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openGroupChat(group)}
                    className="flex-1 px-4 py-2 bg-dalat-blue text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </button>
                  <button
                    onClick={() => bookRideForGroup(group)}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Car className="w-4 h-4" />
                    Book Ride
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matches Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Suggested Matches ({matches.length})
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(match => (
            <div
              key={match.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              {/* User Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{match.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{match.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {match.country}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-dalat-pink to-dalat-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {match.matchScore}%
                </div>
              </div>

              {/* Travel Style */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  match.travelStyle === 'solo' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {match.travelStyle === 'solo' ? '🧳 Solo Traveler' : '👥 Group Traveler'}
                </span>
              </div>

              {/* Interests */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Interests:</p>
                <div className="flex flex-wrap gap-2">
                  {match.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-pink-100 text-pink-700 rounded-lg text-xs"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Destinations */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Planning to visit:</p>
                <div className="space-y-1">
                  {match.destinations.slice(0, 2).map((dest, idx) => (
                    <p key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {dest}
                    </p>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => sendTagAlongRequest(match)}
                  className="px-4 py-2 bg-gradient-to-r from-dalat-pink to-pink-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Tag Along
                </button>
                <button
                  onClick={() => openChat(match)}
                  className="px-4 py-2 bg-gradient-to-r from-dalat-blue to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </button>
              </div>

              {/* Select for Group */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedMembers.some(m => m.id === match.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers([...selectedMembers, match])
                      } else {
                        setSelectedMembers(selectedMembers.filter(m => m.id !== match.id))
                      }
                    }}
                    className="w-4 h-4 text-dalat-pink rounded"
                  />
                  <span className="text-sm text-gray-600">Select for group</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Create Travel Group</h2>
              <button onClick={() => setShowCreateGroup(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {selectedMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <UsersIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select at least 2 members from the matches above to create a group</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Selected Members ({selectedMembers.length}):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map(member => (
                      <div key={member.id} className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-2 rounded-full">
                        <span className="text-sm">{member.avatar} {member.name}</span>
                        <button
                          onClick={() => setSelectedMembers(selectedMembers.filter(m => m.id !== member.id))}
                          className="hover:bg-purple-200 rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={createGroup}
                  disabled={selectedMembers.length < 2}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Create Group
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && activeChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  {activeChat.type === 'group' ? activeChat.name : activeChat.participants.filter(p => p !== userPreferences.name).join(', ')}
                </h3>
                <p className="text-sm text-gray-500">
                  {activeChat.type === 'group' ? `${activeChat.participants.length} members` : 'Direct message'}
                </p>
              </div>
              <button onClick={() => setShowChat(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeChat.messages && activeChat.messages.length > 0 ? (
                activeChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.from === userPreferences.name ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        msg.from === userPreferences.name
                          ? 'bg-gradient-to-r from-dalat-pink to-pink-500 text-white'
                          : msg.from === 'System'
                          ? 'bg-gray-100 text-gray-600 text-center w-full'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.from !== userPreferences.name && msg.from !== 'System' && (
                        <p className="text-xs font-semibold mb-1">{msg.from}</p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-dalat-pink"
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-dalat-pink to-pink-500 text-white rounded-full hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ride Booking Modal */}
      {showRideBooking && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Book Group Ride</h2>
              <button onClick={() => setShowRideBooking(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Group:</p>
                <p className="text-lg">{selectedGroup.name}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Members ({selectedGroup.members.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGroup.members.map((member, idx) => (
                    <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Car className="w-5 h-5" />
                  <p className="font-semibold">Vehicle Info</p>
                </div>
                <p className="text-sm text-blue-600">
                  A suitable vehicle for {selectedGroup.members.length} passengers will be arranged.
                </p>
              </div>
            </div>

            <button
              onClick={confirmRideBooking}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg transition-all font-medium"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuddiesPage
