import { useEffect } from 'react'

function SaintsToast({ message, type, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [onClose, duration])

  if (!message) return null

  return (
    <div className={`saints-toast saints-toast-${type}`}>
      <div className="toast-icon">
        {type === 'celebration' && '⚜'}
        {type === 'achievement' && '🏆'}
        {type === 'warning' && '⚠️'}
        {type === 'success' && '✓'}
      </div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  )
}

export default SaintsToast