export async function getDeviceInfo () {
  const devices = await navigator.mediaDevices.enumerateDevices()

  return {
    audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
    videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
    audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
    hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
    hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
  }
}

export async function isPermissionDenied (permissionName: 'camera' | 'microphone') {
  if (navigator.permissions) {
    try {
      const permissionStatus = await navigator.permissions.query({ name: permissionName })
      return permissionStatus.state === 'denied'
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}
