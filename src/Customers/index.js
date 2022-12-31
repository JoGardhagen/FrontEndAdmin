import React, { useState ,useEffect} from 'react';
import { useLocalState } from "../util/useLocalStorage";

const Customers = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");

    const [users,setUsers] = useState([]);

    useEffect(()=>{
        fetch("api/v1/customers",{
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
        }).then(response =>{
            if(response.status === 200)return response.json();
        }).then((responseData)=>{
            setUsers(responseData);
            console.log(responseData);
        })
    },[])
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
    return (
        <div>
            <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservations</button>
                <button onClick={(e)=>sendMeToCustomers()}>Customers</button>
                <button>Logout</button>
                </div>
            <h2>Customers</h2>
            <div>
            <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>CREATED</th>
                            <th>USERNAME</th>
                            {/* <th>ROLE</th> */}
                            <th>PASSWORD</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user,index)=>{
                        return(
                            <tr key={index}>
                                <th scope="row">{user.id}</th>
                                {/* <td>{user.id +" "}</td> */}
                                   <td> {user.id +" "}</td>             
                                   <td> {user.createdAt +" "}</td>           
                                   <td> {user.username +" "}</td> 
                                   {/* <td> {user.authorites.role +" "}</td> */}
                                   <td> {user.password+" "}</td>
                                           
                            </tr>
                        )})}
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default Customers;