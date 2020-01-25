import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import ViewHistoricalComponent from '../components/ViewHistoricalComponent'
import { Redirect } from 'react-router-dom'
const ViewHistorical = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [token, setToken] = useState('')
  const getHistoricalRecords = async () => {
    const response = await axios.get(
      `https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation/All`,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    console.log(response)
    setHistoricalRecords(response.data)
  }
  const DeleteNurseRecord = async id => {
    const response = await axios.delete(
      `https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation/${id}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    if (response.status === 200) {
      alert(`Success!`)
      window.location.href = 'https://admin-page-nurse-2-nurse.netlify.com/home'
    }
  }
  useEffect(() => {
    const successfulToken = localStorage.getItem('token')
    if (!successfulToken) {
      setIsAuthenticated(false)
    }
    setToken(successfulToken)
  }, [])
  useEffect(() => {
    if (token !== '') {
      getHistoricalRecords()
    }
  }, [token])
  const [historicalRecords, setHistoricalRecords] = useState([])
  const [redirect, setRedirect] = useState(false)

  return (
    <>
      {redirect && <Redirect to="/home" />}
      {isAuthenticated ? (
        <>
          <Button
            variant="danger"
            type="button"
            onClick={() => localStorage.removeItem('token')}
          >
            Logout
          </Button>
          <div className="centerButton">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setRedirect(true)}
            >
              Add Recruiter
            </Button>
          </div>
          <div className="reFlex">
            {historicalRecords
              .sort((a, b) =>
                b.timeSubmitted < a.timeSubmitted
                  ? -1
                  : b.timeSubmitted > a.timeSubmitted
                  ? 1
                  : 0
              )
              .map(record => {
                return (
                  <div>
                    <ViewHistoricalComponent
                      record={record}
                      DeleteNurseRecord={DeleteNurseRecord}
                    />
                  </div>
                )
              })}
          </div>
        </>
      ) : (
        <>
          <Redirect to="/" />
        </>
      )}
    </>
  )
}

export default ViewHistorical
