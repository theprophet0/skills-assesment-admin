import React from 'react'
import { Button } from 'react-bootstrap'
const ViewHistoricalComponent = props => {
  return (
    <>
      <p>
        {props.record.firstName} {props.record.lastName}
      </p>
      <p>{props.record.nurseEmail}</p>
      <p>{props.record.recruiterEmail}</p>
      <Button download="test" href={props.record.testDataPdf} variant="primary">
        Get PDF
      </Button>
    </>
  )
}

export default ViewHistoricalComponent
