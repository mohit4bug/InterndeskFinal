import React from 'react'
import styled from 'styled-components'
import SingleEdu from '../../components/Single Education/SingleEdu'
import Skill from '../../components/Skill/Skill'

const Page = styled.div`
    height: calc(100vh - 60px);
    display: flex;
    padding: 0px 10px;
    
    @media (max-width: 900px) {
        flex-direction: column;
        height: auto;
        padding-bottom:20px;
    }
`
const PersonalSection = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 20px 10px;
    overflow: auto;
    gap: 20px;
    height: auto;
    
    `
const BasicInfoDiv = styled.div`
    width: 100%;
    min-height: 500px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 2px 5px #b6b6b6;
    background: white;

`
const CoverImageDiv = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
`
const CoverImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    
`
const ProfileImage = styled.img`
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: 5px solid white;
    position: absolute;
    right: 50px;
    left: 50px;
    bottom: -75px;
    margin: auto;
`
const BasicDetails = styled.div`
    height: 100%;
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    `
const Username = styled.p`
    font-weight: 500;
    font-size: 30px;
    margin-top: 40px;
    `
const Location = styled.p`
    font-weight: 500;
    font-size: 14px;
    color: gray;
`
const Specialization = styled.p`
    font-weight: 600;
    font-size: 15px;
    color: #b6b6b6;
`
const LinkButton = styled.button`
    background: teal;
    height: 35px;
    width: 100px;
    border-radius: 5px;
    outline: none;
    color: white;
    font-weight: 500;
    border: none;
    cursor: pointer;
`
const SkillsDiv = styled.div`
    min-height: 150px;
    height: 150px;
    width: 100%;
    border-radius: 20px;
    padding: 10px;
    box-shadow: 0px 2px 5px #b6b6b6;
    background: white;
`
const SkillTop = styled.div`
    height: fit-content;
    width: 100%;
    padding: 10px 0px;
    padding-left: 10px;
    font-size: 20px;
    font-weight: 700;
    color: black;
`
const SkillBottom = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0px 10px;
    overflow: auto;
`
const EducationSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: fit-content;
    margin-top: 11px;
    border-radius: 20px;
    overflow: hidden;
    padding: 10px;
    box-shadow: 0px 2px 5px #b6b6b6;
`
const FakeEduData = [
    {
        Ins: "Poornima university",
        Edu: "Graduation"
    },
    {
        Ins: "Poornima university",
        Edu: "Post graduation"
    },
    {
        Ins: "Alpha beta school",
        Edu: "Senior secondary"
    },
    {
        Ins: "Alpha beta school",
        Edu: "Secondary"
    },
]

const Profile = () => {
    return (
        <Page>
            <PersonalSection>
                <BasicInfoDiv>
                    <CoverImageDiv>
                        <CoverImage src='https://img.freepik.com/free-photo/book-with-green-board-background_1150-3836.jpg?w=2000' />
                        <ProfileImage src='https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=' />
                    </CoverImageDiv>
                    <BasicDetails>
                        <Username>Mohit khatri</Username>
                        <Location>Jaipur , Rajasthan</Location>
                        <Specialization>AI & DS</Specialization>
                        <LinkButton>Github</LinkButton>
                    </BasicDetails>
                </BasicInfoDiv>
                <SkillsDiv>
                    <SkillTop>Skills</SkillTop>
                    <SkillBottom>
                        <Skill />
                        <Skill />
                        <Skill />
                    </SkillBottom>
                </SkillsDiv>

            </PersonalSection>
            <EducationSection>
                <SingleEdu data={FakeEduData} />
            </EducationSection>
        </Page>
    )
}

export default Profile