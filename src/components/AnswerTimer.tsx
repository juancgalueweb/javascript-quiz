import { useEffect, useRef, useState, type FC } from 'react'

interface Props {
  duration: number
  onTimeUp: () => void
}

const AnswerTimer: FC<Props> = ({ duration, onTimeUp }) => {
  const [counter, setCounter] = useState(0)
  const [progressLoaded, setProgressLoaded] = useState(0)
  const intervalRef = useRef<number | undefined>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter(prev => prev + 0.1)
    }, 100)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    setProgressLoaded(100 * (counter / duration))
    if (counter >= duration) {
      clearInterval(intervalRef.current)
      setTimeout(() => {
        onTimeUp()
      }, 50)
    }
  }, [counter])

  return (
    <div className='answer-timer-container'>
      <div
        className='progress'
        style={{
          width: `${progressLoaded}%`,
          backgroundColor: `${
            progressLoaded < 40
              ? 'lightgreen'
              : progressLoaded < 70
              ? 'orange'
              : 'red'
          }`
        }}
      ></div>
    </div>
  )
}

export default AnswerTimer
