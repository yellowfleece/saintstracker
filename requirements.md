Excellent - that "start game" flow is clean and intuitive. Here's the complete requirements package:

## 12U Football Play Tracker - MVP Requirements

**Tech Stack:**
• React SPA deployed on Netlify (free hosting)
• localStorage for data persistence
• Mobile-first responsive design

**Data Structure:**
• **Season Roster:** Player name + jersey number (persistent)
• **Game Session:** Date, opponent, coach name, active players
• **Play Data:** Player participation + play type (offense/defense/special teams)

**Core User Flows:**

1. **Roster Management**
   - Add/remove players from season roster
   - Backup/restore roster functionality

2. **Game Setup**
   - "Start Game" with date, opponent, coach name
   - Select active players from season roster

3. **Live Play Tracking**
   - Quick checkbox interface for player selection
   - Play type selector (O/D/ST)
   - Real-time play count display

4. **Game Summary**
   - Player totals with 8-play minimum highlighting
   - Play type breakdown per player
   - PDF export functionality
   - Reset/new game option

**Key Features:**
• Multiple coaches can use independently
• Session persistence (game data survives browser refresh)
• Export includes: player/jersey, total plays, O/D/ST breakdown
• Clear visual indicators for players under 8 plays