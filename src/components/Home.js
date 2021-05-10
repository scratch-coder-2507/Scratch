import React, { useEffect } from 'react'
import styled from "styled-components"
import ImgSlider from './ImgSlider'
import NewScratch from './NewScratch'
import Originals from './Originals'
import Recommend from './Recommend'
import Trending from './Trending'
import Viewers from './Viewers';
import { useDispatch, useSelector} from "react-redux";
import { selectUserName } from '../features/user/userSlice';
import db from "../firebase";
import { setMovies } from '../features/movie/movieSlice'

const Home = (props) => {

    const dispatch =  useDispatch();
    const userName = useSelector(selectUserName);
    let recommends=[];
    let newScratch=[];
    let original=[];
    let trending=[];

    useEffect(()=> {
        db.collection("movies").onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                console.log(recommends);
                switch(doc.data().type) {
                    case "recommend":
                        recommends = [...recommends, {id: doc.id, ...doc.data()}];
                        break;
                    case "new":
                        newScratch = [...newScratch, {id: doc.id, ...doc.data()}];
                        break;
                    case "original":
                        original = [...original, {id: doc.id, ...doc.data()}];
                        break;
                    case "trending":
                        trending = [...trending, {id: doc.id, ...doc.data()}];
                        break;
                }
            });
            dispatch(
                setMovies({
                    recommend: recommends,
                    newScratch: newScratch,
                    original: original,
                    trending: trending,
                })
            );

        })
    },[userName]);

    return (
        <Container>
            <ImgSlider/>
            <Viewers/>
            <Recommend/>
            <NewScratch/>
            <Originals/>
            <Trending/>
        </Container>
    )
}

const Container = styled.main`
    position: relative;
    display: block;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    top: 72px;
    padding: 0 calc(2.5vw + 5px);

    &:after {
        background: url("/assets/images/home-background.png") center center/cover
        no-repeat fixed ;
        content:"";
        position: absolute;
        inset: 0px;
        opacity: 1;
        z-index: -1;
    }
`;

export default Home
