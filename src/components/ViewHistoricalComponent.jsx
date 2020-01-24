import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Moment from 'moment'
const ViewHistoricalComponent = props => {
  const [deleteVal, setDeleteVal] = useState(false)
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
  return (
    <>
      <p>{props.record.skillsTestName}</p>
      <p>
        {props.record.firstName} {props.record.lastName}
      </p>
      <p>{props.record.nurseEmail}</p>
      <p>{props.record.recruiterEmail}</p>
      <p>{Moment(props.record.timeSubmitted).format('MMMM Do, YYYY')}</p>
      <Button download="test" href={props.record.testDataPdf} variant="primary">
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
