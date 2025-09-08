# Saints Tracker - 12U Football Play Tracker

A mobile-first React app for tracking player participation in 12U football games.

## Features

### ✅ Completed (MVP Phase 1)
- **Roster Management**: Add, edit, and remove players with jersey numbers
- **Data Persistence**: All roster data saved in localStorage
- **Mobile-First Design**: Responsive layout optimized for mobile use
- **Export/Import**: Backup and restore roster data as JSON
- **Input Validation**: Duplicate jersey number prevention, name validation
- **Node.js 18 Compatible**: Works with current Node.js versions

### 🚧 Coming Next
- **Game Setup**: Start games with date, opponent, and coach info
- **Live Play Tracking**: Quick checkbox interface for tracking player participation
- **Play Type Selection**: Track Offense/Defense/Special Teams plays
- **Game Summary**: View player totals with 8-play minimum highlighting
- **PDF Export**: Export game summaries as PDF

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
SaintsTracker/
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   │   └── RosterManagement.jsx
│   ├── hooks/         # Custom React hooks (for future use)
│   ├── utils/         # Utility functions (for future use)
│   ├── styles/        # Additional styles (for future use)
│   ├── App.jsx        # Main app component
│   ├── App.css        # Main styles
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
├── package.json
├── vite.config.js
├── requirements.md    # Original requirements
└── README.md
```

## Usage Guide

### Roster Management
1. **Add Players**: Enter name and jersey number (1-99), then click "Add Player"
2. **Edit Players**: Click "Edit" button on any player card to modify details
3. **Remove Players**: Click "Remove" with confirmation dialog
4. **Export Data**: Click "Export Roster" to download JSON backup
5. **Import Data**: Click "Import Roster" to restore from JSON file

### Data Storage
- All roster data automatically saved to browser localStorage
- Data persists between browser sessions
- Each browser/device maintains independent roster data
- Perfect for multiple coaches using different devices

## Tech Stack
- **React 18.2** - UI framework
- **Vite 4.4** - Build tool and dev server (Node.js 18 compatible)
- **CSS3** - Mobile-first responsive design
- **localStorage API** - Client-side data persistence
- **ESLint** - Code quality and consistency

## Browser Support
- Modern browsers with ES2020+ support
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 7+)
- Desktop Chrome, Firefox, Safari, Edge

## Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload the `dist/` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Other Static Hosts
The app is a static SPA - deploy the `dist/` folder contents to any static hosting service.

## Development Notes
- Uses React 18.2 and Vite 4.4 for Node.js 18 compatibility
- Mobile-first responsive design principles
- localStorage provides offline-capable data persistence
- Component-based architecture ready for feature expansion

## Next Development Phase
Ready to implement:
1. Game session management with date/opponent tracking
2. Real-time play tracking interface
3. Play type categorization (Offense/Defense/Special Teams)
4. Game summary reports with 8-play minimum highlighting
5. PDF export functionality
