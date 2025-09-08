import { useState, useEffect } from 'react'

function GameSetup({ onStartGame }) {
  const [gameData, setGameData] = useState({
    date: new Date().toISOString().split('T')[0],
    opponent: '',
    coachName: '',
    activePlayers: []
  })
  const [availablePlayers, setAvailablePlayers] = useState([])

  useEffect(() => {
    const savedRoster = localStorage.getItem('saints-roster')
    if (savedRoster) {
      setAvailablePlayers(JSON.parse(savedRoster))
    }
  }, [])

  const handleInputChange = (field, value) => {
    setGameData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const togglePlayerActive = (playerId) => {
    setGameData(prev => ({
      ...prev,
      activePlayers: prev.activePlayers.includes(playerId)
        ? prev.activePlayers.filter(id => id !== playerId)
        : [...prev.activePlayers, playerId]
    }))
  }

  const selectAllPlayers = () => {
    setGameData(prev => ({
      ...prev,
      activePlayers: availablePlayers.map(p => p.id)
    }))
  }

  const clearAllPlayers = () => {
    setGameData(prev => ({
      ...prev,
      activePlayers: []
    }))
  }

  const canStartGame = () => {
    return gameData.opponent.trim() && 
           gameData.coachName.trim() && 
           gameData.activePlayers.length > 0
  }

  const handleStartGame = () => {
    if (canStartGame()) {
      const gameSession = {
        ...gameData,
        id: Date.now(),
        startTime: new Date().toISOString(),
        plays: []
      }
      onStartGame(gameSession)
    }
  }

  return (
    <div className="game-setup">
      <div className="game-setup-header">
        <h2>Start New Game</h2>
        <p>Set up game details and select active players</p>
      </div>

      <div className="game-setup-form">
        <div className="form-section">
          <h3>Game Information</h3>
          <div className="form-group">
            <label htmlFor="game-date">Game Date</label>
            <input
              id="game-date"
              type="date"
              value={gameData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="opponent">Opponent</label>
            <input
              id="opponent"
              type="text"
              placeholder="Enter opponent team name"
              value={gameData.opponent}
              onChange={(e) => handleInputChange('opponent', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coach">Coach Name</label>
            <input
              id="coach"
              type="text"
              placeholder="Enter coach name"
              value={gameData.coachName}
              onChange={(e) => handleInputChange('coachName', e.target.value)}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="players-section-header">
            <h3>Active Players ({gameData.activePlayers.length}/{availablePlayers.length})</h3>
            <div className="player-selection-actions">
              <button type="button" onClick={selectAllPlayers}>Select All</button>
              <button type="button" onClick={clearAllPlayers}>Clear All</button>
            </div>
          </div>

          {availablePlayers.length === 0 ? (
            <div className="no-players-message">
              <p>No players in roster. Add players in the Roster tab first.</p>
            </div>
          ) : (
            <div className="players-grid">
              {availablePlayers.map(player => (
                <div
                  key={player.id}
                  className={`player-selector ${gameData.activePlayers.includes(player.id) ? 'selected' : ''}`}
                  onClick={() => togglePlayerActive(player.id)}
                >
                  <div className="player-selector-info">
                    <span className="jersey-badge">#{player.jersey}</span>
                    <span className="player-name-small">{player.name}</span>
                  </div>
                  <div className="selection-indicator">
                    {gameData.activePlayers.includes(player.id) ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="game-setup-actions">
          <button
            className="start-game-btn"
            onClick={handleStartGame}
            disabled={!canStartGame()}
          >
            Start Game
          </button>
          {!canStartGame() && (
            <p className="start-game-requirements">
              Please fill in opponent, coach name, and select at least one player
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameSetup