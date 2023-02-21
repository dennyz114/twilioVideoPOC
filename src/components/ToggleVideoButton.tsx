import React from 'react'
import useToggleLocalTracks from '../hooks/useToggleLocalTracks'
// @ts-ignore
import RFButton from '../../forms/RFButton'
import useDevices from '../hooks/useDevices'

const ToggleVideoButton = () => {
  const { isVideoEnabled, toggleLocalVideo } = useToggleLocalTracks()
  const devices = useDevices()
  const hasVideoTrack = devices?.hasVideoInputDevices

  return (
    hasVideoTrack ? (
      <RFButton
        buttonText={(isVideoEnabled ? 'Disable' : 'Enable') + ' camera'}
        onClick={toggleLocalVideo}
      />
    ) : (
      <div>No Video</div>
    )
  )
}

export default ToggleVideoButton
