import { CButton, CFormInput } from '@coreui/react'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import styled from 'styled-components'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import jwt from "jwt-decode"
import { toast, Toaster } from "react-hot-toast"

const Page = styled.div`
  padding: 50px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items:center;
`
const FormHeading = styled.h1`
  font-weight: 600;
  font-size: 35px;
  text-transform: capitalize;
`
const Form = styled.form`
    padding: 30px;
    border: 1px solid lightgray;
    width: 600px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    gap: 20px;
    @media screen and (max-width: 610px) {
      width: 100%;
      border: none;
    }
`
const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Label = styled.label`
    font-weight: 500;
    font-size: 16px;
`



const Samples = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [cookies] = useCookies([]);
  const token = cookies.auth


  const [inputs, setInputs] = useState({
    blogLink: "",
    gitHubLink: "",
    linkedinLink: "",
  })



  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    try {
      const user = jwt(token)
      if (user.sub !== currentUser?.email)
        navigate("/")
      else if (user.exp < Date.now() / 1000)
        navigate("/")
    }
    catch (e) {
      navigate("/")
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = "http://192.168.43.43:8080/user/worksample";
      const res = await axios.post(url, inputs, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <FormHeading>Work samples</FormHeading>
        <InputDiv>
          <Label>Blog link</Label>
          <CFormInput
            type="url"
            name='blogLink'
            id="exampleFormControlInput1"
            placeholder='http://myblog.com'
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </InputDiv>
        <InputDiv>
          <Label>Github profle</Label>
          <CFormInput
            type="url"
            name='gitHubLink'
            id="exampleFormControlInput1"
            placeholder='http://github.com/my_profile'
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </InputDiv>
        <InputDiv>
          <Label>Linked profile</Label>
          <CFormInput
            type="url"
            name='linkedinLink'
            id="exampleFormControlInput1"
            placeholder='https://linkedin.com/in/my_profile'
            autoComplete='off'
            required
            onChange={handleChange}
          />
        </InputDiv>
        <CButton color="primary" type='submit'>Save</CButton>
      </Form>
      <Toaster />
    </Page>
  )
}

export default Samples