import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [token, setToken] = useState('')
  useEffect(() => {
    const successfulToken = localStorage.getItem('token')
    if (!successfulToken) {
      setIsAuthenticated(false)
    }
    setToken(successfulToken)
  }, [])
  const [newRecruiter, setNewRecruiter] = useState({
    recruiterName: '',
    recruiterEmail: '',
  })
  const [success, setSuccess] = useState(false)
  const [recruiters, setRecruiters] = useState([])

  const viewRecruiters = async () => {
    const response = await axios.get(
      `https://nurse-2-nurse-api.herokuapp.com/AllRecruiters`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setRecruiters(response.data)
  }
  useEffect(() => {
    if (handleShow) {
      viewRecruiters()
    }
  }, [handleShow])
  const postNewRecruiter = async e => {
    e.preventDefault()
    const response = await axios.post(
      'https://nurse-2-nurse-api.herokuapp.com/NewRecruiter',
      newRecruiter,
      { headers: { Authorization: 'Bearer ' + token } }
    )
    if (response.status === 200) {
      alert(
        `Success: ${newRecruiter.recruiterEmail} has been added to the options.`
      )
      window.location.href = 'https://admin-page-nurse-2-nurse.netlify.com/'
    }
  }
  const deleteRecruiter = async () => {
    const response = await axios.delete(
      `https://nurse-2-nurse-api.herokuapp.com/api/RecruiterInformation/delete/${newRecruiter.recruiterEmail}`,
      { headers: { Authorization: 'Bearer' + token } }
    )
    alert(response.data)
    window.location.href = 'https://admin-page-nurse-2-nurse.netlify.com/'
  }

  const handleChange = e => {
    e.persist()
    setNewRecruiter(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const [show, setShow] = useState(false)
  const [viewHistorical, setViewHistorical] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="flex">
            {viewHistorical && <Redirect to="/historical" />}
            <Button onClick={() => setViewHistorical(true)}>
              View Historical Records
            </Button>
            <Button onClick={handleShow}>View Recruiters</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Current Recruiters</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {recruiters.map(recruiter => {
                  return (
                    <span>
                      <p>
                        {recruiter.recruiterName}: {recruiter.recruiterEmail}
                      </p>
                    </span>
                  )
                })}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Form onSubmit={postNewRecruiter}>
              {' '}
              <h1>New Recruiter</h1>
              <Form.Group controlId="formBasicRecruiterName">
                <Form.Label>Recruiter Name</Form.Label>
                <Form.Control
                  name="recruiterName"
                  type="text"
                  placeholder="Enter Recruiter Name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicRecruiterEmail">
                <Form.Label>Recruiter Email</Form.Label>
                <Form.Control
                  name="recruiterEmail"
                  type="email"
                  placeholder="Enter Recruiter Email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="danger"
                type="button"
                disabled={newRecruiter.recruiterEmail === ''}
                onClick={deleteRecruiter}
              >
                Delete
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <Redirect to="/unauth" />
      )}
    </>
  )
}

export default HomePage
