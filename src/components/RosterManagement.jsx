import { useState, useEffect } from 'react'

function RosterManagement() {
  const [players, setPlayers] = useState([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [newPlayerJersey, setNewPlayerJersey] = useState('')
  const [isEditing, setIsEditing] = useState(null)

  useEffect(() => {
    const savedRoster = localStorage.getItem('saints-roster')
    if (savedRoster) {
      setPlayers(JSON.parse(savedRoster))
    }
  }, [])

  const saveRoster = (updatedPlayers) => {
    localStorage.setItem('saints-roster', JSON.stringify(updatedPlayers))
    setPlayers(updatedPlayers)
  }

  const addPlayer = () => {
    if (!newPlayerName.trim() || !newPlayerJersey.trim()) return

    const jerseyNum = parseInt(newPlayerJersey)
    if (isNaN(jerseyNum) || jerseyNum < 1 || jerseyNum > 99) {
      alert('Jersey number must be between 1 and 99')
      return
    }

    const existingJersey = players.find(p => p.jersey === jerseyNum)
    if (existingJersey) {
      alert('Jersey number already exists')
      return
    }

    const newPlayer = {
      id: Date.now(),
      name: newPlayerName.trim(),
      jersey: jerseyNum
    }

    const updatedPlayers = [...players, newPlayer].sort((a, b) => a.jersey - b.jersey)
    saveRoster(updatedPlayers)
    
    setNewPlayerName('')
    setNewPlayerJersey('')
  }

  const removePlayer = (playerId) => {
    if (window.confirm('Are you sure you want to remove this player?')) {
      const updatedPlayers = players.filter(p => p.id !== playerId)
      saveRoster(updatedPlayers)
    }
  }

  const startEdit = (player) => {
    setIsEditing({
      id: player.id,
      name: player.name,
      jersey: player.jersey.toString()
    })
  }

  const saveEdit = () => {
    if (!isEditing.name.trim() || !isEditing.jersey.trim()) return

    const jerseyNum = parseInt(isEditing.jersey)
    if (isNaN(jerseyNum) || jerseyNum < 1 || jerseyNum > 99) {
      alert('Jersey number must be between 1 and 99')
      return
    }

    const existingJersey = players.find(p => p.jersey === jerseyNum && p.id !== isEditing.id)
    if (existingJersey) {
      alert('Jersey number already exists')
      return
    }

    const updatedPlayers = players.map(p => 
      p.id === isEditing.id 
        ? { ...p, name: isEditing.name.trim(), jersey: jerseyNum }
        : p
    ).sort((a, b) => a.jersey - b.jersey)

    saveRoster(updatedPlayers)
    setIsEditing(null)
  }

  const cancelEdit = () => {
    setIsEditing(null)
  }

  const exportRoster = () => {
    const dataStr = JSON.stringify(players, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'saints-roster.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importRoster = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedPlayers = JSON.parse(e.target.result)
        if (Array.isArray(importedPlayers)) {
          saveRoster(importedPlayers)
          alert('Roster imported successfully!')
        } else {
          alert('Invalid roster file format')
        }
      } catch (error) {
        alert('Error importing roster file')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  return (
    <div className="roster-management">
      <div className="roster-header">
        <h2>Season Roster</h2>
        <p>{players.length} players</p>
      </div>

      <div className="add-player-form">
        <input
          type="text"
          placeholder="Player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
        />
        <input
          type="number"
          placeholder="Jersey #"
          min="1"
          max="99"
          value={newPlayerJersey}
          onChange={(e) => setNewPlayerJersey(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
        />
        <button onClick={addPlayer}>Add Player</button>
      </div>

      <div className="roster-actions">
        <button onClick={exportRoster} disabled={players.length === 0}>
          Export Roster
        </button>
        <label className="import-button">
          Import Roster
          <input
            type="file"
            accept=".json"
            onChange={importRoster}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div className="players-list">
        {players.length === 0 ? (
          <p className="empty-state">No players added yet. Add your first player above!</p>
        ) : (
          players.map(player => (
            <div key={player.id} className="player-card">
              {isEditing && isEditing.id === player.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={isEditing.name}
                    onChange={(e) => setIsEditing({ ...isEditing, name: e.target.value })}
                  />
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={isEditing.jersey}
                    onChange={(e) => setIsEditing({ ...isEditing, jersey: e.target.value })}
                  />
                  <div className="edit-actions">
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="player-info">
                  <div className="player-details">
                    <span className="jersey-number">#{player.jersey}</span>
                    <span className="player-name">{player.name}</span>
                  </div>
                  <div className="player-actions">
                    <button onClick={() => startEdit(player)}>Edit</button>
                    <button onClick={() => removePlayer(player.id)}>Remove</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RosterManagement