import { useContext, useEffect, useState } from 'react'
import { VideoContext } from '../VideoProvider'

export default function useRoomState () {
  const { room } = useContext(VideoContext)
  const [state, setState] = useState('disconnected')

  useEffect(() => {
    const setRoomState = () => setState(room!.state)

    if (room) {
      setRoomState()
      room.on('disconnected', setRoomState)
        .on('reconnected', setRoomState)
        .on('reconnecting', setRoomState)

      return () => {
        room.off('disconnected', setRoomState)
          .off('reconnected', setRoomState)
          .off('reconnecting', setRoomState)
      }
    }
  }, [room])

  return state
}
