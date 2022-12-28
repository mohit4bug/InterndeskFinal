import { CButton, CFormInput, CFormSelect } from '@coreui/react'
import React, { useContext, useEffect, useState } from 'react'
import styled from "styled-components"
import Select from 'react-select'
import { gender } from '../assets/Gender'
import { cities } from '../assets/Cities'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import jwt from "jwt-decode"
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
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
const InputRow = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
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
const SmallInfo = styled.p`
  color:gray;
  font-size: 14px;
`







const Personal = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [cookies] = useCookies([]);
  const token = cookies.auth


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



  // Inputs
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    gender: "male",
    countryCode: "+91",
    mobileNumber: "",
    currentCity: "jaipur",
    secondCity: ""
  })


  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleProfileImage = (e) => {
    setInputs({ ...inputs, profilePicture: e.target.files[0] })
  }

  const handleGenderChange = (e) => {
    setInputs({ ...inputs, gender: e.value })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("firstName", inputs?.firstName);
    formdata.append("lastName", inputs?.lastName);
    formdata.append("email", inputs?.email);
    formdata.append("profilePicture", inputs?.profilePicture);
    formdata.append("gender", inputs?.gender);
    formdata.append("mobileNumber", inputs?.mobileNumber);
    formdata.append("currentCity", inputs?.currentCity);
    formdata.append("secondCity", inputs?.secondCity);



    try {

      const url = "http://192.168.43.43:8080/user/personal";
      const res = await axios.post(url, formdata, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      toast.success(res.data.message)
      setTimeout(() => {
        navigate("/education")
      }, 2000)
    } catch (error) {
      toast.error(error.response.data.error)
    }

  }





  return (
    <Page>
      <Form onSubmit={HandleSubmit}>
        <FormHeading>Personal details</FormHeading>
        <InputRow>
          <InputDiv>
            <Label>First name</Label>
            <CFormInput
              type="text"
              name='firstName'
              id="exampleFormControlInput1"
              placeholder="John"
              autoComplete='off'
              required
              onChange={handleChange}
            />
          </InputDiv>
          <InputDiv>
            <Label>Last name</Label>
            <CFormInput
              type="text"
              name='lastName'
              id="exampleFormControlInput1"
              placeholder="Doe"
              autoComplete='off'
              required
              onChange={handleChange}
            />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv>
            <Label>Email</Label>
            <CFormInput
              type="email"
              name='email'
              id="exampleFormControlInput1"
              placeholder="Personal email"
              autoComplete='off'
              required
              onChange={handleChange}
            />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv>
            <Label>Profile image (recommended)</Label>
            <CFormInput
              type="file"
              name='profilePicture'
              autoComplete='off'
              accept="image/png, image/gif, image/jpeg"
              onChange={handleProfileImage}
            />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv>
            <Label>Gender</Label>
            <Select placeholder="Select gender" options={gender} defaultValue={gender[0]} onChange={handleGenderChange} />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv style={{ flex: 2 }}>
            <Label>Mobile</Label>
            <CFormInput
              type="text"
              name='countryCode'
              id="exampleFormControlInput1"
              autoComplete='off'
              placeholder='E.g +91'
              defaultValue={`+91`}
              required
              onChange={handleChange}
              pattern="^\+?(\d+)"
            />
          </InputDiv>
          <InputDiv style={{ flex: 5 }}>
            <Label>&nbsp;</Label>
            <CFormInput
              type="text"
              name='mobileNumber'
              id="exampleFormControlInput1"
              autoComplete='off'
              placeholder='E.g 6367XXXXX0'
              required
              onChange={handleChange}
            />
          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv style={{ gap: "0px" }}>
            <Label>Current location</Label>
            <SmallInfo> Please enter the location where you currently live </SmallInfo>
            <CFormSelect name='currentCity' defaultValue={"Jaipur"} required onChange={handleChange} aria-label="Default select example">
              <option>Select city</option>
              {
                cities.map((data, index) => {
                  return <option key={index} value={data.value}>{data.label}</option>
                })
              }
            </CFormSelect>

          </InputDiv>
        </InputRow>
        <InputRow>
          <InputDiv style={{ gap: "0px" }}>
            <Label>Second location (Optional)</Label>
            <SmallInfo>
              If you study in one location (say Delhi) but are from a different location (say Chennai), fill this to be considered for opportunities in both</SmallInfo>
            <CFormSelect name='secondCity' required onChange={handleChange} aria-label="Default select example">
              <option>Select city</option>
              {
                cities.map((data, index) => {
                  return <option key={index} value={data.value}>{data.label}</option>
                })
              }
            </CFormSelect>

          </InputDiv>
        </InputRow>
        <CButton color="primary" type='submit'>Save</CButton>
      </Form>
      <Toaster />
    </Page>
  )
}

export default Personal