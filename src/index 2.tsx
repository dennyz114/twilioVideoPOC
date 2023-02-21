import { VideoProvider } from './VideoProvider'
import React from 'react'
import VideoApp from './components/VideoApp'
import { GetTokenFunction } from './utils/types'

interface TwilioVideoProps {
  getToken: GetTokenFunction,
  identity: string
}

const TwilioVideo = ({ getToken, identity }: TwilioVideoProps) => {

  return (
    <VideoProvider getToken={getToken} >
      <VideoApp identity={identity}/>
    </VideoProvider>
  )
}

export default TwilioVideo
