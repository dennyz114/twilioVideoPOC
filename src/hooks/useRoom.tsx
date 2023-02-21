import Video, { LocalTrack, Room } from 'twilio-video'
import { useState, useCallback } from 'react'

export default function useRoom (localTracks: LocalTrack[]) {
  const [room, setRoom] = useState<Room | null>(null)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)

  const connect = useCallback(token => {
    setIsConnecting(true)
    return Video.connect(token, { tracks: localTracks }).then(
      newRoom => {
        setRoom(newRoom)
        const disconnect = () => newRoom.disconnect()
        newRoom.once('disconnected', () => window.removeEventListener('beforeunload', disconnect))
        setIsConnecting(false)
        window.addEventListener('beforeunload', disconnect)
      },
      error => {
        setIsConnecting(false)
        console.log('error', error)
      }
    )
  }, [localTracks])

  return { room, isConnecting, connect }
}
