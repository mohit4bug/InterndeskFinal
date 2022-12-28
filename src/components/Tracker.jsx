import React from 'react'
import { Link } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import BuildIcon from '@mui/icons-material/Build';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import styled from "styled-components"
import { CTooltip } from '@coreui/react';

const TrackerContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    overflow: scroll;
    padding-top: 50px;
    
    @media only screen and (max-width: 450px) {
        justify-content:flex-start;
        padding: 0px 20px;
        padding-top:50px;
    }
`
const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
`
const Logo = styled.span`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    border: ${props => props.theme.border};
    color: ${props => props.theme.color};
    background: ${props => props.theme.background};
    cursor: pointer;
`
const Name = styled.p`
    color: black;
    font-weight: 500;
`


const Tracker = () => {




    return (
        <TrackerContainer>
            {/* 1 */}
            <Item>
                <CTooltip
                    content="Preferences"
                    placement="bottom"
                >
                    <Link to="/preference">
                        <Logo theme={{ color: "white", background: "#321fdb", border: "none" }}>
                            <TuneRoundedIcon />
                        </Logo>
                    </Link>
                </CTooltip>
                <Name>Preferences</Name>
            </Item>
            {/* 2 */}
            <Item>
                <CTooltip
                    content="Personal"
                    placement="bottom"
                >
                    <Link to="/personal">
                        <Logo theme={{ color: "white", background: "#321fdb", border: "none" }}>
                            <PersonIcon />
                        </Logo>
                    </Link>
                </CTooltip>
                <Name>Personal</Name>
            </Item>
            {/* 3 */}
            <Item>
                <CTooltip
                    content="Education"
                    placement="bottom"
                >
                    <Link to="/education">
                        <Logo theme={{ color: "white", background: "#321fdb", border: "none" }}>
                            <SchoolIcon />
                        </Logo>
                    </Link>
                </CTooltip>
                <Name>Education</Name>
            </Item>
            {/* 4 */}
            <Item>
                <CTooltip
                    content="Skills"
                    placement="bottom"
                >
                    <Link to="/skills">
                        <Logo theme={{ color: "#321fdb", background: "white", border: "2px solid #321fdb" }}>
                            <BuildIcon />
                        </Logo>
                    </Link>
                </CTooltip>
                <Name>Skills</Name>
            </Item>
            {/* 5 */}
            <Item>
                <CTooltip
                    content="Work samples"
                    placement="bottom"
                >
                    <Link to="/samples">
                        <Logo theme={{ color: "#321fdb", background: "white", border: "2px solid #321fdb" }}>
                            <ImportContactsRoundedIcon />
                        </Logo>
                    </Link>
                </CTooltip>
                <Name>Work samples</Name>
            </Item>

        </TrackerContainer>
    )
}

export default Tracker