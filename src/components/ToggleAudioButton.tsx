import React, { useContext } from 'react'
import useToggleLocalTracks from '../hooks/useToggleLocalTracks'
// @ts-ignore
import RFButton from '../../forms/RFButton'
import { VideoContext } from '../VideoProvider'

const ToggleAudioButton = () => {
  const { localTracks } = useContext(VideoContext)
  const { isAudioEnabled, toggleLocalAudio } = useToggleLocalTracks()
  const hasAudioTrack = localTracks.some(track => track.kind === 'audio')

  return (
    hasAudioTrack ? (
      <RFButton
        buttonText={(isAudioEnabled ? 'Disable' : 'Enable') + ' microphone'}
        onClick={toggleLocalAudio}
      />
    ) : (
      <div>No Audio</div>
    )
  )
}

export default ToggleAudioButton
