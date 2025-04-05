import { useEffect, useRef, useState } from 'react'
import './App.css'

type Mode = 'work' | 'other' | 'none'
type NotificationInterval = '5mins' | '10mins' | '20mins'

function App() {
  const [millis, setMillis] = useState(0)
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [hour, setHour] = useState(0)

  const [millis1, setMillis1] = useState(0)
  const [second1, setSecond1] = useState(0)
  const [minute1, setMinute1] = useState(0)
  const [hour1, setHour1] = useState(0)

  const [mode, setMode] = useState<Mode>('none')
  const [notificationInterval, setNotificationInterval] = useState<NotificationInterval>('10mins')

  const audio1Ref = useRef<HTMLAudioElement>(null)
  const audio2Ref = useRef<HTMLAudioElement>(null)
  const audio3Ref = useRef<HTMLAudioElement>(null)
  const audio4Ref = useRef<HTMLAudioElement>(null)
  const audio5Ref = useRef<HTMLAudioElement>(null)

  function updateTimerWork() {
    setMillis(millis + 1000)

    setSecond((second + 1) % 60)

    const MILLIS_IN_ONE_MIN = 60 * 1000
    const MILLIS_IN_ONE_HOUR = 60 * 60 * 1000

    if (millis != 0 && millis % MILLIS_IN_ONE_MIN == 0) {
      setMinute((minute + 1) % 60)

      if (notificationInterval == '5mins' && millis % (MILLIS_IN_ONE_MIN*5) == 0) {
        executeSound1()
      }

      if (notificationInterval == '10mins' && millis % (MILLIS_IN_ONE_MIN*10) == 0) {
        executeSound1()
      }

      if (notificationInterval == '20mins' && millis % (MILLIS_IN_ONE_MIN*20) == 0) {
        executeSound1()
      }
    }

    if (millis != 0 && millis % MILLIS_IN_ONE_HOUR == 0) {
      setHour(hour + 1)
    }
  }

  function updateTimerOther() {
    setMillis1(millis1 + 1000)

    setSecond1((second1 + 1) % 60)

    const MILLIS_IN_ONE_MIN = 60 * 1000
    const MILLIS_IN_ONE_HOUR = 60 * 60 * 1000

    if (millis1 != 0 && millis1 % MILLIS_IN_ONE_MIN == 0) {
      setMinute1((minute1 + 1) % 60)

      if (notificationInterval == '5mins' && millis1 % (MILLIS_IN_ONE_MIN*5) == 0) {
        executeSound3()
      }

      if (notificationInterval == '10mins' && millis1 % (MILLIS_IN_ONE_MIN*10) == 0) {
        executeSound3()
      }

      if (notificationInterval == '20mins' && millis1 % (MILLIS_IN_ONE_MIN*20) == 0) {
        executeSound3()
      }
    }

    if (millis1 != 0 && millis1 % MILLIS_IN_ONE_HOUR == 0) {
      setHour1(hour1 + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (mode == 'work') {
        updateTimerWork()
      }

      if (mode == 'other') {
        updateTimerOther()
      }
    }, 1000);

    return () => clearInterval(interval)
  }, [mode, updateTimerWork, updateTimerOther])

  function format(value: number) {
    return String(value).padStart(2, '0')
  }

  function executeSound1() {
    if (audio1Ref.current) {
      audio1Ref.current.play()
    }
  }

  function executeSound3() {
    if (audio3Ref.current) {
      audio3Ref.current.play()
    }
  }

  function executeSound4() {
    if (audio4Ref.current) {
      audio4Ref.current.play()
    }
  }

  function executeSound5() {
    if (audio5Ref.current) {
      audio5Ref.current.play()
    }
  }

  function setModeWork() {
    executeSound4()
    setMode('work')
  }

  function setModeOther() {
    executeSound4()
    setMode('other')
  }

  function setModeNone() {
    setMode('none')
  }

  function setNotificationInterval5mins() {
    executeSound5()
    setNotificationInterval('5mins')
  }

  function setNotificationInterval10mins() {
    executeSound5()
    setNotificationInterval('10mins')
  }

  function setNotificationInterval20mins() {
    executeSound5()
    setNotificationInterval('20mins')
  }

  return (
    <>
      <div>
        <audio ref={audio1Ref} src='level-up-3-199576.mp3'></audio>
        <audio ref={audio2Ref} src='message-incoming-2-199577.mp3'></audio>
        <audio ref={audio3Ref} src='notification-1-269296.mp3'></audio>
        <audio ref={audio4Ref} src='ui-click-97915.mp3'></audio>
        <audio ref={audio5Ref} src='click-21156.mp3'></audio>

        <div style={mode == 'work'
          ? styles.activeLabel
          : styles.inactiveLabel}>
          <span>Work</span>
        </div>
        <h1 style={mode == 'work'
          ? styles.activeTimer
          : styles.inactiveTimer
        }>{format(hour)}:{format(minute)}:{format(second)}</h1>

        <div style={mode == 'other'
          ? styles.activeLabel
          : styles.inactiveLabel}>
          <span>Other</span>
        </div>
        <h1 style={mode == 'other'
          ? styles.activeTimer
          : styles.inactiveTimer
        }>{format(hour1)}:{format(minute1)}:{format(second1)}</h1>

        <div style={styles.buttonsContainer}>
          <button onClick={() => setModeNone()}>Stop</button>
          <button style={mode == 'work'
            ? styles.activeButton
            : styles.inactiveButton
          } onClick={() => mode == 'work'
            ? setModeNone()
            : setModeWork()}>Work</button>
          <button style={mode == 'other'
            ? styles.activeButton
            : styles.inactiveButton} onClick={() => mode == 'other'
              ? setModeNone()
              : setModeOther()}>Other</button>
        </div>

        <div style={{
          paddingTop: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
          color: 'gray'
        }}>
          <span>Notify every</span>
          <div style={styles.buttonsContainer}>
            <button
              style={notificationInterval == '5mins'
                ? styles.activeButton
                : styles.inactiveButton
              }
              onClick={() => setNotificationInterval5mins()}>5 mins</button>
            <button
              style={notificationInterval == '10mins'
                ? styles.activeButton
                : styles.inactiveButton
              }
              onClick={() => setNotificationInterval10mins()}>10 mins</button>
            <button
              style={notificationInterval == '20mins'
                ? styles.activeButton
                : styles.inactiveButton
              }
              onClick={() => setNotificationInterval20mins()}>20 mins</button>
          </div>
        </div>
      </div>
    </>
  )
}

const styles = {
  notificationSettingsContainer: {

  },
  buttonsContainer: {
    display: 'flex',
    gap: 12,
    justifyContent: 'center'
  },
  activeButton: {
    backgroundColor: '#9FB3DF',
    color: 'black'
  },
  inactiveButton: {
    backgroundColor: 'gray',
    color: 'black'
  },
  activeTimer: {
    color: '#9FB3DF'
  },
  inactiveTimer: {
    color: 'gray'
  },
  activeLabel: {
    fontWeight: 'bold',
    color: '#9FB3DF'
  },
  inactiveLabel: {
    fontWeight: 'normal',
    color: 'gray'
  }
}

export default App
