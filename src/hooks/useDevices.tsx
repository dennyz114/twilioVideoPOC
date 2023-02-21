import { useEffect, useState } from 'react'
import { getDeviceInfo } from '../utils'

export default function useDevices () {
  const [devices, setDevices] = useState({
    hasVideoInputDevices: false
  })

  useEffect(() => {
    getDeviceInfo().then(devices => setDevices(devices))
  }, [])

  return devices
}
