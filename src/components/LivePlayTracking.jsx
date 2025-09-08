import { useState, useEffect } from 'react'
import SaintsToast from './SaintsToast'
import fleurDeLis from '../assets/FdL.png'

function LivePlayTracking({ gameSession, onEndGame }) {
  const [playData, setPlayData] = useState({
    type: 'offense', // offense, defense, special
    players: []
  })
  const [activePlayers, setActivePlayers] = useState([])
  const [gameStats, setGameStats] = useState({})
  const [toastMessage, setToastMessage] = useState(null)

  useEffect(() => {
    // Get active players from roster
    const savedRoster = localStorage.getItem('saints-roster')
    if (savedRoster) {
      const roster = JSON.parse(savedRoster)
      const activePlayersList = roster.filter(player => 
        gameSession.activePlayers.includes(player.id)
      )
      setActivePlayers(activePlayersList)
      
      // Initialize stats
      const initialStats = {}
      activePlayersList.forEach(player => {
        initialStats[player.id] = {
          total: 0,
          offense: 0,
          defense: 0,
          special: 0
        }
      })
      setGameStats(initialStats)
    }
  }, [gameSession])

  const togglePlayerInPlay = (playerId) => {
    setPlayData(prev => ({
      ...prev,
      players: prev.players.includes(playerId)
        ? prev.players.filter(id => id !== playerId)
        : [...prev.players, playerId]
    }))
  }

  const setPlayType = (type) => {
    setPlayData(prev => ({
      ...prev,
      type
    }))
  }

  const recordPlay = () => {
    if (playData.players.length === 0) {
      setToastMessage({
        message: 'Select players first!',
        type: 'warning'
      })
      return
    }

    // Check for achievements before updating
    const playersToCheck = playData.players.map(playerId => ({
      id: playerId,
      name: activePlayers.find(p => p.id === playerId)?.name,
      currentPlays: gameStats[playerId].total
    }))

    // Update game stats
    const newStats = { ...gameStats }
    playData.players.forEach(playerId => {
      newStats[playerId].total += 1
      newStats[playerId][playData.type] += 1
    })
    setGameStats(newStats)

    // Check for Saints achievements
    playersToCheck.forEach(player => {
      const newTotal = player.currentPlays + 1
      if (newTotal === 8) {
        setToastMessage({
          message: `Saints Strong! ${player.name} reaches 8 plays!`,
          type: 'celebration'
        })
      }
    })

    // Check if all players now have 8+ plays
    const allPlayersReached8 = Object.values(newStats).every(stats => stats.total >= 8)
    if (allPlayersReached8 && Object.values(gameStats).some(stats => stats.total < 8)) {
      setToastMessage({
        message: 'Team Unity! All Saints have 8+ plays!',
        type: 'achievement'
      })
    }

    // Save play to session
    const updatedSession = {
      ...gameSession,
      plays: [...gameSession.plays, {
        id: Date.now(),
        type: playData.type,
        players: [...playData.players],
        timestamp: new Date().toISOString()
      }]
    }

    // Save to localStorage
    localStorage.setItem('current-game-session', JSON.stringify(updatedSession))

    // Show success message
    if (!toastMessage) {
      setToastMessage({
        message: `Play recorded! ${playData.players.length} Saints`,
        type: 'success'
      })
    }

    // Reset play data
    setPlayData({
      type: playData.type, // Keep same play type
      players: []
    })
  }

  const getPlayerStats = (playerId) => {
    return gameStats[playerId] || { total: 0, offense: 0, defense: 0, special: 0 }
  }

  const getPlayersUnder8 = () => {
    return activePlayers.filter(player => getPlayerStats(player.id).total < 8)
  }

  const handleEndGame = () => {
    const finalSession = {
      ...gameSession,
      plays: gameSession.plays,
      endTime: new Date().toISOString(),
      finalStats: gameStats
    }

    // Save completed game
    const completedGames = JSON.parse(localStorage.getItem('completed-games') || '[]')
    completedGames.push(finalSession)
    localStorage.setItem('completed-games', JSON.stringify(completedGames))
    
    // Clear current session
    localStorage.removeItem('current-game-session')
    
    onEndGame(finalSession)
  }

  const playersUnder8 = getPlayersUnder8()
  const totalPlays = gameSession.plays?.length || 0

  return (
    <div className="live-play-tracking">
      {toastMessage && (
        <SaintsToast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
      <div className="game-header">
        <div className="game-info">
          <h2>vs {gameSession.opponent}</h2>
          <p>{new Date(gameSession.date).toLocaleDateString()} • Coach: {gameSession.coachName}</p>
          <p className="play-count">Total Plays: {totalPlays}</p>
        </div>
        <button className="end-game-btn" onClick={handleEndGame}>
          End Game
        </button>
      </div>

      {playersUnder8.length > 0 && (
        <div className="players-under-8-alert">
          <h4><img src={fleurDeLis} alt="Fleur-de-lis" className="inline-fdl" /> Saints Need More Time ({playersUnder8.length} under 8 plays)</h4>
          <div className="under-8-list">
            {playersUnder8.map(player => (
              <span key={player.id} className="under-8-player">
                #{player.jersey} {player.name} ({getPlayerStats(player.id).total})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="play-type-selector">
        <h3>Play Type</h3>
        <div className="play-type-buttons">
          <button
            className={`play-type-btn ${playData.type === 'offense' ? 'active' : ''}`}
            onClick={() => setPlayType('offense')}
          >
            Offense
          </button>
          <button
            className={`play-type-btn ${playData.type === 'defense' ? 'active' : ''}`}
            onClick={() => setPlayType('defense')}
          >
            Defense
          </button>
          <button
            className={`play-type-btn ${playData.type === 'special' ? 'active' : ''}`}
            onClick={() => setPlayType('special')}
          >
            Special Teams
          </button>
        </div>
      </div>

      <div className="player-selection">
        <div className="player-selection-header">
          <h3>Select Players ({playData.players.length} selected)</h3>
          <button
            className="record-play-btn"
            onClick={recordPlay}
            disabled={playData.players.length === 0}
          >
            Record Play
          </button>
        </div>

        <div className="players-tracking-grid">
          {activePlayers.map(player => {
            const stats = getPlayerStats(player.id)
            const isSelected = playData.players.includes(player.id)
            const playCount = stats.total
            
            // Saints status classification
            let statusClass = ''
            if (playCount >= 8) {
              statusClass = 'plays-8-plus'
            } else if (playCount >= 6) {
              statusClass = 'plays-6-7'
            } else {
              statusClass = 'plays-0-5'
            }

            return (
              <div
                key={player.id}
                className={`player-tracking-card ${isSelected ? 'selected' : ''} ${statusClass}`}
                onClick={() => togglePlayerInPlay(player.id)}
              >
                <div className="player-tracking-header">
                  <span className="jersey-number-large">#{player.jersey}</span>
                  <div className="selection-checkbox">
                    {isSelected ? '✓' : ''}
                  </div>
                </div>
                <div className="player-tracking-name">{player.name}</div>
                <div className="player-tracking-stats">
                  <div className="total-plays">Total: {stats.total}</div>
                  <div className="play-breakdown">
                    O: {stats.offense} | D: {stats.defense} | ST: {stats.special}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LivePlayTracking