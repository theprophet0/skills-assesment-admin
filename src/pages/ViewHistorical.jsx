import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import ViewHistoricalComponent from '../components/ViewHistoricalComponent'
import { Redirect } from 'react-router-dom'
const ViewHistorical = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [token, setToken] = useState('')
  useEffect(() => {
    const successfulToken = localStorage.getItem('token')
    if (!successfulToken) {
      const getHistoricalRecords = async () => {
        const response = await axios.get(
          'https://nurse-2-nurse-api.herokuapp.com/api​/NurseInformation​/All',
          { headers: { Authorization: 'Bearer ' + token } }
        )
        console.log(response)
        setHistoricalRecords(response.data)
      }
      setIsAuthenticated(false)
      getHistoricalRecords()
    }
    setToken(successfulToken)
  }, [])
  const [historicalRecords, setHistoricalRecords] = useState([])
  const [redirect, setRedirect] = useState(false)

  return (
    <>
      {redirect && <Redirect to="/home" />}
      {isAuthenticated ? (
        <>
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
            {historicalRecords.map(record => {
              return (
                <div>
                  <ViewHistoricalComponent record={record} />
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
