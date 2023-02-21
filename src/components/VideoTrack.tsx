import React, { useEffect, useRef } from 'react'
import { LocalVideoTrack, RemoteVideoTrack } from 'twilio-video'

const VideoTrack = ({ track, isLocal }: { track: LocalVideoTrack | RemoteVideoTrack, isLocal: boolean }) => {
  const ref = useRef<HTMLVideoElement>(null!)

  useEffect(() => {
    const el = ref.current
    el.muted = true
    track.attach(el)
    return () => {
      track.detach(el)
      // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
      // See: https://github.com/twilio/twilio-video.js/issues/1528
      el.srcObject = null
    }
  }, [track])

  const videoStyle = {
    transform: isLocal ? 'scaleX(-1)' : '',
  }
  return (
    <video style={videoStyle} ref={ref}><track kind="captions"/></video>
  )
}

export default VideoTrack
