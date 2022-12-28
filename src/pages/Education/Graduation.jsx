import { CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CFormCheck } from '@coreui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from "styled-components"
import Select from "react-select";
import { Year } from '../../assets/Years';
import { Scale } from "../../assets/ScaleArray"
import { course } from '../../assets/Course';
import { specialization } from '../../assets/Specialization';
import { department } from '../../assets/Department';
import { useCookies } from "react-cookie";
import jwt from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import { toast, Toaster } from "react-hot-toast"


const FormInner = styled.form`
  padding: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 15px;
  @media screen and (max-width: 670px) {
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
const InputRow = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 16px;
`;

const Graduation = () => {
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



  const [gradInputs, setGradInputs] = useState({
    gradStatus: "",
    startYear: "",
    endYear: "",
    gradCourse: "",
    gradDepartment: "",
    gradSpecialization: "",
    gradPerformance: "",
  });


  const handleGradEduStatus = (e) => {
    setGradInputs({ ...gradInputs, gradStatus: e.target.value });
  };
  const handleGradStartYear = (e) => {
    setGradInputs({ ...gradInputs, startYear: e.value });
  };
  const handleGradEndYear = (e) => {
    setGradInputs({ ...gradInputs, endYear: e.value });
  };
  const handleGradCourse = (e) => {
    setGradInputs({ ...gradInputs, gradCourse: e.value });
  };
  const handleGradDepartment = (e) => {
    setGradInputs({ ...gradInputs, gradDepartment: e.value });
  };
  const handleGradSpecialization = (e) => {
    setGradInputs({ ...gradInputs, gradSpecialization: e.value });
  };
  const handleGradPerformance = (e) => {
    setGradInputs({ ...gradInputs, gradPerformance: e.value });
  };


  const HandleGraduationSubmit = async e => {
    e.preventDefault();


    const url = "http://192.168.43.43:8080/user/education/graduation"

    try {
      const res = await axios.post(url, gradInputs, {
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
    <CAccordionItem itemKey={1}>
      <CAccordionHeader>Graduation</CAccordionHeader>
      <CAccordionBody>
        <FormInner onSubmit={HandleGraduationSubmit}>
          <FieldHeading>Graduation status</FieldHeading>
          <RadioContainer>
            <CFormCheck
              onChange={handleGradEduStatus}
              type="radio"
              id="flexRadioDefault1"
              name="eduStatus"
              value="pursuing"
              label="Pursuing"
            />
          </RadioContainer>
          <RadioContainer>
            <CFormCheck
              onChange={handleGradEduStatus}
              type="radio"
              id="flexRadioDefault1"
              name="eduStatus"
              value="completed"
              label="Completed"
            />
          </RadioContainer>
          <InputRow>
            <InputDiv>
              <Label>Start year</Label>
              <Select
                onChange={handleGradStartYear}
                placeholder="Year"
                options={Year}
              />
            </InputDiv>
            <InputDiv>
              <Label>End year</Label>
              <Select
                onChange={handleGradEndYear}
                placeholder="Year"
                options={Year}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Course</Label>
              <Select
                onChange={handleGradCourse}
                placeholder="E.g BCA"
                options={course}
              />
            </InputDiv>

            <InputDiv>
              <Label>Specialization</Label>
              <Select
                onChange={handleGradSpecialization}
                placeholder="Specialization"
                options={specialization}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Department</Label>
              <Select
                onChange={handleGradDepartment}
                placeholder="E.g FCE"
                options={department}
              />
            </InputDiv>
            <InputDiv>
              <Label>Performance scale</Label>
              <Select
                onChange={handleGradPerformance}
                placeholder="E.g BCA"
                options={Scale}
              />
            </InputDiv>
          </InputRow>
          <CButton color="primary" type="submit">
            Save
          </CButton>
        </FormInner>
      </CAccordionBody>
      <Toaster />
    </CAccordionItem>
  )
}

export default Graduation