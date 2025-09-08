import { useState, useEffect } from 'react'

function GameSummary({ gameSession, onNewGame }) {
  const [playerStats, setPlayerStats] = useState([])

  useEffect(() => {
    if (gameSession && gameSession.finalStats) {
      // Get roster to match player IDs with names
      const savedRoster = localStorage.getItem('saints-roster')
      if (savedRoster) {
        const roster = JSON.parse(savedRoster)
        const statsWithPlayerInfo = Object.entries(gameSession.finalStats).map(([playerId, stats]) => {
          const player = roster.find(p => p.id.toString() === playerId)
          return {
            ...stats,
            playerId: playerId,
            name: player?.name || 'Unknown',
            jersey: player?.jersey || '?'
          }
        })
        
        // Sort by total plays (descending), then by jersey number
        statsWithPlayerInfo.sort((a, b) => {
          if (b.total !== a.total) {
            return b.total - a.total
          }
          return a.jersey - b.jersey
        })
        
        setPlayerStats(statsWithPlayerInfo)
      }
    }
  }, [gameSession])

  const exportGameSummary = () => {
    const summaryData = {
      gameInfo: {
        date: gameSession.date,
        opponent: gameSession.opponent,
        coach: gameSession.coachName,
        startTime: gameSession.startTime,
        endTime: gameSession.endTime,
        totalPlays: gameSession.plays?.length || 0
      },
      playerStats: playerStats.map(player => ({
        jersey: player.jersey,
        name: player.name,
        totalPlays: player.total,
        offense: player.offense,
        defense: player.defense,
        specialTeams: player.special,
        under8Plays: player.total < 8
      }))
    }

    const dataStr = JSON.stringify(summaryData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `saints-game-${gameSession.opponent}-${gameSession.date}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const playersUnder8 = playerStats.filter(player => player.total < 8)
  const totalPlays = gameSession.plays?.length || 0

  if (!gameSession) {
    return (
      <div className="game-summary">
        <div className="no-game-message">
          <h2>No Game Data</h2>
          <p>Start a new game to see the summary here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="game-summary">
      <div className="summary-header">
        <h2>Game Summary</h2>
        <div className="game-details">
          <p><strong>vs {gameSession.opponent}</strong></p>
          <p>{new Date(gameSession.date).toLocaleDateString()}</p>
          <p>Coach: {gameSession.coachName}</p>
          <p>Total Plays: {totalPlays}</p>
          {gameSession.endTime && (
            <p>Duration: {Math.round((new Date(gameSession.endTime) - new Date(gameSession.startTime)) / (1000 * 60))} minutes</p>
          )}
        </div>
      </div>

      {playersUnder8.length > 0 && (
        <div className="under-8-summary">
          <h3>⚠️ Players Under 8 Plays ({playersUnder8.length})</h3>
          <div className="under-8-players">
            {playersUnder8.map(player => (
              <div key={player.playerId} className="under-8-player-card">
                <span className="jersey-number">#{player.jersey}</span>
                <span className="player-name">{player.name}</span>
                <span className="play-count">{player.total} plays</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="player-stats-table">
        <h3>Player Statistics</h3>
        <div className="stats-table">
          <div className="stats-header">
            <div className="col-jersey">#</div>
            <div className="col-name">Player</div>
            <div className="col-total">Total</div>
            <div className="col-offense">Off</div>
            <div className="col-defense">Def</div>
            <div className="col-special">ST</div>
          </div>
          {playerStats.map(player => (
            <div 
              key={player.playerId} 
              className={`stats-row ${player.total < 8 ? 'under-8-row' : ''}`}
            >
              <div className="col-jersey">#{player.jersey}</div>
              <div className="col-name">{player.name}</div>
              <div className="col-total">{player.total}</div>
              <div className="col-offense">{player.offense}</div>
              <div className="col-defense">{player.defense}</div>
              <div className="col-special">{player.special}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="summary-actions">
        <button onClick={exportGameSummary} className="export-btn">
          Export Summary
        </button>
        <button onClick={onNewGame} className="new-game-btn">
          Start New Game
        </button>
      </div>
    </div>
  )
}

export default GameSummary