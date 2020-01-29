import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const RegisterPage = () => {
  const [newUserCredentials, setNewUserCredentials] = useState({
    email: '',
    password: '',
    secretHash: '',
  })
  const [success, setSuccess] = useState(false)
  const registerUser = async e => {
    e.preventDefault()
    try {
      const resp = await axios.post(
        'https://new-nurse-2-nurse-api.herokuapp.com/auth/signup',
        newUserCredentials
      )
      console.log(resp.data)
      if (resp.status === 200) {
        localStorage.setItem('token', resp.data.token)
        setSuccess(true)
      }
    } catch (error) {
      alert('Invalid credentials, try again.')
    }
  }
  const onChange = e => {
    e.persist()
    setNewUserCredentials(previous => {
      return {
        ...previous,
        [e.target.name]: e.target.value,
      }
    })
  }
  return (
    <>
      {success ? (
        <Redirect to="/home" />
      ) : (
        <>
          <div className="flexThis">
            <h1>REGISTER</h1>
            <Form onSubmit={registerUser}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  onChange={onChange}
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={onChange}
                  name="password"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Secret Hash</Form.Label>
                <Form.Control
                  name="secretHash"
                  onChange={onChange}
                  type="password"
                  placeholder="Enter Secret Hash"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Link to="/">
                <div>Have an account? Click here to login.</div>
              </Link>
            </Form>
          </div>
        </>
      )}
    </>
  )
}

export default RegisterPage
