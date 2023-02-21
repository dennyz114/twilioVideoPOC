import { useCallback, useState } from 'react'
import Video, { LocalVideoTrack, LocalAudioTrack } from 'twilio-video'
import { isPermissionDenied, getDeviceInfo } from '../utils'

export default function useLocalTracks () {
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>()
  const [audioTrack, setAudioTrack] = useState<LocalAudioTrack>()
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false)

  const getAudioAndVideoTracks = useCallback(async () => {
    const { hasAudioInputDevices, hasVideoInputDevices } = await getDeviceInfo()

    const isCameraPermissionDenied = await isPermissionDenied('camera')
    const isMicrophonePermissionDenied = await isPermissionDenied('microphone')

    setIsAcquiringLocalTracks(true)

    const shouldAcquireVideo = hasVideoInputDevices && !isCameraPermissionDenied
    const shouldAcquireAudio = hasAudioInputDevices && !isMicrophonePermissionDenied

    const createLocalTrackOptions = {
      video: shouldAcquireVideo,
      audio: shouldAcquireAudio
    }

    return Video.createLocalTracks(createLocalTrackOptions).then(
      tracks => {
        const newVideoTrack = tracks.find(track => track.kind === 'video') as LocalVideoTrack
        const newAudioTrack = tracks.find(track => track.kind === 'audio') as LocalAudioTrack
        if (newVideoTrack) setVideoTrack(newVideoTrack)
        if (newAudioTrack) setAudioTrack(newAudioTrack)

        if (isCameraPermissionDenied && isMicrophonePermissionDenied) console.log('error: no permissions audio or video')
        if (isCameraPermissionDenied) console.log('error: no video permission')
        if (isMicrophonePermissionDenied) console.log('error: no audio permission')
      }
    ).finally(() => setIsAcquiringLocalTracks(false))

  }, [videoTrack, audioTrack, isAcquiringLocalTracks])

  const getVideoTrack = useCallback(async () => {
    return Video.createLocalVideoTrack().then(videoTrack => {
      setVideoTrack(videoTrack)
      return videoTrack
    })
  }, [videoTrack])

  const removeVideoTrack = useCallback(() => {
    if (videoTrack) {
      videoTrack.stop()
      setVideoTrack(undefined)
    }
  }, [videoTrack])

  const localTracks = [videoTrack, audioTrack].filter(track => track !== undefined) as (LocalAudioTrack | LocalVideoTrack) []

  return {
    localTracks,
    isAcquiringLocalTracks,
    getAudioAndVideoTracks,
    removeVideoTrack,
    getVideoTrack
  }
}
