import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
    min-height: 30px;
    height: 30px;
    min-width: 70px;
    font-weight: 500;
    padding: 0px 10px;
    font-size: 13px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    border: 1px solid lightgray;
    color: #5d5d5d;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

`
const Skill = () => {
    return (
        <Container>Javascipt</Container>
    )
}

export default Skill