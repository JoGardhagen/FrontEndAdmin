import React, { useEffect, useState }  from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from "../util/useLocalStorage";
import "./cars.css"

const Cars = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const [cars,setCars]=useState([]);
    
    const [carBrand,setCarBrand] = useState("");
    const [carModelYear,setCarModelYear] = useState("");
    const [carRentalPrice,setCarRentalPrice]= useState("");
    const carBody = {carBrand,carModelYear,carRentalPrice};
    const [car,setCar] = useState({
        carBody
    });
    const [visible,setVisible] = useState(false);
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
    function registerNewCar(){
        const reqCar={
            brand : carBrand,
            modelYear : carModelYear,
            rentalPrice : carRentalPrice,
        };
        fetch("/api/v1/addcar",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"POST",
            body: JSON.stringify(reqCar)
        }).then(response =>{
            if(response.status === 200) 
                return response.json();
                setVisible(true);
            
        }).then(carData=>{
            // window.location.href ="/cars";
            
            console.log(carData);
            
        })
        // sendMeToCars();
    }
    
// }
    


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
    const handleSubmit = (e) =>{
        e.preventDefault();
        setCar(carBody)
        // alert(`The name you entered was: ${JSON.stringify(carBody)}`)
        console.log(carBody);
        registerNewCar();
        
    }
        
    return (
        <div>
            <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservations</button>
                <button onClick={(e)=>sendMeToCustomers()}>Customers</button>
                {/* <button onClick={(e)=>sendMeToNewReservation()}>New Reservation</button> */}
                <button>Logout</button>
                </div>
                <h3>This is all cars available</h3>
            {/* <ul>
                    {cars.map(car=>(
                        <li key={car.id}>
                            {car.id +" "}
                            {car.brand +" "}
                            {car.modelYear+" "}
                            {car.rentalPrice+" "}
                        </li>
                    ))}
                </ul> */}
                <div>
                {cars ? cars.map((car) => (
            <div><Link to = {`/car/${car.id}`}>
                Car ID: {car.id}{car.brand +" "}
                            {car.modelYear+" "}
                            {car.rentalPrice+" "}</Link></div>
             )) : (
             <></>
             )}</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                        <div>
                        <label htmlFor='carBrand'>Brand</label>
                        <input type="text" id="carBrand" value={carBrand} onChange={(e) => setCarBrand(e.target.value)}/>
                        </div>
                        <div>
                        <label htmlFor='carModelYear'>Year Model</label>
                        <input type="text" id="carModelYear" value={carModelYear} onChange={(e)=> setCarModelYear(e.target.value)}/>
                        </div>
                        <label htmlFor='carRentalPrice'>Target Price</label>
                        <input type="text" id="carRentalPrice" value={carRentalPrice} onChange={(e)=> setCarRentalPrice(e.target.value)}/>
                        </div>
                        <button type="submit">Regigster New Car</button>
                    </form>
                    {visible && <div id='success'> Car Succsessfully Added!<button id='returnBtn'onClick={(e)=> sendMeToCars()}>Return</button></div>}
                </div>
        </div>
    );
};

export default Cars;