import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    padding: 5px 10px;
    display: flex;
    background: white;
    flex-direction: column;
    height: 80px;
    border-bottom: 1px solid lightgray;
`
const Heading = styled.p`
    font-weight: 600;
    font-size: 16px;
`
const Info = styled.p`
    font-weight: 500;
    color: gray;
    font-size: 13px;
`

const SingleEdu = ({ data }) => {
    return (

        data.map((item, key) => {
            return (
                <Container key={key}>
                    <Heading>{item.Edu}</Heading>
                    <Info>{item.Ins}</Info>
                </Container>
            )
        })

    )
}

export default SingleEdu