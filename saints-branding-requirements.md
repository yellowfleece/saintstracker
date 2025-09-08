# Silver Spring Saints Play Tracker - Branding & Design Requirements

## Color Palette

**Primary Colors:**
- **Saints Gold:** #B8A472 (primary accent, buttons, highlights)
- **Navy Blue:** #1B2951 (primary text, headers, borders)
- **White:** #FFFFFF (backgrounds, contrast text)

**Secondary/Supporting Colors:**
- **Light Gold:** #D4C69A (subtle backgrounds, hover states)
- **Dark Navy:** #0F1A2E (deep accents, shadows)
- **Light Gray:** #F8F9FA (neutral backgrounds)
- **Success Green:** #28A745 (8+ plays achieved indicator)
- **Warning Orange:** #FFC107 (less than 8 plays warning)

## Typography

**Font Hierarchy:**
- **Headers:** Bold, athletic font (suggest Roboto Condensed Bold or similar)
- **App Title:** All-caps styling referencing Saints wordmark tradition
- **Body Text:** Clean, readable sans-serif (Roboto or system default)
- **Numbers/Stats:** Monospace font for consistent alignment
- **Buttons:** Semi-bold for clear action items

**Text Styling:**
- All-caps for team name and key headers
- Bold emphasis for play counts and critical information
- High contrast ratios for outdoor visibility

## Logo & Visual Elements

**Fleur-de-lis Integration:**
- Subtle fleur-de-lis icon in app header/navigation
- Loading screen with animated fleur-de-lis
- Success celebrations incorporating the symbol
- Favicon using simplified fleur-de-lis design

**Saints Branding Elements:**
- "SILVER SPRING SAINTS" in header with fleur-de-lis
- "Since 1951" heritage callout in footer
- "SAINTS PLAY TRACKER" as primary app title

## UI Components

**Buttons:**
- Primary: Navy background (#1B2951) with gold border (#B8A472)
- Secondary: Gold background (#B8A472) with navy text
- Success: Green (#28A745) for completion actions
- Large touch targets (minimum 44px) for mobile use

**Cards/Containers:**
- White backgrounds with navy borders
- Gold accent strips for active states
- Subtle shadows for depth
- Rounded corners for modern feel

**Player Status Indicators:**
- **8+ Plays:** Green background with white checkmark
- **6-7 Plays:** Yellow/orange background with warning icon
- **0-5 Plays:** Red background with alert icon
- **Active in Current Play:** Gold highlight border

## Mobile-First Design Considerations

**Visibility & Usability:**
- High contrast color combinations for outdoor use
- Large, clearly labeled buttons for quick sideline interaction
- Minimal visual clutter during live play tracking
- Clear visual hierarchy for scanning information quickly

**Touch Interactions:**
- Large checkbox areas for player selection
- Swipe gestures for navigation between views
- Haptic feedback for successful actions (if supported)

## Messaging & Content Tone

**Team Values Integration:**
- "Building Character Through Every Play" - primary tagline
- "FUN is the key to FUNdamental" - reference in help/about sections
- Success messages emphasizing teamwork and sportsmanship
- Error messages that maintain positive, encouraging tone

**Achievement Celebrations:**
- "Saints Strong!" when player reaches 8 plays
- Team-wide celebrations when all players reach minimum
- References to Saints values (character, teamwork, responsibility)

## Specific UI Screens

**Header Design:**
```
[🜲] SILVER SPRING SAINTS - PLAY TRACKER
```

**Play Counter Display:**
- Large, bold numbers in navy
- Gold background for achieved goals
- Fleur-de-lis separator between player name and count

**Game Summary Layout:**
- Saints colors for section headers
- Gold highlighting for standout statistics
- Navy text on white backgrounds for readability

## Technical Implementation Notes

**CSS Variables:**
```css
:root {
  --saints-gold: #B8A472;
  --saints-navy: #1B2951;
  --saints-light-gold: #D4C69A;
  --saints-dark-navy: #0F1A2E;
  --success-green: #28A745;
  --warning-orange: #FFC107;
}
```

**Responsive Breakpoints:**
- Mobile-first design priority
- Optimize for phone screens 375px-414px wide
- Ensure usability in landscape mode for tablet users

## Brand Consistency Guidelines

**Do's:**
- Use fleur-de-lis sparingly but meaningfully
- Maintain high contrast for accessibility
- Keep Saints heritage prominent but not overwhelming
- Emphasize functionality over decoration

**Don'ts:**
- Don't overuse decorative elements that slow interaction
- Avoid color combinations that reduce readability
- Don't compete with team's official branding
- Avoid cluttered layouts that hinder quick decision-making

## Future Enhancement Considerations

**Advanced Branding:**
- Custom Saints-themed icons for different play types
- Animated transitions using team colors
- Photo upload integration with Saints branding overlay
- Team roster photos with consistent styling

**Seasonal Adaptations:**
- Championship/playoff special styling
- Season achievement badges
- Historical team performance integration