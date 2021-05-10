import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from "styled-components";
import db from '../firebase';

const Detail = (props) => {

    const {id} = useParams();
    const [detailData, setDetailData] = useState({});

    useEffect(()=> {
        db.collection('movies')
        .doc(id)
        .get()
        .then((doc) => {
            if(doc.exists) {
                setDetailData(doc.data());
            } else {
                console.log("No such document on Firebase");
            }
        })
        .catch((err) => {
            console.log("Error getting document", err);
        })
    },[id]);

    return (
        <Container>
            <Background>
                <img alt={detailData.title} src={detailData.backgroundImg}/>
            </Background>
            <ImageTitle>
                <img src={detailData.titleImg} alt={detailData.title}/>
            </ImageTitle>
            <ContentMeta>
                <Control>
                    <Player>
                        <img src="/assets/images/play-icon-black.png" alt=""/>
                        <span>Play</span>
                    </Player>
                    <Trailer>
                        <img src="/assets/images/play-icon-white.png"/>
                        <span>Trailer</span>
                    </Trailer>
                    <AddList>
                        <span/>
                        <span/>
                    </AddList>
                    <GroupWatch>
                        <div>
                            <img src="/assets/images/group-icon.png" alt=""/>
                        </div>
                    </GroupWatch>
                </Control>
                <SubTitle>
                    {detailData.subTitle}
                </SubTitle>
                <Description>
                    {detailData.description}
                </Description>
            </ContentMeta>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    overflow-x: hidden;
    display: block;
    top: 72px;
    min-height: calc(100vh-250px);
    padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    opacity: 0.8;
    z-index: -1;

    img {
        width: 100vw;
        height: 100vh;

        @media (max-width: 768px) {
            width: initial;
        }
    }
`;

const ImageTitle = styled.div`
    display: flex;
    align-items: flex-end;
    -webkit-box-pack: start;
    justify-content: flex-start;
    margin: 0px auto;
    height: 30vw;
    min-height: 170px;
    padding-bottom: 24px;
    width: 100%;

    img {
        max-width: 600px;
        min-width: 200px;
        width: 35vw;
    }
`;

const ContentMeta = styled.div`
    max-width: 874px;
`;

const Control = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    margin: 24px 0px;
    min-height: 56px;
`;

const Player = styled.button`
    font-size: 15px;
    margin: 0px 22px 0px 0px;
    padding: 0px 24px;
    height: 56px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1.8px;
    text-align: center;
    text-transform: uppercase;
    border: none;
    background: rgb(249,249,249);
    color: rgb(0,0,0);

    img {
        width: 32px;
    }

    &:hover {
        background: rgb(198,198,198);
    }

    @media (max-width: 768px) {
        height: 45px;
        padding: 0px 12px;
        font-size: 12px;
        margin: 0px 10px 0px 0px;

        img {
            width: 25px;
        }
    }
`;

const Trailer = styled(Player)`
    background: rgb(0,0,0,0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
`;

const AddList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 44px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    margin-right: 16px;
    background-color: rgba(0,0,0,0.6);

    span {
        background-color: rgb(249,249,249);
        display: inline-block;

        &:first-child {
            height: 2px;
            width: 16px;
            transform: translate(1px, 0px) rotate()(0deg);
        }

        &:nth-child(2) {
            height: 16px;
            width: 2px;
            transform: translateX(-8px) rotate(0deg);
        }
    }
`;

const GroupWatch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: white;
    height: 44px;
    width: 44px;
    border-radius: 50%;

    div {
        height: 40px;
        width: 40px;
        background: rgb(0,0,0);
        border-radius: 50%;
    }

    img {
        width: 100%;
    }
`;

const SubTitle = styled.div`
    font-size: 15px;
    color: rgb(249, 249, 249);
    min-height: 20px;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

const Description = styled.div`
    font-size: 20px;
    line-height: 1.4;
    padding: 16px 0px;
    color: rgb(249,249,249);

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;


export default Detail
