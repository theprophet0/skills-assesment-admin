import React from 'react'
import { Button } from 'react-bootstrap'
import Moment from 'moment'
const ViewHistoricalComponent = props => {
  return (
    <>
      <p>
        {props.record.firstName} {props.record.lastName}
      </p>
      <p>{props.record.nurseEmail}</p>
      <p>{props.record.recruiterEmail}</p>
      <p>{props.record.skillsTestName}</p>
      <p>{Moment(props.record.timeSubmitted).format('MMMM Do, YYYY')}</p>

      <Button download="test" href={props.record.testDataPdf} variant="primary">
        Get PDF
      </Button>
    </>
  )
}

export default ViewHistoricalComponent
