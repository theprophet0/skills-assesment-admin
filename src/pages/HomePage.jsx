import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
const HomePage = () => {
  const [newRecruiter, setNewRecruiter] = useState({
    recruiterName: '',
    recruiterEmail: '',
  })
  const postNewRecruiter = async e => {
    e.preventDefault()
    const response = await axios.post(
      'https://nurse-2-nurse-api.herokuapp.com/api/NurseInformation/NewRecruiter',
      newRecruiter
    )
    console.log(response.data)
  }
  const deleteRecruiter = async email => {
    email = newRecruiter.recruiterEmail
    const response = await axios.delete(
      `https://nurse-2-nurse-api.herokuapp.com/api/NurseInformation/delete/Recruiter/${email}`
    )
    console.log(response.data)
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
  return (
    <div className="flex">
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
  )
}

export default HomePage
