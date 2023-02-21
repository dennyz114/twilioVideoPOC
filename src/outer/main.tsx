import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import TwilioVideo from '../commons/components/TwilioVideo'


const getUrlParameters = (queryString) => {
  let paramMap = {}

  let paramKeyValueStrings = queryString.substring(queryString.indexOf('?') + 1).split('&')
  for (let i = 0; i < paramKeyValueStrings.length; i++) {
    let paramKeyValues = paramKeyValueStrings[i].split('=')
    let paramName = paramKeyValues[0]
    paramMap[paramName] = paramKeyValues[1]
  }

  return paramMap
};

const fetchTokenApi = () => {
  const params = getUrlParameters(window.location.search)
  const body = {
    sessionTimeId: params.sessionTimeId,
    attendeeId: params.attendeeId,
    orgId: params.orgId
  }

  return fetch('/getVideoToken.do', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(body),
  }).then( response => {
    return response.json()
  })
}

const App = () => {
  const [attendeeId, setAttendeeId] = useState()

  useEffect(() => {
    const params = getUrlParameters(window.location.search)
    setAttendeeId(params.attendeeId)
  }, [])

  return (
    <div>
      <h1>{'Twilio video from Events App'}</h1>
    <TwilioVideo getToken={fetchTokenApi} identity={attendeeId}/>
  </div>
)
}

render((
  <App/>
), document.getElementById('twilio-video'));
