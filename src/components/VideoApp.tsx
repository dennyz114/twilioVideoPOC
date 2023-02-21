import React from 'react'
import LocalVideoPreview from './LocalVideoPreview'
import Room from './Room'
import useRoomState from '../hooks/useRoomState'

const VideoApp = ({ identity }: { identity: string }) => {
  const roomState = useRoomState()

  return (
    <div>
      {roomState === 'disconnected' ? (
        <LocalVideoPreview identity={identity}/>
      ) : (
        <Room/>
      )}
    </div>
  )
}

export default VideoApp
