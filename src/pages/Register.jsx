import React, { useState } from 'react'
import styled from "styled-components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"


const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
`
const Form = styled.form`
    border: 1px solid lightgray;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 30px;

    @media (max-width:510px) {
        width: 100%;
        height: 100%;
        border: none;
    }
`
const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;
`
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 100%;
`
const Label = styled.label`
    font-size: 15px;
    font-weight: 500;
`
const Input = styled.input`
    border: 1px solid lightgray;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    padding-left: 10px;
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0,0,0,0);
    outline: 1px solid transparent;
    

    &:hover , &:focus{
        border: 1px solid #321fdb;
        outline: 1px solid #321fdb;
    }
`
const Button = styled.button`
    height: 40px;
    width: 100%;
    border-radius: 10px;
    color: white;
    font-weight: 500;
    background: #321fdb;
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
`
const P = styled.p`
    font-weight: 500;
    font-size: 15px;
`







const Register = () => {
  const navigate = useNavigate();

  // Inputs 
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  // Handling changes
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }


  // Handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://192.168.43.43:8080/user/register"

    try {
      const res = await axios.post(url, inputs);
      toast.success(res.data.message)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      toast.error(error.response.data.error)
    }

  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor='eduEmail'>Email</Label>
          <Input
            autoComplete='off'
            onChange={handleChange}
            id='eduEmail'
            name='email'
            type="email"
            placeholder='RegNo@poornima.edu.in'
            pattern='[A-Za-z0-9]+@poornima\.edu\.in'
            title='Please use poornima email address'
            required />
        </InputDiv>
        <InputDiv>
          <Label htmlFor='password'>Password</Label>
          <Input
            autoComplete='off'
            onChange={handleChange}
            id='password'
            name="password"
            type="password"
            placeholder='Must be atleast 8 characters'
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            title='Minimum eight characters, at least one letter, one number and one special character'
          />
        </InputDiv>
        <FlexDiv>
          <InputDiv>
            <Label htmlFor='firstName'>First Name</Label>
            <Input
              autoComplete='off'
              onChange={handleChange}
              id='firstName'
              name="firstName"
              type="text"
              placeholder='John'
              required
              pattern='[a-zA-z]{3,}'
              title="Includes only alphabets"
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor='lastName'>Last Name</Label>
            <Input
              autoComplete='off'
              onChange={handleChange}
              id='lastName'
              name="lastName"
              type="text"
              placeholder='Doe'
              required
              pattern='[a-zA-z]{3,}'
              title="Includes only alphabets"
            />
          </InputDiv>
        </FlexDiv>
        <InputDiv>
          <Button type='submit'>Sign up</Button>
        </InputDiv>
        <P>Already registerd? <Link to="/login">Login</Link></P>
      </Form>
      <Toaster />
    </Container>
  )
}
export default Register