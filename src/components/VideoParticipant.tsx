import React from 'react'
import {
  LocalTrackPublication,
  LocalVideoTrack,
  Participant,
  RemoteTrackPublication,
  RemoteVideoTrack
} from 'twilio-video'
import VideoTrack from './VideoTrack'
import useParticipantPublications from '../hooks/useParticipantPublications'
import usePublicationTrack from '../hooks/usePublicationTrack'

type TrackPublication = LocalTrackPublication | RemoteTrackPublication

interface VideoParticipantProps {
  participant: Participant
  isLocalParticipant: boolean
}

interface VideoPublicationTrackProps { publication: TrackPublication, isLocalParticipant: boolean }

const VideoPublicationTrack = ({ publication, isLocalParticipant }: VideoPublicationTrackProps) => {
  const videoTrack = usePublicationTrack(publication) as LocalVideoTrack | RemoteVideoTrack

  return (
    videoTrack ? <VideoTrack track={videoTrack} isLocal={isLocalParticipant}/> : null
  )
}

const VideoParticipant = ({ participant, isLocalParticipant }: VideoParticipantProps) => {
  const publications = useParticipantPublications(participant)
  const videoPublication = publications.find(p => p.kind === 'video') as TrackPublication

  return (
    <div>
      <span>{participant.identity}{isLocalParticipant ? ' (you)' : ''}</span>
      {videoPublication ? (
        <VideoPublicationTrack publication={videoPublication} isLocalParticipant={isLocalParticipant}/>
      ) : (
        <div>avatar placeholder</div>
      )}
    </div>
  )
}

export default VideoParticipant
