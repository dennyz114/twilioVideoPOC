import { useEffect, useState } from 'react'
import { LocalTrackPublication, Participant, RemoteTrackPublication } from 'twilio-video'

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

export default function useParticipantPublications (participant: Participant) {
  const [publications, setPublications] = useState<TrackPublication[]>([])

  useEffect(() => {
    setPublications(Array.from(participant.tracks.values()) as TrackPublication[])

    const publicationAdded = (publication: TrackPublication) => setPublications([...publications, publication])
    const publicationRemoved = (publication: TrackPublication) => setPublications(publications.filter(p => p !== publication))

    participant.on('trackPublished', publicationAdded)
    participant.on('trackUnpublished', publicationRemoved)
    return () => {
      participant.off('trackPublished', publicationAdded)
      participant.off('trackUnpublished', publicationRemoved)
    }
  }, [participant])

  return publications
}
