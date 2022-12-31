import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from "../util/useLocalStorage";

const CarView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const carId = window.location.href.split("/car/")[1];
    const [visible,setVisible] = useState(false);
    const [visibleNegativ,setNonVisibleNegative]= useState(false);
    const [visibleUpdate,setVisibleUpdate] = useState(false);
    const [car,setCar] = useState({
        brand:"",
        modelYear:"",
        rentalPrice:"",
    });

    useEffect(()=>{
        fetch(`/api/v1/car/${carId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method :"GET",
        }).then((response)=>{
            if(response.status === 200) return response.json(); 
        }).then(data=> setCar(data));
        
    },[]);
    function updateCarInformation(prop,value){
        const registerUpdatedCar = {...car};
        registerUpdatedCar[prop] = value;
        setCar(registerUpdatedCar)
        console.log(registerUpdatedCar);

    }function registerUpdatedCar(){
        const reqCar={
            id: carId,
            brand : car.brand,
            modelYear : car.modelYear,
            rentalPrice : car.rentalPrice,
        };
        fetch(`/api/v1/updatecar/${carId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"PUT",
            body: JSON.stringify(reqCar)
        }).then(response =>{
            if(response.status === 200) return response.json();
        }).then(carData=>{
            
            console.log(carData);
            setVisibleUpdate(true);
        })
        
    }
    
    function deleteCarTarget(){
        fetch(`/api/v1/deletecar/${carId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"DELETE",
            body: JSON.stringify(carId)
        }).then(response =>{
            if(response.status === 200) return response.json(),setVisible(true);
            else if(response.status === 500) setNonVisibleNegative(true);
                
                
            
            // else if(response.status === 500)
            // alert
            //     window.location.href ="/cars";
        }).then(carData=>{
            
            console.log(carData);
            // alert("Car Deleted");
        });
        
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(car.brand,car.modelYear,car.rentalPrice);
        registerUpdatedCar();
    }
    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToCars(){
        window.location.href = "/cars";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
    }
    function sendMeToNewReservation(){
        window.location.href ="/reservation";
    }
    return (
        <div>
            <div className='NavBar'>
                
        <button onClick={(e)=>sendMeHome()}>Home</button>
        <button onClick={(e)=>sendMeToCars()}>Cars</button>
        <button onClick={(e)=>sendMeToReservation()}>Reservations</button>
        {/* <button onClick={(e)=>sendMeToNewReservation()}>New Reservation</button> */}
        <button>Logout</button>
        </div>
            <h2>CAR {carId}</h2>
            <form onSubmit={handleSubmit}>
            <div>
                        <div className='formElement' id='brand'>
                        <label htmlFor='brand'>Brand</label>
                        <input type="text" id="brand" onChange={(e) => updateCarInformation("brand",e.target.value)} value={car.brand}/>
                        </div>
                        <div className='formElement' id='year'>
                        <label htmlFor='modelYear'>Year Model</label>
                        <input type="text" id="modelYear" onChange={(e)=> updateCarInformation("modelYear",e.target.value)} value={car.modelYear}/>
                        </div>
                        <div className='formElement' id='price'>
                        <label htmlFor='rentalPrice'>Target Price</label>
                        <input type="text" id="rentalPrice" onChange={(e)=> updateCarInformation("rentalPrice",e.target.value)} value={car.rentalPrice}/>
                        </div>
                        </div>
                        <button type="submit">Update Car</button>
                        {/* <button type="delete" onClick={(e)=>deleteCarTarget()}>Delete</button> */}
            </form>
            <button type="delete" onClick={(e)=>deleteCarTarget()}>Delete</button>
            {visible && <div id='success'> Car Succsessfully Removed! <button id='returnBtn'onClick={(e)=> sendMeToCars()}>Return</button></div>}
            {visibleNegativ && <div id='nonSuccess'>Cant Remove Car!<button id='returnBtn'onClick={(e)=> sendMeToCars()}>Return</button></div>}
            {visibleUpdate && <div id='success'> Update Succsessful!<button id='returnBtn'onClick={(e)=> sendMeToCars()}>Return</button></div>}
        </div>
    );
};

export default CarView;