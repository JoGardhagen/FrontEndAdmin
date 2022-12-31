import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const ReservartionView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const reservationId = window.location.href.split("/reservation/")[1];
    const [cars,setCars]=useState([]);
    const [car,setCar] = useState({
        // id:"",brand:"",modelYear:"",rentalPrice:""
    });
    const [userEntity,setUserEntity]= useState("")
    // const [active,setActive] = useState(false);
    // const []
    // const [id,setId] = useState("");
    // const [brand,setBrand] = useState("");
    // const [modelYear,setModelYear] = useState("");
    // const [rentalPrice,setRentalPrice]= useState("");
    // const carBody = {id,brand,modelYear,rentalPrice};
    // const [carBody,setCarBody]= useState({
    //     id:"",brand:"",modelYear:"",rentalPrice:"",
    // });
    const [reservation,setReservation] = useState({
        car,
        userEntity,
        rentalDays:"",

        
    });
    
    useEffect(()=>{
        fetch(`/api/v1/myorder/${reservationId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"GET",
        }).then(response =>{
            if(response.status === 200) return response.json();
        })
        .then(reservationData =>{ 
            setReservation(reservationData);
           
        });
    },[])
    useEffect(()=>{
        fetch("/api/v1/cars",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method :"GET",
        }).then((response)=>{
            if(response.status === 200) return response.json(); 
        }).then(data=> setCars(data));
        
    },[]);
   
    function updateReservation(prop,value){
        const newReservation = {...reservation};
        newReservation[prop] = value;
        setReservation(newReservation)
        console.log(reservation);
    }
    function updateReservationFunc(){
        fetch(`/api/v1/myorder/${reservationId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"PUT",
            body: JSON.stringify(reservation),

        }).then(response => {
            if(response.status ===200)return response.json();
        }).then(reservationData =>{
            setReservation(reservationData);
            console.log(reservation);
        });
    }

    const onOptionChangeHandler = (e) =>{
        // updateReservation("car",e.target);
        

        console.log(e.target.value.split(" ")[0]);
        console.log(e.target.value.split(" ")[1]);
        console.log(e.target.value.split(" ")[2]);
        console.log(e.target.value.split(" ")[3]);
        selectedCar(e.target.value.split(" "));
        // setCar(carBody);
        // setReservation(carBody);
        // updateReservation("car",e.target.value.split(" ")[0],e.target.value.split(" ")[1],e.target.value.split(" ")[2]);
        // updateCarBody("id",e.target.value.split(" ")[0]);
        // updateCarBody("brand",e.target.value.split(" ")[1]);
        // updateCarBody("modelYear",e.target.value.split(" ")[2]);
        // updateCarBody("rentalPrice",e.target.value.split(" ")[3]);

    }
    function updateCarBody(prop,value){
        const newCarBody = {...car};
        newCarBody[prop] = value;
        // setCarBody(newCarBody);
        setCar(newCarBody);
        console.log(car);
    }

    function selectedCar(data){
        // setId(data[0]);
        // setBrand(data[1]);
        // setModelYear(data[2]);
        // setRentalPrice(data[3]);
        updateReservation("car.id",data[0]);
        updateReservation("car.brand",data[1]);
        updateReservation("car.modelYear",data[2]);
        updateReservation("car.rentalPrice",data[3]);
        // console.log(car);
        // console.log(carBody);
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
                <button onClick={(e)=>sendMeToNewReservation()}>New Reservation</button>
                <button>Logout</button>
                <div>  
                <h2>Reservation for {reservation.userEntity.username}</h2>
                <h2>Date of Reservation {reservation.bookingDate}</h2>
                    <h2>Rental Days: {reservation.rentalDays}</h2>
                    <h3>Days : <input type="text" id="rentalDays" pattern="[0-9]*" onChange={(e)=> updateReservation("rentalDays",e.target.value)}
                    />
                    </h3>
                    <h2>Car :   {reservation.car.id +" "},
                                {reservation.car.brand+" "}, 
                                {reservation.car.modelYear+" "}, 
                                {reservation.car.rentalPrice}
                    </h2>
                    <h2>At Total Charge :{reservation.rentalDays * reservation.car.rentalPrice +" SEK"}</h2>
                </div>
                    <button onClick={(e)=> updateReservationFunc()}>Update this Reservation</button> 
                    {/* <select onChange={onOptionChangeHandler}>
                        <option>Choose a car</option>
                        {cars.map((car,index) =>{
                            return<option key={car.id}>
                                
                                {car.id +" "}
                                {car.brand +" "}
                                {car.modelYear+" "}
                                {car.rentalPrice+" "}
                                </option>
                        })}
                    </select>    */}
            <div>
    
            </div>
        </div>
        </div>
    );
};

export default ReservartionView;