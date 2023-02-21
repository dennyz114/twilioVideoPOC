import React, { useContext, useEffect } from 'react'
import { VideoContext } from '../VideoProvider'
import VideoTrack from './VideoTrack'
// @ts-ignore
import RFButton from '../../forms/RFButton'
import { LocalVideoTrack } from 'twilio-video'
import ToggleVideoButton from './ToggleVideoButton'
import ToggleAudioButton from './ToggleAudioButton'

const LocalVideoPreview = ({ identity }: { identity: string }) => {
  const { localTracks, getAudioAndVideoTracks, connect: videoConnect, getToken, isConnecting, isFetchingToken } = useContext(VideoContext)
  const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video') as LocalVideoTrack

  useEffect(() => {
    void getAudioAndVideoTracks()
  }, [])

  const handleJoin = () => {
    getToken().then(({ token, responseCode }) => {
      if (responseCode === '0') void videoConnect(token)
      else console.log('error connecting')
    })
  }

  return (
    <div>
      {videoTrack ? (
        <VideoTrack track={videoTrack} isLocal={true}/>
      ) : (
        <div>avatar placeholder</div>
      )}
      <div>Person: {identity}</div>

      <ToggleAudioButton/>
      <ToggleVideoButton/>

      <RFButton
        buttonText={'Join meeting'}
        onClick={handleJoin}
        isLoading={isConnecting || isFetchingToken}
        disabled={isConnecting || isFetchingToken}
      />

    </div>
  )
}

export default LocalVideoPreview
