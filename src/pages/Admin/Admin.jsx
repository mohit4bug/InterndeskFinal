import React, { useState } from 'react'
import styled from 'styled-components'
import Student from '../../components/Student/Student'
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const Page = styled.div`
    height: calc(100vh - 60px);
    width: 100%;
    position: relative;
    overflow: hidden;
`
const Popup = styled.button`
    position: absolute;
    right: 0px;
    border-radius: 20px 0px 0px 20px;
    padding: 5px 5px;
    border: none;
    color: white;
    font-weight: 500;
    cursor: pointer;
    z-index: 6;
    transition: 0.2s ease-in-out;
    background: teal;

`
const Result = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 10px;
    padding-top: 0px;
`
const Titlebar = styled.div`
    position: sticky;
    top: 0px;
    background: white;
    min-height: 50px;
    align-items: center;
    display: flex;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    padding: 5px 0px;
`
const Username = styled.span`
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: gray;
    font-size: 15px;
    border-right: 1px solid lightgray;
    
`
const OtherInfo = styled.span`
    height: 100%;   
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: gray;
    font-size: 15px;
    border-right: 1px solid lightgray;
    padding: 0px 10px;
`
const SearchingSection = styled.div`
    height: 100%;
    width: 500px;
    position: absolute;
    right: 0px;
    z-index: 5;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.3s ease-in-out;
    transform: translateX(${props => props.translate}%);
    padding: 10px;
    border: 1px solid lightgray;
    gap: 10px;
    backdrop-filter: blur(2px);

    @media (max-width:510px) {
        width: 90%;
    }
`
const Heading = styled.p`
    font-weight: 500;
    font-size: 25px;
`
const Input = styled.input`
    outline: none;
    height: 35px;
    padding-left: 10px;
    border-radius: 5px;
    width: 100%;
    font-size: 13px;
    border: 2px solid lightgray;
    transition: border 0.2s ease-in-out;

    &:hover,&:focus{
        border: 2px solid teal;
    }
`
const SearchButton = styled.button`
    width: 100px;
    height: 30px;
    background: teal;
    color:white;
    font-weight: 500;
    font-size: 12px;
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;
    width: 100%;
`

const Admin = () => {

    const [transValue, setTransValue] = useState(100);

    return (
        <Page>
            <Popup onClick={() => setTransValue(transValue === 100 ? 0 : 100)}>{transValue === 100 ? <FilterListIcon /> : <CloseIcon />}</Popup>
            <SearchingSection translate={transValue}>
                <Heading>Filter</Heading>
                <Input placeholder='City where student live' />
                <Input placeholder='1st preferred city' />
                <Input placeholder='2nd preferred city' />
                <Input placeholder="Student's first name" />
                <Input placeholder="Student's last name" />
                <SearchButton>Search</SearchButton>
            </SearchingSection>
            <Result>
                <Titlebar>
                    <Username>Name</Username>
                    <OtherInfo style={{ flex: "0.5" }}>Age</OtherInfo>
                    <OtherInfo>Looking for</OtherInfo>
                    <OtherInfo>Interests</OtherInfo>
                </Titlebar>
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
                <Student />
            </Result>
        </Page>
    )
}

export default Admin