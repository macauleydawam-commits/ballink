import React, { createContext, useContext, useState } from 'react';
import { FEATURED_PITCHES } from '../data/mockData';

const OnboardingContext = createContext();

const buildDefaultSquad = (playerName, playerPosition) => ({
  gk: playerPosition === 'Goalkeeper' ? playerName : 'Tap to assign',
  ldf: 'Tap to assign',
  cdf: playerPosition === 'Defender' ? playerName : 'Tap to assign',
  rdf: 'Tap to assign',
  lmf: playerPosition === 'Midfielder' ? playerName : 'Tap to assign',
  cmf: 'Tap to assign',
  rmf: 'Tap to assign',
  amf: 'Tap to assign',
  lfw: playerPosition === 'Forward' ? playerName : 'Tap to assign',
  cfw: 'Tap to assign',
  rfw: 'Tap to assign',
  lwf: 'Tap to assign',
  rwf: 'Tap to assign',
  cf1: 'Tap to assign',
  cf2: 'Tap to assign',
});

const DEFAULT_PLAYERS = [
  { id: 'p-001', name: 'Emeka Okafor', age: 24, position: 'Forward', foot: 'Right', rating: 4.4 },
  { id: 'p-002', name: 'Sade Ajayi', age: 22, position: 'Midfielder', foot: 'Left', rating: 4.2 },
  { id: 'p-003', name: 'Chidi Nwosu', age: 26, position: 'Defender', foot: 'Right', rating: 4.0 },
  { id: 'p-004', name: 'Amina Bello', age: 23, position: 'Forward', foot: 'Both', rating: 4.6 },
  { id: 'p-005', name: 'Daniel Uche', age: 28, position: 'Goalkeeper', foot: 'Right', rating: 4.1 },
  { id: 'p-006', name: 'Grace Eze', age: 21, position: 'Midfielder', foot: 'Right', rating: 4.3 },
];

const DEFAULT_CHATS = [
  {
    id: 'chat-001',
    name: 'Rayfield Friday Ballers',
    isGroup: true,
    participants: ['You', 'Tunde Bello', 'Amaka Nwosu', 'Samuel Adams'],
    preview: 'Organiser: Kick-off is 20:00 sharp, don\'t be late!',
    lastMessageTime: '11:15 AM',
    unread: 2,
  },
  {
    id: 'chat-002',
    name: 'Terminus Arena Booking Hub',
    isGroup: true,
    participants: ['You', 'Organiser', 'Aliyu'],
    preview: 'Your slot booking at Terminus Turf was confirmed',
    lastMessageTime: 'Yesterday',
    unread: 0,
  },
  {
    id: 'chat-003',
    name: 'Chukwuemeka A.',
    isGroup: false,
    participants: ['You', 'Chukwuemeka A.'],
    preview: 'Are you available for the 5-a-side match tonight?',
    lastMessageTime: 'Yesterday',
    unread: 1,
  },
];

const DEFAULT_MESSAGES = {
  'chat-001': [
    { id: 'msg-001', sender: 'Organiser', text: 'Kick-off is 20:00 sharp, don\'t be late!', time: '11:15 AM', outgoing: false },
    { id: 'msg-002', sender: 'You', text: 'I\'ll be there early to help set up.', time: '11:16 AM', outgoing: true },
  ],
  'chat-002': [
    { id: 'msg-003', sender: 'Terminus Admin', text: 'Your slot booking at Terminus Turf was confirmed', time: 'Yesterday', outgoing: false },
    { id: 'msg-004', sender: 'You', text: 'Thanks! See you there.', time: 'Yesterday', outgoing: true },
  ],
  'chat-003': [
    { id: 'msg-005', sender: 'Chukwuemeka A.', text: 'Are you available for the 5-a-side match tonight?', time: 'Yesterday', outgoing: false },
  ],
};

const CURRENT_OWNER_ID = 'owner-001';

export function OnboardingProvider({ children }) {
  const [userProfile, setUserProfile] = useState({
    userType: 'player', // 'player' or 'owner'
    name: 'Gyang Pam',
    sex: 'Male',
    position: 'Midfielder',
    location: 'Rayfield',
    skillLevel: 'Intermediate',
    age: 24,
    preferredFoot: 'Right',
    businessName: 'Jos Turf City',
    contactNumber: '+234 803 123 4567',
    stats: {
      matchesPlayed: 28,
      goals: 12,
      assists: 7,
      mvpAwards: 4,
    },
    rating: 4.3,
  });

  const [teamBuilder, setTeamBuilder] = useState({
    teamName: 'BallLink United',
    formation: '4-3-3',
    manager: 'You',
    bench: ['Obinna Chukwu', 'Tunde Bello', 'Amaka Nwosu', 'Samuel Adams'],
    availablePlayers: DEFAULT_PLAYERS,
    squad: buildDefaultSquad('Gyang Pam', 'Midfielder'),
  });

  const [chats, setChats] = useState(DEFAULT_CHATS);
  const [chatMessages, setChatMessages] = useState(DEFAULT_MESSAGES);

  // Pitches state (initialized from mock data, editable by users)
  const [pitches, setPitches] = useState(() => FEATURED_PITCHES.map((pitch) => ({
    ...pitch,
    ownerId: pitch.id === 'pitch-002' ? CURRENT_OWNER_ID : 'owner-002',
    availableSlots: pitch.availableSlots || ['17:00', '18:00', '20:00'],
    photos: pitch.photos || ['Main pitch', 'Floodlights', 'Locker room'],
  })));

  // Bookings state (upcoming and past)
  const [bookings, setBookings] = useState([
    {
      id: 'book-101',
      pitchId: 'pitch-002',
      pitchName: 'Rock City Football Centre',
      ownerId: CURRENT_OWNER_ID,
      ownerStatus: 'pending',
      date: '2026-07-12',
      time: '18:00',
      duration: 2,
      totalPrice: 24000,
      status: 'upcoming',
    },
    {
      id: 'book-102',
      pitchId: 'pitch-004',
      pitchName: 'Naraguta Mini Pitch',
      ownerId: 'owner-002',
      ownerStatus: 'accepted',
      date: '2026-07-08',
      time: '19:00',
      duration: 1,
      totalPrice: 6000,
      status: 'past',
    },
    {
      id: 'book-103',
      pitchId: 'pitch-002',
      pitchName: 'Rock City Football Centre',
      ownerId: CURRENT_OWNER_ID,
      ownerStatus: 'accepted',
      date: '2026-07-18',
      time: '19:00',
      duration: 1,
      totalPrice: 12000,
      status: 'upcoming',
    }
  ]);

  const updateProfile = (data) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  const resetProfile = () => {
    setUserProfile({
      userType: 'player',
      name: '',
      sex: '',
      position: '',
      location: '',
      skillLevel: '',
      age: 18,
      preferredFoot: '',
      businessName: '',
      contactNumber: '',
      stats: {
        matchesPlayed: 0,
        goals: 0,
        assists: 0,
        mvpAwards: 0,
      },
      rating: 0,
    });
    setTeamBuilder({
      teamName: 'BallLink United',
      formation: '4-3-3',
      manager: 'You',
      bench: ['Obinna Chukwu', 'Tunde Bello', 'Amaka Nwosu', 'Samuel Adams'],
      availablePlayers: DEFAULT_PLAYERS,
      squad: buildDefaultSquad('', ''),
    });
  };

  const updateTeamBuilder = (data) => {
    setTeamBuilder((prev) => ({ ...prev, ...data }));
  };

  const assignTeamPlayer = (positionId, playerName, fromBench = false) => {
    setTeamBuilder((prev) => {
      const currentPlayer = prev.squad[positionId];
      let nextBench = [...prev.bench];
      if (fromBench) {
        nextBench = nextBench.filter(name => name !== playerName);
      }
      if (currentPlayer && currentPlayer !== 'Tap to assign' && currentPlayer !== playerName && !nextBench.includes(currentPlayer)) {
        nextBench.push(currentPlayer);
      }
      return {
        ...prev,
        squad: {
          ...prev.squad,
          [positionId]: playerName,
        },
        bench: nextBench,
      };
    });
  };

  const clearTeamPosition = (positionId) => {
    setTeamBuilder((prev) => {
      const removedPlayer = prev.squad[positionId];
      const nextBench = removedPlayer && removedPlayer !== 'Tap to assign' && !prev.bench.includes(removedPlayer)
        ? [...prev.bench, removedPlayer]
        : prev.bench;
      return {
        ...prev,
        squad: {
          ...prev.squad,
          [positionId]: 'Tap to assign',
        },
        bench: nextBench,
      };
    });
  };

  const addBenchPlayer = (playerName) => {
    setTeamBuilder((prev) => {
      if (prev.bench.includes(playerName)) return prev;
      return {
        ...prev,
        bench: [...prev.bench, playerName],
      };
    });
  };

  const removeBenchPlayer = (playerName) => {
    setTeamBuilder((prev) => ({
      ...prev,
      bench: prev.bench.filter(name => name !== playerName),
    }));
  };

  const setTeamManager = (manager) => {
    setTeamBuilder((prev) => ({ ...prev, manager }));
  };

  // Pitch actions
  const updatePitch = (id, updatedData) => {
    setPitches(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  // Booking actions
  const addBooking = (newBooking) => {
    setBookings(prev => [
      {
        id: `book-${Date.now()}`,
        status: 'upcoming',
        ownerStatus: 'pending',
        ownerId: newBooking.ownerId || 'owner-unknown',
        ...newBooking
      },
      ...prev
    ]);
  };

  const updateBooking = (id, updatedData) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const acceptBooking = (id) => updateBooking(id, { ownerStatus: 'accepted' });
  const rejectBooking = (id) => updateBooking(id, { ownerStatus: 'rejected' });

  const createPitch = (pitchData) => {
    const id = `pitch-${Date.now()}`;
    const newPitch = {
      id,
      ownerId: CURRENT_OWNER_ID,
      name: pitchData.name,
      location: pitchData.location,
      surface: pitchData.surface,
      pricePerHour: Number(pitchData.pricePerHour),
      rating: 4.5,
      reviewCount: 3,
      available: true,
      tags: pitchData.tags || ['Floodlit', 'Water'],
      availableSlots: pitchData.availableSlots,
      photos: pitchData.photos,
      contactNumber: pitchData.contactNumber || userProfile.contactNumber,
      ownerName: userProfile.businessName,
      imageGradient: pitchData.imageGradient || 'from-[#1a3a5c] via-[#0f2540] to-night-navy',
      accentColor: pitchData.accentColor || '#52B788',
    };
    setPitches(prev => [newPitch, ...prev]);
    return id;
  };

  const markChatRead = (chatId) => {
    setChats(prev => prev.map((chat) => chat.id === chatId ? { ...chat, unread: 0 } : chat));
  };

  const sendChatMessage = (chatId, text) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => ({
      ...prev,
      [chatId]: [
        ...(prev[chatId] || []),
        {
          id: `msg-${Date.now()}`,
          sender: 'You',
          text,
          time,
          outgoing: true,
        },
      ],
    }));
    setChats((prev) => prev.map((chat) => chat.id === chatId
      ? { ...chat, preview: text, lastMessageTime: time, unread: 0 }
      : chat
    ));
  };

  const createChatWithPlayer = (playerName) => {
    const existing = chats.find((chat) => !chat.isGroup && chat.participants.includes(playerName));
    if (existing) return existing.id;

    const newId = `chat-${Date.now()}`;
    const newChat = {
      id: newId,
      name: playerName,
      isGroup: false,
      participants: ['You', playerName],
      preview: 'Ready when you are.',
      lastMessageTime: 'Now',
      unread: 0,
    };

    setChats((prev) => [newChat, ...prev]);
    setChatMessages((prev) => ({
      ...prev,
      [newId]: [
        {
          id: `msg-${Date.now()}-0`,
          sender: playerName,
          text: 'Ready when you are. Let me know the details.',
          time: 'Now',
          outgoing: false,
        },
      ],
    }));

    return newId;
  };

  return (
    <OnboardingContext.Provider value={{
      userProfile,
      updateProfile,
      resetProfile,
      teamBuilder,
      updateTeamBuilder,
      assignTeamPlayer,
      clearTeamPosition,
      addBenchPlayer,
      removeBenchPlayer,
      setTeamManager,
      chats,
      chatMessages,
      markChatRead,
      sendChatMessage,
      createChatWithPlayer,
      pitches,
      currentOwnerId: CURRENT_OWNER_ID,
      createPitch,
      updatePitch,
      bookings,
      addBooking,
      updateBooking,
      acceptBooking,
      rejectBooking,
      cancelBooking
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
