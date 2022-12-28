import {
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
    CButton,
    CFormInput,
} from "@coreui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { streams } from "../../assets/Streams";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/authContext";
import { toast, Toaster } from "react-hot-toast";

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
const Senior = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [cookies] = useCookies([]);
    const token = cookies.auth;

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

    // 12th configuration
    const [inputs12th, setInputs12th] = useState({
        seniorStream: "",
        seniorSchoolName: "",
        seniorPercentage: "",
        seniorMedium: "",
        seniorBoard: "",
        seniorFile: "",
    });
    const handleChange12th = (e) => {
        setInputs12th({ ...inputs12th, [e.target.name]: e.target.value });
    };

    const handleStream12th = (e) => {
        setInputs12th({ ...inputs12th, seniorStream: e.value });
    };
    const handleImage12th = (event) => {
        setInputs12th({ ...inputs12th, seniorFile: event.target.files[0] });
    };

    const handleSeniorSecondaryChange = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("seniorStream", inputs12th?.seniorStream);
        formData.append("seniorSchoolName", inputs12th?.seniorSchoolName);
        formData.append("seniorPercentage", inputs12th?.seniorPercentage);
        formData.append("seniorMedium", inputs12th?.seniorMedium);
        formData.append("seniorBoard", inputs12th?.seniorBoard);
        formData.append("seniorFile", inputs12th?.seniorFile);

        try {
            const url = "http://192.168.43.43:8080/user/education/senior";
            const res = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <CAccordionItem itemKey={3}>
            <CAccordionHeader>Add senior secondary (XII)</CAccordionHeader>
            <CAccordionBody>
                <FormInner onSubmit={handleSeniorSecondaryChange}>
                    <InputRow>
                        <InputDiv>
                            <Label>Stream</Label>
                            <Select
                                onChange={handleStream12th}
                                placeholder="Stream"
                                options={streams}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>School name</Label>
                            <CFormInput
                                type="text"
                                name="seniorSchoolName"
                                id="exampleFormControlInput1"
                                placeholder="xyz public school"
                                autoComplete="off"
                                onChange={handleChange12th}
                            />
                        </InputDiv>
                    </InputRow>
                    <InputRow>
                        <InputDiv>
                            <Label>Percentage</Label>
                            <CFormInput
                                type="number"
                                step="0.01"
                                name="seniorPercentage"
                                id="exampleFormControlInput1"
                                placeholder="Your percentage"
                                autoComplete="off"
                                onChange={handleChange12th}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>Medium</Label>
                            <CFormInput
                                type="text"
                                name="seniorMedium"
                                id="exampleFormControlInput1"
                                placeholder="E.g Hindi,English"
                                autoComplete="off"
                                onChange={handleChange12th}
                            />
                        </InputDiv>
                    </InputRow>
                    <InputRow>
                        <InputDiv>
                            <Label>Board</Label>
                            <CFormInput
                                type="text"
                                name="seniorBoard"
                                id="exampleFormControlInput1"
                                placeholder="E.g RBSE,CBSE"
                                autoComplete="off"
                                onChange={handleChange12th}
                            />
                        </InputDiv>
                        <InputDiv>
                            <Label>12th Marksheet</Label>
                            <CFormInput
                                type="file"
                                name="seniorFile"
                                id="exampleFormControlInput1"
                                autoComplete="off"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImage12th}
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
    );
};

export default Senior;
