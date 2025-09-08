import { useState, useEffect } from 'react'
import RosterManagement from './components/RosterManagement'
import GameSetup from './components/GameSetup'
import LivePlayTracking from './components/LivePlayTracking'
import GameSummary from './components/GameSummary'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('roster')
  const [gameSession, setGameSession] = useState(null)
  const [completedGame, setCompletedGame] = useState(null)

  useEffect(() => {
    // Check for existing game session on load
    const savedSession = localStorage.getItem('current-game-session')
    if (savedSession) {
      const session = JSON.parse(savedSession)
      setGameSession(session)
      setCurrentView('live')
    }
  }, [])

  const handleStartGame = (newGameSession) => {
    setGameSession(newGameSession)
    setCurrentView('live')
    // Save session to localStorage
    localStorage.setItem('current-game-session', JSON.stringify(newGameSession))
  }

  const handleEndGame = (finalGameSession) => {
    setCompletedGame(finalGameSession)
    setGameSession(null)
    setCurrentView('summary')
  }

  const handleNewGame = () => {
    setCompletedGame(null)
    setCurrentView('game-setup')
  }

  const canAccessGameFeatures = () => {
    const savedRoster = localStorage.getItem('saints-roster')
    return savedRoster && JSON.parse(savedRoster).length > 0
  }

  const renderView = () => {
    switch (currentView) {
      case 'roster':
        return <RosterManagement />
      case 'game-setup':
        return <GameSetup onStartGame={handleStartGame} />
      case 'live':
        return gameSession ? (
          <LivePlayTracking 
            gameSession={gameSession} 
            onEndGame={handleEndGame}
          />
        ) : (
          <div className="no-game-session">
            <p>No active game session.</p>
            <button onClick={() => setCurrentView('game-setup')}>Start New Game</button>
          </div>
        )
      case 'summary':
        return <GameSummary gameSession={completedGame} onNewGame={handleNewGame} />
      default:
        return <RosterManagement />
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="saints-title">Silver Spring Saints</div>
        <div className="saints-subtitle">Play Tracker</div>
        <div className="saints-tagline">Building Character Through Every Play</div>
      </header>
      
      <nav className="app-nav">
        <button 
          className={currentView === 'roster' ? 'active' : ''}
          onClick={() => setCurrentView('roster')}
        >
          Roster
        </button>
        <button 
          className={currentView === 'game-setup' ? 'active' : ''}
          onClick={() => setCurrentView('game-setup')}
          disabled={!canAccessGameFeatures()}
          title={!canAccessGameFeatures() ? 'Add players to roster first' : ''}
        >
          New Game
        </button>
        {gameSession && (
          <button 
            className={currentView === 'live' ? 'active' : ''}
            onClick={() => setCurrentView('live')}
          >
            Live Game
          </button>
        )}
        <button 
          className={currentView === 'summary' ? 'active' : ''}
          onClick={() => setCurrentView('summary')}
          disabled={!completedGame}
        >
          Summary
        </button>
      </nav>

      <main className="app-main">
        {renderView()}
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <div className="saints-heritage">Since 1951</div>
          <div className="saints-motto">FUN is the key to FUNdamental</div>
        </div>
      </footer>
    </div>
  )
}

export default App
