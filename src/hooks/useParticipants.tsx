import { useContext, useEffect, useState } from 'react'
import { VideoContext } from '../VideoProvider'
import { RemoteParticipant } from 'twilio-video'

export default function useParticipants () {
  const { room } = useContext(VideoContext)
  const [participants, setParticipants] = useState<RemoteParticipant[]>(Array.from(room?.participants.values() ?? []))

  useEffect(() => {
    if (room) {
      const participantConnect = (participant: RemoteParticipant) => setParticipants(ps => [...ps, participant])

      const participantDisconnect = (participant: RemoteParticipant) => setParticipants(ps => ps.filter(p => p !== participant))

      room.on('participantConnected', participantConnect)
      room.on('participantDisconnected', participantDisconnect)
      return () => {
        room.off('participantConnected', participantConnect)
        room.off('participantDisconnected', participantDisconnect)
      }
    }
  }, [room])

  return participants
}
