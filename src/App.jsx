import React from 'react';
import{BrowserRouter,Routes,Route}from'react-router-dom';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Review from './pages/Review.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Nav from './components/Nav.jsx';
export default function App(){return React.createElement(BrowserRouter,null,React.createElement(Nav),React.createElement(Routes,null,
    React.createElement(Route,{path:'/',element:React.createElement(Home)}),
    React.createElement(Route,{path:'/profile',element:React.createElement(Profile)}),
    React.createElement(Route,{path:'/review/:userId',element:React.createElement(Review)}),
    React.createElement(Route,{path:'/leaderboard',element:React.createElement(Leaderboard)})
));}