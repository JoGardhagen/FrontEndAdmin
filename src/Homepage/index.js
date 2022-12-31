import React from 'react';
import { useLocalState } from "../util/useLocalStorage";

const Homepage = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");


    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToCars(){
        window.location.href = "/cars";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
    }
    function sendMeToCustomers(){
        window.location.href ="/customers";
    }
    
    function logMeOut(){
        setJwt(null);
    }

    return (
    <div>
        <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservations</button>
                <button onClick={(e)=>sendMeToCustomers()}>Customers</button>
                <button onClick={(e)=>logMeOut()}>Logout</button>
                </div>
        <h1>Homepage</h1>
        <h2>Home of this project repo:</h2>
        <h3><a href='https://github.com/JoGardhagen/CarTwRentalFullStack'>https://github.com/JoGardhagen/CarTwRentalFullStack</a></h3>
        </div>
        );
};

export default Homepage;