import styled from 'styled-components';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectUserName, selectUserPhoto, setSignOutState, setUserLoginDetails } from '../features/user/userSlice';
import  {auth, provider } from "../firebase";


const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                setUser(user);
                history.push("/home");
            }
        });
    },[userName]);

    const handleAuth = () => {
        if(!userName) {
            auth.signInWithPopup(provider)
            .then((result) => {
                setUser(result.user);
            })
            .catch((err) => alert(err.message));
        } else if (userName) {
            auth.signOut()
            .then(() => {
                dispatch(setSignOutState());
                history.push("/");
            })
            .catch((err) => alert(err.message));
        }
    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        );
    }

    return (
        <Nav>
            <Logo>
                <img src="/assets/images/scratch.png"/>
            </Logo>
            {!userName ? (
                <Login onClick={handleAuth}>Login</Login>
            ) : (
                <>
            <NavMenu>
                <a href="/home">
                    <img src="/assets/images/home-icon.svg" alt="HOME"/>
                    <span>HOME</span>
                </a>
                <a>
                    <img src="/assets/images/search-icon.svg" alt="SEARCH"/>
                    <span>SEARCH</span>
                </a>
                <a>
                    <img src="/assets/images/watchlist-icon.svg" alt="WATCHLIST"/>
                    <span>WATCHLIST</span>
                </a>
                <a>
                    <img src="/assets/images/original-icon.svg" alt="ORIGINALS"/>
                    <span>ORIGINALS</span>
                </a>
                <a>
                    <img src="/assets/images/movie-icon.svg" alt="MOVIEs"/>
                    <span>MOVIES</span>
                </a>
                <a>
                    <img src="/assets/images/series-icon.svg" alt="SERIES"/>
                    <span>SERIES</span>
                </a>
            </NavMenu>
            <SignOut>
                <UserImg src={userPhoto} alt={userName}/>
                <DropDown>
                    <span onClick={handleAuth}>Sign out</span>
                </DropDown>
            </SignOut>
            </>
            )}
        </Nav>
    )
}

const Nav = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
    background-color: #090b13;
`;

const Logo = styled.a`
    padding: 0;
    display: inline-block;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;

    img {
        display: block;
        width: 100%;
    }
`;

const Login = styled.a`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 5px;
    transition: all 0.2s ease 0s;

    &:hover {
        background-color: #f9f9f9;
        color: #000000;
        border-color: transparent;
        cursor: pointer;
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;

        img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }

    span {
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
        color: rgb(249,249,249);

        &:before {
            background-color: rgb(249,249,249);
            border-radius: 0px 0px 4px 4px;
            bottom: -6px;
            content: "";
            height: 2px;
            width: auto;
            opacity: 0;
            left: 0px;
            right: 0px;
            position: absolute;
            transform-origin: left center;
            transform: scaleX(0);
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)0s;
            visibility: hidden;

        }
    }

    &:hover {
        span:before {
            transform: scaleX(1);
            visibility: visible;
            opacity: 1 !important;
        }
    }
}
 @media (max-width: 768px) {
    display: none;
  } 
`;

const UserImg = styled.img`
    height: 100%;
`;

const DropDown = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    background: rgb(16,19,19);
    border: 1px solid rgba(151,151,151,0.34);
    border-radius: 5px;
    box-shadow: rgb(0 0 0/50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`;

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImg} {
        border-radius: 50%;
        width:100%;
        height: 100%;
    }

    &:hover {
        ${DropDown} {
            opacity: 1;
            transition-duration: 1s;
        }
    }
`;



export default Header;
