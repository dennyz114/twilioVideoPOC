import React, { useContext } from 'react'
import ParticipantAudioTracks from './ParticipantAudioTracks'
import useParticipants from '../hooks/useParticipants'
import VideoParticipant from './VideoParticipant'
import { VideoContext } from '../VideoProvider'
// @ts-ignore
import RFButton from '../../forms/RFButton'
import ToggleVideoButton from './ToggleVideoButton'
import ToggleAudioButton from './ToggleAudioButton'

const Room = () => {
  const participants = useParticipants()
  const { room } = useContext(VideoContext)

  return (
    <div>
      <ParticipantAudioTracks/>
      {
        [...participants, room!.localParticipant].map(participant => (
          <VideoParticipant
            key={participant.sid}
            participant={participant}
            isLocalParticipant={participant === room!.localParticipant}/>
        ))
      }
      <ToggleAudioButton/>
      <ToggleVideoButton/>
      <RFButton
        buttonText={'Disconnect'}
        onClick={() => room!.disconnect()}
      />
    </div>
  )
}

export default Room
