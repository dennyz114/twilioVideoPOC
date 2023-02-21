import React, { createContext, ReactNode, useState } from 'react'
import { LocalAudioTrack, LocalVideoTrack, Room } from 'twilio-video'
import useLocalTracks from '../hooks/useLocalTracks'
import { GetTokenFunction } from '../utils/types'
import useRoom from '../hooks/useRoom'

interface VideoContextShape {
  localTracks: (LocalVideoTrack | LocalAudioTrack) [],
  isAcquiringLocalTracks: boolean,
  getToken: () => Promise<{ responseCode: string, token: string }>
  getAudioAndVideoTracks: () => Promise<void>,
  isFetchingToken: boolean,
  connect: (token: string) => Promise<void>,
  isConnecting: boolean,
  room: Room | null,
  // isAudioEnabled: boolean,
  getVideoTrack: () => Promise<LocalVideoTrack>,
  // isVideoEnabled: boolean,
  removeVideoTrack: () => void,
}

export const VideoContext = createContext<VideoContextShape>(null!)

interface VideoProviderProps {
  children: ReactNode,
  getToken: GetTokenFunction
}

export function VideoProvider ({ children, getToken: getTokenApi }: VideoProviderProps) {
  const [isFetchingToken, setIsFetchingToken] = useState(false)
  const {
    isAcquiringLocalTracks,
    localTracks,
    getAudioAndVideoTracks,
    getVideoTrack,
    removeVideoTrack
  } = useLocalTracks()
  const { connect, isConnecting, room } = useRoom(localTracks)

  const getToken = () => {
    setIsFetchingToken(true)
    return getTokenApi().then(response => {
      setIsFetchingToken(false)
      return response.data
    }).catch(e => {
      console.log('Error fetching token ', e)
      setIsFetchingToken(false)
      return { responseCode: '-1', token: '' }
    })
  }

  return (
    <VideoContext.Provider
      value={{
        localTracks,
        isAcquiringLocalTracks,
        getAudioAndVideoTracks,
        getToken,
        isFetchingToken,
        connect,
        isConnecting,
        room,
        getVideoTrack,
        removeVideoTrack
      }}
    >
      {children}
    </VideoContext.Provider>
  )
}
