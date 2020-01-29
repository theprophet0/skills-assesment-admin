import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import ViewHistoricalComponent from '../components/ViewHistoricalComponent'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import download from 'downloadjs'
const ViewHistorical = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [token, setToken] = useState('')
  const [loaded, setLoaded] = useState(false)
  const getHistoricalRecordsWithoutPdf = async () => {
    const response = await axios.get(
      `https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation/All`,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    if (response.status === 200) {
      setHistoricalRecords(response.data)
      setLoaded(true)
    }
  }

  const getHistoricalRecordsWithPdf = async id => {
    const response = await axios.get(
      `https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation/${id}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.status === 200) {
      download(`data:application/pdf;base64,${response.data[0].substring(51)}`, 'Nurse2Nurse', 'application/pdf')
      // window.open(response.data[0], 'pdf')
      console.log(response.data[0].substring(51))
    }
  }
  const DeleteNurseRecord = async id => {
    const response = await axios.delete(
      `https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation/${id}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    if (response.status === 200) {
      alert(`Success!`)
      window.location.href = 'https://admin.nurse2nursestaffing.online/historical'
    }
  }

  const Logout = () => {
    localStorage.removeItem('token')
    setLogoutRedirect(true)
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
      getHistoricalRecordsWithoutPdf()
    }
  }, [token])
  const [testDataPdf, setTestDataPdf] = useState([])

  const [historicalRecords, setHistoricalRecords] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [logoutRedirect, setLogoutRedirect] = useState(false)
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
            {logoutRedirect ? (
              <Redirect to="/" />
            ) : (
              <Button
                variant="danger"
                size="lg"
                type="button"
                onClick={() => Logout()}
              >
                Logout
              </Button>
            )}
          </div>

          <div className="reFlex">
            {loaded ? (
              historicalRecords
                .sort((a, b) =>
                  b.timeSubmitted < a.timeSubmitted
                    ? -1
                    : b.timeSubmitted > a.timeSubmitted
                    ? 1
                    : 0
                )
                .map(record => {
                  return (
                    <div className="innerFlex">
                      <ViewHistoricalComponent
                        record={record}
                        loaded={loaded}
                        getHistoricalRecordsWithPdf={
                          getHistoricalRecordsWithPdf
                        }
                        DeleteNurseRecord={DeleteNurseRecord}
                      />
                    </div>
                  )
                })
            ) : (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
              />
            )}
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
