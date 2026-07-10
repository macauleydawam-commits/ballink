import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_PLAYERS } from '../data/mockData'; 

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

const MOCK_PROFILE = {
  userType: 'player',
  name: 'Guest Player',
  sex: 'Male',
  position: 'Midfielder',
  location: 'Jos',
  skillLevel: 'Beginner',
  age: 18,
  preferredFoot: 'Right',
  businessName: '',
  contactNumber: '',
  avatar: null,
  stats: { matchesPlayed: 0, goals: 0, assists: 0, mvpAwards: 0 },
  rating: 0,
};

export function OnboardingProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(MOCK_PROFILE);
  const [teamBuilder, setTeamBuilder] = useState({
    teamName: 'BallLink United',
    formation: '4-3-3',
    manager: 'You',
    bench: [],
    availablePlayers: DEFAULT_PLAYERS,
    squad: buildDefaultSquad('Guest', 'Midfielder'),
  });
  const [chats, setChats] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [pitches, setPitches] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Data when Session Changes
  useEffect(() => {
    if (session?.user) {
      fetchUserProfile(session.user.id);
      fetchPitches();
      fetchBookings(session.user.id);
    } else {
      // Reset to defaults if not logged in
      setUserProfile(MOCK_PROFILE);
      setPitches([]);
      setBookings([]);
      setLoading(false);
    }
  }, [session]);

  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (!error && data) {
      setUserProfile({
        id: data.id,
        userType: data.user_type,
        name: data.name || '',
        sex: data.sex || '',
        position: data.position || '',
        location: data.location || '',
        skillLevel: data.skill_level || '',
        age: data.age || 18,
        preferredFoot: data.preferred_foot || '',
        businessName: data.business_name || '',
        contactNumber: data.contact_number || '',
        avatar: data.avatar_url || null,
        stats: {
          matchesPlayed: data.stats_matches_played || 0,
          goals: data.stats_goals || 0,
          assists: data.stats_assists || 0,
          mvpAwards: data.stats_mvp_awards || 0,
        },
        rating: data.rating || 0,
      });
    }
    setLoading(false);
  };

  const fetchPitches = async () => {
    const { data, error } = await supabase.from('pitches').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setPitches(data.map(p => ({
        ...p,
        pricePerHour: p.price_per_hour,
        reviewCount: p.review_count,
        availableSlots: p.available_slots || [],
        imageGradient: p.image_gradient || 'from-[#1a3a5c] via-[#0f2540] to-night-navy',
        accentColor: p.accent_color || '#52B788',
        ownerId: p.owner_id
      })));
    }
  };

  const fetchBookings = async (userId) => {
    const { data, error } = await supabase.from('bookings').select('*, pitches(name)').or(`player_id.eq.${userId},owner_id.eq.${userId}`);
    if (!error && data) {
      setBookings(data.map(b => ({
        ...b,
        pitchName: b.pitches?.name || 'Unknown Pitch',
        ownerStatus: b.owner_status,
        totalPrice: b.total_price,
        pitchId: b.pitch_id,
        ownerId: b.owner_id,
        playerId: b.player_id
      })));
    }
  };

  const updateProfile = async (data) => {
    if (!session?.user) return;
    const updates = {
      name: data.name,
      user_type: data.userType,
      sex: data.sex,
      position: data.position,
      location: data.location,
      skill_level: data.skillLevel,
      age: data.age,
      preferred_foot: data.preferredFoot,
      business_name: data.businessName,
      contact_number: data.contactNumber,
      avatar_url: data.avatar,
    };
    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);
    await supabase.from('profiles').update(updates).eq('id', session.user.id);
    await fetchUserProfile(session.user.id);
  };

  const resetProfile = () => {};

  // Team Builder (Mocked for now as we transition)
  const updateTeamBuilder = (data) => setTeamBuilder(prev => ({...prev, ...data}));
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
        squad: { ...prev.squad, [positionId]: playerName },
        bench: nextBench,
      };
    });
  };
  const clearTeamPosition = (positionId) => {
    setTeamBuilder((prev) => {
      const removedPlayer = prev.squad[positionId];
      const nextBench = removedPlayer && removedPlayer !== 'Tap to assign' && !prev.bench.includes(removedPlayer)
        ? [...prev.bench, removedPlayer] : prev.bench;
      return { ...prev, squad: { ...prev.squad, [positionId]: 'Tap to assign' }, bench: nextBench };
    });
  };
  const addBenchPlayer = (playerName) => {
    setTeamBuilder((prev) => {
      if (prev.bench.includes(playerName)) return prev;
      return { ...prev, bench: [...prev.bench, playerName] };
    });
  };
  const removeBenchPlayer = (playerName) => {
    setTeamBuilder((prev) => ({ ...prev, bench: prev.bench.filter(name => name !== playerName) }));
  };
  const setTeamManager = (manager) => setTeamBuilder((prev) => ({ ...prev, manager }));
  const createNewTeam = (teamName) => {
    setTeamBuilder({
      teamName: teamName || 'New Team',
      formation: '4-3-3',
      manager: 'You',
      bench: [],
      availablePlayers: DEFAULT_PLAYERS,
      squad: buildDefaultSquad('', ''),
    });
  };

  const createPitch = async (pitchData) => {
    if (!session?.user) return;
    const newPitch = {
      owner_id: session.user.id,
      name: pitchData.name,
      location: pitchData.location,
      surface: pitchData.surface,
      price_per_hour: Number(pitchData.pricePerHour),
      tags: pitchData.tags || [],
      available_slots: pitchData.availableSlots || [],
      photos: pitchData.photos || [],
      contact_number: pitchData.contactNumber || userProfile.contactNumber,
      image_gradient: pitchData.imageGradient || 'from-[#1a3a5c] via-[#0f2540] to-night-navy',
      accent_color: pitchData.accentColor || '#52B788',
    };
    await supabase.from('pitches').insert(newPitch);
    fetchPitches();
  };

  const updatePitch = async (id, updatedData) => {
    if (!session?.user) return;
    await supabase.from('pitches').update(updatedData).eq('id', id);
    fetchPitches();
  };

  const addBooking = async (newBooking) => {
    if (!session?.user) return;
    const dbBooking = {
      pitch_id: newBooking.pitchId,
      player_id: session.user.id,
      owner_id: newBooking.ownerId,
      date: newBooking.date,
      time: newBooking.time,
      duration: newBooking.duration,
      total_price: newBooking.totalPrice,
      status: 'upcoming',
      owner_status: 'pending'
    };
    await supabase.from('bookings').insert(dbBooking);
    fetchBookings(session.user.id);
  };

  const updateBooking = async (id, updatedData) => {
    if (!session?.user) return;
    await supabase.from('bookings').update(updatedData).eq('id', id);
    fetchBookings(session.user.id);
  };

  const cancelBooking = async (id) => {
    if (!session?.user) return;
    await supabase.from('bookings').delete().eq('id', id);
    fetchBookings(session.user.id);
  };

  const acceptBooking = (id) => updateBooking(id, { owner_status: 'accepted' });
  const rejectBooking = (id) => updateBooking(id, { owner_status: 'rejected' });

  // Chat placeholders
  const markChatRead = () => {};
  const sendChatMessage = () => {};
  const createChatWithPlayer = () => 'chat-000';

  return (
    <OnboardingContext.Provider value={{
      session,
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
      createNewTeam,
      chats,
      chatMessages,
      markChatRead,
      sendChatMessage,
      createChatWithPlayer,
      pitches,
      currentOwnerId: session?.user?.id || 'guest',
      createPitch,
      updatePitch,
      bookings,
      addBooking,
      updateBooking,
      acceptBooking,
      rejectBooking,
      cancelBooking
    }}>
      {!loading && children}
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
