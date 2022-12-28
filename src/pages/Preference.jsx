import { CButton, CFormCheck } from "@coreui/react";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";
import { Interests } from "../assets/Interests";
import { cities } from "../assets/Cities";
import { useCookies } from "react-cookie";
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
  align-items: center;
`;
const FormHeading = styled.h1`
  font-weight: 600;
  font-size: 35px;
  text-transform: capitalize;
`;
const Form = styled.form`
  padding: 30px;
  border: 1px solid lightgray;
  width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
  @media screen and (max-width: 610px) {
    width: 100%;
    border: none;
  }
`;
const FieldHeading = styled.p`
  font-weight: 500;
  font-size: 16px;
`;
const RadioContainer = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid lightgray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
`;
const SmallInfo = styled.p`
  color: gray;
  font-size: 12px;
`;





const Preference = () => {

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


  // states
  const [locations, setLocaltions] = useState([]);
  const [internshipType, setInternshipType] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [lookingFor, setLookingFor] = useState("");


  // Handling functions 
  const handleDropDowns = e => {
    setPreferences([...preferences, e.value])
  }
  const handleCheckboxChange = (e) => {

    const { value, checked } = e.target;
    if (checked) {
      setInternshipType([...internshipType, value]);
    }

    else {
      setInternshipType(internshipType.filter((x) => x !== value));
    }
  }
  const handleChangeLocations = (e) => {
    setLocaltions(Array.isArray(e) ? e.map((x) => x.value) : []);
  };


  // Handing submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (preferences.length !== 3) {
      toast.error("Please fill all fields of interests!");
      return;
    }

    const inputs = {
      lookingFor: lookingFor,
      internshipType: JSON.stringify(internshipType),
      interestedFields: JSON.stringify(preferences),
      preferredLocations: JSON.stringify(locations),
    }



    try {
      const url = "http://192.168.43.43:8080/user/preferences"
      const res = await axios.post(
        url, inputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message)
      setTimeout(() => {
        navigate("/personal")
      }, 2000)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };




  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <FormHeading>Preferences</FormHeading>
        <FieldHeading>Currently looking for</FieldHeading>
        <RadioContainer>
          <CFormCheck
            required
            onChange={e => setLookingFor(e.target.value)}
            type="radio"
            id="flexRadioDefault1"
            name="preference"
            value="internship"
            label="Internships"
          />
        </RadioContainer>
        <RadioContainer>
          <CFormCheck
            required
            onChange={e => setLookingFor(e.target.value)}
            type="radio"
            id="flexRadioDefault1"
            name="preference"
            value="jobs"
            label="Jobs"
          />
        </RadioContainer>

        {/* This will change dynamically */}
        <FieldHeading>Types of internships</FieldHeading>
        <CFormCheck
          required
          onChange={handleCheckboxChange}
          id="flexCheckDefault"
          name="In-office"
          value="In-office"
          label="In-office"
        />
        <CFormCheck
          required
          onChange={handleCheckboxChange}
          id="flexCheckDefault"
          name="remote"
          value="remote"
          label="Remote"
        />

        <FieldHeading>Fields of interest</FieldHeading>
        <Select
          onChange={handleDropDowns}
          placeholder="Select your 1st preference"
          options={Interests}
        />
        <Select
          onChange={handleDropDowns}
          placeholder="Select your 2nd preference"
          options={Interests}
        />
        <Select
          onChange={handleDropDowns}
          placeholder="Select your 3rd preference"
          options={Interests}
        />

        <FieldHeading>Prefered location</FieldHeading>
        <Select
          className="dropdown"
          placeholder="Choose prefered locations"
          value={cities.filter((obj) => locations.includes(obj.value))} // set selected values
          options={cities}
          onChange={handleChangeLocations}
          isMulti
          isClearable
        />
        <SmallInfo>
          (Leave this blank if you do not have any preference)
        </SmallInfo>
        <CButton color="primary" type="submit">
          Save
        </CButton>
      </Form>
      <Toaster />
    </Page>
  );
};

export default Preference;
