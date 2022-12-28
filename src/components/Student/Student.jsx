import React from 'react'
import styled from 'styled-components'


const Container = styled.div`

    max-height: 50px;
    width: 100%;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    padding: 30px 0px;

    &:hover{
        background: #f6f7ff;
    }
`
const Username = styled.span`
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #505050;
    
`

const OtherValue = styled.span`
    height: 100%;   
    flex: 1;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #505050;
    padding: 0px 10px;
`

const Student = () => {
    return (
        <Container>
            <Username>Mohit khatri</Username>
            <OtherValue style={{ flex: "0.5" }}>19</OtherValue>
            <OtherValue>Intern.</OtherValue>
            <OtherValue>Web dev.</OtherValue>
        </Container>
    )
}

export default Student