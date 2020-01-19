import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import ViewHistoricalComponent from '../components/ViewHistoricalComponent'
import { Redirect } from 'react-router-dom'
const ViewHistorical = () => {
  const [historicalRecords, setHistoricalRecords] = useState([])
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    const getHistoricalRecords = async () => {
      const response = await axios.get(
        'https://nurse-2-nurse-api.herokuapp.com/AllRecruiters'
      )
      console.log(response)
      setHistoricalRecords(response.data)
    }
    getHistoricalRecords()
  }, [])

  return (
    <>
      {redirect && <Redirect to="/" />}
      <div className="centerButton">
        <Button variant="primary" size="lg" onClick={() => setRedirect(true)}>
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
  )
}

export default ViewHistorical
