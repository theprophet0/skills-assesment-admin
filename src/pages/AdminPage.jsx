import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { Redirect, Link } from 'react-router-dom'
const AdminPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const loginUser = async e => {
    e.preventDefault()
    const response = await axios.post(
      'https://new-nurse-2-nurse-api.herokuapp.com/auth/login',
      {
        email: email,
        password: password,
      }
    )
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
      setSuccess(true)
    } else if (response.status === 400) {
      console.log(response.data)
      alert(response.data)
      window.location.href = 'https://admin.nurse2nursestaffing.online/'
    }
  }
  return (
    <>
      {success && <Redirect to="/home" />}
      <div className="flexThis">
        <h1>LOGIN</h1>
        <Form onSubmit={loginUser}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
              name="password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Link to="/Register">
            <div>No account? Click here to register.</div>
          </Link>
        </Form>
      </div>
    </>
  )
}

export default AdminPage
