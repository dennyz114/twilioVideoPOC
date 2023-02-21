import { useEffect, useState } from 'react'
import { LocalTrackPublication, RemoteTrackPublication } from 'twilio-video'

type TrackPublication = LocalTrackPublication | RemoteTrackPublication

export default function usePublicationTrack (publication: TrackPublication) {
  const [track, setTrack] = useState(publication?.track)

  useEffect(() => {
    if (publication) {
      setTrack(publication.track)
      const trackRemoved = () => setTrack(null)
      publication.on('subscribed', setTrack)
      publication.on('unsubscribed', trackRemoved)
      return () => {
        publication.off('subscribed', setTrack)
        publication.off('unsubscribed', trackRemoved)
      }
    }
  }, [publication])

  return track
}
