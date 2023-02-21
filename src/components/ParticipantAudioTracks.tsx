import React from 'react'
import useParticipants from '../hooks/useParticipants'
import useParticipantPublications from '../hooks/useParticipantPublications'
import AudioTrack from './AudioTrack'
import { AudioTrack as AudioTrackType, RemoteParticipant, RemoteTrackPublication } from 'twilio-video'
import usePublicationTrack from '../hooks/usePublicationTrack'

const ParticipantAudioTrack = ({ participant }: { participant: RemoteParticipant }) => {
  const trackPublications = useParticipantPublications(participant)
  const audioTrackPublication = trackPublications.find(track => track.kind === 'audio') as RemoteTrackPublication
  const audioTrack = usePublicationTrack(audioTrackPublication) as AudioTrackType

  return (
    audioTrack ? <AudioTrack track={audioTrack}/> : null
  )
}

const ParticipantAudioTracks = () => {
  const participants = useParticipants()

  return (
    <div>
      {participants.map(participant => <ParticipantAudioTrack key={participant.sid} participant={participant}/>)}
    </div>
  )
}

export default ParticipantAudioTracks
