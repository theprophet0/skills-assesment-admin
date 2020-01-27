import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Moment from 'moment'
import Loader from 'react-loader-spinner'
const ViewHistoricalComponent = props => {
  const [deleteVal, setDeleteVal] = useState(false)
  const [downloadPdfVal, setDownloadPdfVal] = useState(false)

  const setDeleteFunc = () => {
    if (!deleteVal) {
      setDeleteVal(true)
    } else {
      setDeleteVal(false)
    }
  }
  useEffect(() => {
    if (deleteVal) {
      props.DeleteNurseRecord(props.record.id)
    }
  }, [deleteVal])

  const downloadPdfFunc = () => {
    if (!downloadPdfVal) {
      setDownloadPdfVal(true)
    } else {
      setDownloadPdfVal(false)
    }
  }

  useEffect(() => {
    if (downloadPdfVal) {
      props.getHistoricalRecordsWithPdf(props.record.id)
    }
  }, [downloadPdfVal])
  return (
    <>
      <p>{props.record.skillsTestName}</p>
      <p>
        {props.record.firstName} {props.record.lastName}
      </p>
      <p>{props.record.nurseEmail}</p>
      <p>{props.record.recruiterEmail}</p>
      <p>{Moment(props.record.timeSubmitted).format('MMMM Do, YYYY')}</p>
      <Button download="test" variant="primary" onClick={downloadPdfFunc}>
        Get PDF
      </Button>
      <Button onClick={setDeleteFunc} variant="danger">
        Delete
      </Button>
      <hr></hr>
    </>
  )
}

export default ViewHistoricalComponent
