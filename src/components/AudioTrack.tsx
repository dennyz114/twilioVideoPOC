import { useEffect, useRef } from 'react'
import { AudioTrack as AudioTrackType } from 'twilio-video'

const AudioTrack = ({ track }: { track: AudioTrackType }) => {
  const audioEl = useRef<HTMLAudioElement>()

  useEffect(() => {
    audioEl.current = track.attach()
    document.body.appendChild(audioEl.current)
    return () => {
      track.detach().forEach(audioEl => audioEl.remove())
    }
  }, [track])

  return null
}

export default AudioTrack
