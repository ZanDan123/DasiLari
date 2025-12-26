import { useState, useEffect } from 'react'

export const useTour = (pageName) => {
  const [run, setRun] = useState(false)
  const storageKey = `tour_completed_${pageName}`

  useEffect(() => {
    // Kiểm tra xem đã xem tour chưa
    const hasSeenTour = localStorage.getItem(storageKey)
    if (!hasSeenTour) {
      // Delay 500ms để đảm bảo page đã render
      const timer = setTimeout(() => {
        setRun(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [storageKey])

  const startTour = () => {
    setRun(true)
  }

  const handleJoyrideCallback = (data) => {
    const { status } = data
    const finishedStatuses = ['finished', 'skipped']

    if (finishedStatuses.includes(status)) {
      setRun(false)
      localStorage.setItem(storageKey, 'true')
    }
  }

  const resetTour = () => {
    localStorage.removeItem(storageKey)
    setRun(true)
  }

  return {
    run,
    startTour,
    handleJoyrideCallback,
    resetTour,
  }
}
