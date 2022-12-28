import React, { useContext, useState } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';
import { CFormCheck } from '@coreui/react';
import { AuthContext } from '../context/authContext';
import { toast, Toaster } from "react-hot-toast"
import { useCookies } from "react-cookie";


const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: grid;
    place-items: center;
`
const Form = styled.form`
width: 500px;
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





const Login = () => {
  const [cookies, setCookie] = useCookies([]);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value === "on" ? true : e.target.value })
  }


  // Handle Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(inputs)
    if (response[1] === "OK") {
      toast.success(response[0])

      // Setting token to cookies
      const token = response[2];
      setCookie("auth", token, {
        path: "/"
      });

      // Redirecting
      setTimeout(() => {
        navigate("/preference")
      }, 2000)
    }
    else {
      toast.error(response[0])
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label htmlFor='eduEmail'>Email</Label>
          <Input required autoComplete='off' title='Please use poornima email address' pattern='[A-Za-z0-9]+@poornima\.edu\.in' name="email" onChange={handleChange} id='eduEmail' type="email" placeholder='RegNo@poornima.edu.in' />
        </InputDiv>
        <InputDiv>
          <Label htmlFor='password'>Password</Label>
          <Input required autoComplete='off' name="password" onChange={handleChange} id='password' type="password" placeholder='Must be atleast 8 characters' />
        </InputDiv>
        <InputDiv>
          <CFormCheck id="flexCheckDefault" name='rememberMe' onChange={handleChange} label="Remember me" />
          <Button type='submit'>Login</Button>
        </InputDiv>
        <P>New to Internship desk? <Link to="/register">Register</Link></P>

      </Form>
      <Toaster />
    </Container>
  )
}

export default Login