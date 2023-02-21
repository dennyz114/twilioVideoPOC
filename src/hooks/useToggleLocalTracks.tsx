import { useCallback, useContext, useEffect, useState } from 'react'
import { VideoContext } from '../VideoProvider'

export default function useToggleLocalTracks () {
  const { removeVideoTrack, getVideoTrack, localTracks, room } = useContext(VideoContext)
  const [isCreatingVideoTrack, setIsCreatingVideoTrack] = useState(false)
  const videoTrack = localTracks.find(track => track.kind === 'video')
  const audioTrack = localTracks.find(track => track.kind === 'audio')
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const localParticipant = room?.localParticipant

  useEffect(() => {
    setIsAudioEnabled(audioTrack?.isEnabled ?? false)
    if (audioTrack) {
      const setEnabled = () => setIsAudioEnabled(true)
      const setDisabled = () => setIsAudioEnabled(false)

      audioTrack.on('enabled', setEnabled)
      audioTrack.on('disabled', setDisabled)

      return () => {
        audioTrack.off('enabled', setEnabled)
        audioTrack.off('disabled', setDisabled)
      }
    }
  }, [audioTrack])

  const toggleLocalAudio = useCallback(() => {
    if (audioTrack) {
      isAudioEnabled ? audioTrack.disable() : audioTrack.enable()
    }
  }, [audioTrack, isAudioEnabled])

  const toggleLocalVideo = useCallback(async () => {
    if (!isCreatingVideoTrack) {
      if (!videoTrack) {
        setIsCreatingVideoTrack(true)
        const videoTrack = await getVideoTrack()
        localParticipant && await localParticipant.publishTrack(videoTrack)
        setIsCreatingVideoTrack(false)
      } else {
        if (localParticipant) {
          const localTrackPublication = await localParticipant.unpublishTrack(videoTrack)
          localParticipant.emit('trackUnpublished', localTrackPublication)
        }
        removeVideoTrack()
      }
    }
  }, [removeVideoTrack, getVideoTrack, videoTrack, isCreatingVideoTrack])

  return { isVideoEnabled: !!videoTrack, toggleLocalVideo, isAudioEnabled, toggleLocalAudio }
}
