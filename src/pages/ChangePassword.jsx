import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
import { jwtDecode, jwtVerify, resignJwt } from 'jwt-js-decode'

const ChangePassword = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [token, setToken] = useState('')
  const [email, setEmail] = useState()
  useEffect(() => {
    const successfulToken = localStorage.getItem('token')
    if (!successfulToken) {
      setIsAuthenticated(false)
    }
    setToken(successfulToken)
    setEmail(jwtDecode(successfulToken).payload.email)
    console.log(jwtDecode(successfulToken).payload.email)
  }, [])
  const [password, setPassword] = useState('')
  const [secretHash, setSecretHash] = useState('')
  const [success, setSuccess] = useState(false)
  const updatePassword = async e => {
    e.preventDefault()
    const response = await axios.put(
      `https://new-nurse-2-nurse-api.herokuapp.com/auth/update/password`,
      {
        email: email,
        password: password,
        secretHash: secretHash,
      },
      { headers: { Authorization: 'Bearer ' + token } }
    )
    window.location.href = 'https://admin.nurse2nursestaffing.online/home'
  }

  return (
    <>
      {success && <Redirect to="/home" />}
      {isAuthenticated ? (
        <div className="flexThis">
          <h1>Update Password</h1>
          <Form onSubmit={updatePassword}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                name="password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Secret Hash</Form.Label>
              <Form.Control
                type="password"
                placeholder="Secret Hash"
                onChange={e => setSecretHash(e.target.value)}
                name="secretHash"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}

export default ChangePassword
