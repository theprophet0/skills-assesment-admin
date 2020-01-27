import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import ViewHistoricalComponent from '../components/ViewHistoricalComponent'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
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

  function download_file(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        var filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
        save.download = fileName || filename;
	       if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
				document.location = save.href; 
// window event not working here
			}else{
		        var evt = new MouseEvent('click', {
		            'view': window,
		            'bubbles': true,
		            'cancelable': false
		        });
		        save.dispatchEvent(evt);
		        (window.URL || window.webkitURL).revokeObjectURL(save.href);
			}	
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}
  const getHistoricalRecordsWithPdf = async id => {
    const response = await axios.get(
      `https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation/${id}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    
   if (response.status === 200)
   {
     download_file(response.data[0], 'test')
   }
  }
  const DeleteNurseRecord = async id => {
    const response = await axios.delete(
      `https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation/${id}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    if (response.status === 200) {
      alert(`Success!`)
      window.location.href = 'https://admin.nurse2nursestaffing.online/home'
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
          {logoutRedirect ? (
            <Redirect to="/" />
          ) : (
            <Button variant="danger" type="button" onClick={() => Logout()}>
              Logout
            </Button>
          )}
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
                    <div>
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
