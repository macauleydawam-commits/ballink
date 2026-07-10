# Ballink - Stage 8 Prototype

Welcome to the Ballink prototype! This codebase is currently a frontend-only MVP representing stages 1 through 8 of the product roadmap.

## Architecture Status (Mock vs. Real Backend)

At this stage, **there is no real backend connected**. All data interactions, bookings, profile updates, and chats are handled locally in memory using React Context.

### What is Mocked (Virtual)
- **Data Storage:** All pitch listings, matches, users, and chat messages are predefined in \src/data/mockData.js\.
- **State Management:** \src/context/OnboardingContext.jsx\ acts as our virtual backend. It manages the global state (pitches, bookings, user profile, team builder) and provides simulated CRUD operations.
- **Authentication:** There is no real auth. Users can freely switch between the Player and Owner flows via the landing page or auth screens.
- **Loading States:** All loading spinners and skeleton loaders currently use simulated delays (e.g., \setTimeout\ for 500ms) to represent network latency.

### What is Real (Ready for Next Stage)
- **UI / UX Design:** The entire component tree, responsive layouts (tested down to 375px), color palette, and micro-animations are finalized.
- **Routing:** React Router is fully set up mapping out all the core flows (Dashboard, Pitch Details, Chat, etc.).
- **Component Structure:** The separation of concerns between Pages, Context, and smaller UI components is solid.

## Next Steps (Stage 9: Supabase Integration)

As we move to Stage 9, the transition will primarily involve:
1. **Replacing Context Functions:** Swapping out the simulated functions in \OnboardingContext.jsx\ (like \ddBooking\, \updatePitch\) with real async calls to Supabase.
2. **Supabase Auth:** Implementing real authentication for Players and Owners, securing routes accordingly.
3. **Database Schema:** Mapping the structures in \mockData.js\ directly to Supabase PostgreSQL tables.
