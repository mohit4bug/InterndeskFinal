import { CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CFormInput } from '@coreui/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from "styled-components"
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

const Secondary = () => {
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



  const [inputs10th, setInputs10th] = useState({
    secondSchoolName: "",
    secondPercentage: "",
    secondMedium: "",
    secondBoard: "",
    secondaryFile: "",
  });
  const handleChange10th = (e) => {
    setInputs10th({ ...inputs10th, [e.target.name]: e.target.value });
  };

  const handleImage10th = (event) => {
    setInputs10th({ ...inputs10th, secondaryFile: event.target.files[0] });
  };


  const handleSecondarySubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("secondSchoolName", inputs10th?.secondSchoolName)
    formData.append("secondPercentage", inputs10th?.secondPercentage)
    formData.append("secondMedium", inputs10th?.secondMedium)
    formData.append("secondBoard", inputs10th?.secondBoard)
    formData.append("secondaryFile", inputs10th?.secondaryFile)

    try {
      const url = "http://192.168.43.43:8080/user/education/secondary";
      const res = await axios.post(
        url, formData,
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

  }
  return (
    <CAccordionItem itemKey={4}>
      <CAccordionHeader>Add secondary (X)</CAccordionHeader>
      <CAccordionBody>
        <FormInner onSubmit={handleSecondarySubmit}>
          <InputRow>
            <InputDiv>
              <Label>School name</Label>
              <CFormInput
                type="text"
                name="secondSchoolName"
                id="exampleFormControlInput1"
                placeholder="xyz public school"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
            <InputDiv>
              <Label>Percentage</Label>
              <CFormInput
                type="number"
                step="0.01"
                name="secondaryPercentage"
                id="exampleFormControlInput1"
                placeholder="Your percentage"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Medium</Label>
              <CFormInput
                type="text"
                name="secondMedium"
                id="exampleFormControlInput1"
                placeholder="E.g Hindi,English"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
          </InputRow>
          <InputRow>
            <InputDiv>
              <Label>Board</Label>
              <CFormInput
                type="text"
                name="secondBoard"
                id="exampleFormControlInput1"
                placeholder="E.g RBSE,CBSE"
                autoComplete="off"
                onChange={handleChange10th}
              />
            </InputDiv>
            <InputDiv>
              <Label>10th Marksheet</Label>
              <CFormInput
                type="file"
                name="secondaryFile"
                id="exampleFormControlInput1"
                autoComplete="off"
                accept="image/png, image/gif, image/jpeg"
                onChange={handleImage10th}
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

export default Secondary