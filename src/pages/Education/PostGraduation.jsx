import { CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CFormCheck } from '@coreui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from "styled-components"
import Select from "react-select";
import { Year } from '../../assets/Years';
import { course } from '../../assets/Course';
import { specialization } from '../../assets/Specialization';
import { department } from '../../assets/Department';
import { Scale } from "../../assets/ScaleArray"
import { useCookies } from "react-cookie";
import jwt from "jwt-decode"
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom'
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



const PostGraduation = () => {
  const [cookies] = useCookies([]);
  const token = cookies.auth
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

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




  const [postGradInputs, setPostGradInputs] = useState({
    pgStatus: "",
    startYear: "",
    endYear: "",
    pgCourse: "",
    pgSpecialization: "",
    pgDepartment: "",
    pgPerformance: "",
  });
  const handlePostGradEduStatus = (e) => {
    setPostGradInputs({ ...postGradInputs, pgStatus: e.target.value });
  };
  const handlePostGradStartYear = (e) => {
    setPostGradInputs({ ...postGradInputs, startYear: e.value });
  };
  const handlePostGradEndYear = (e) => {
    setPostGradInputs({ ...postGradInputs, endYear: e.value });
  };
  const handlePostGradCourse = (e) => {
    setPostGradInputs({ ...postGradInputs, pgCourse: e.value });
  };
  const handlePostGradSpecialization = (e) => {
    setPostGradInputs({ ...postGradInputs, pgSpecialization: e.value });
  };
  const handlePostGradPerformance = (e) => {
    setPostGradInputs({ ...postGradInputs, pgPerformance: e.value });
  };
  const handlePostGradDepartment = (e) => {
    setPostGradInputs({ ...postGradInputs, pgDepartment: e.value });
  };



  const HandlePostGraduationSubmit = async (e) => {
    e.preventDefault();

    const url = "http://192.168.43.43:8080/user/education/post-graduation"
    try {
      const res = await axios.post(
        url, postGradInputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  };
  return (
    <CAccordionItem itemKey={2}>
      <CAccordionHeader>Post graduation</CAccordionHeader>
      <CAccordionBody>
        <FormInner onSubmit={HandlePostGraduationSubmit}>
          <FieldHeading>Post graduation status</FieldHeading>
          <RadioContainer>
            <CFormCheck
              onChange={handlePostGradEduStatus}
              type="radio"
              id="flexRadioDefault1"
              name="pgStatus"
              value="pursuing"
              label="Pursuing"
            />
          </RadioContainer>
          <RadioContainer>
            <CFormCheck
              onChange={handlePostGradEduStatus}
              type="radio"
              id="flexRadioDefault1"
              name="pgStatus"
              value="completed"
              label="Completed"
            />
          </RadioContainer>
          <InputRow>
            <InputDiv>
              <Label>Start year</Label>
              <Select
                onChange={handlePostGradStartYear}
                placeholder="Year"
                options={Year}
              />
            </InputDiv>
            <InputDiv>
              <Label>End year</Label>
              <Select
                onChange={handlePostGradEndYear}
                placeholder="Year"
                options={Year}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Course</Label>
              <Select
                onChange={handlePostGradCourse}
                placeholder="E.g BCA"
                options={course}
              />
            </InputDiv>
            <InputDiv>
              <Label>Department</Label>
              <Select
                onChange={handlePostGradDepartment}
                placeholder="E.g FCE"
                options={department}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Specilization</Label>
              <Select
                onChange={handlePostGradSpecialization}
                placeholder="Specialization"
                options={specialization}
              />
            </InputDiv>
            <InputDiv>
              <Label>Performance scale</Label>
              <Select
                onChange={handlePostGradPerformance}
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

export default PostGraduation