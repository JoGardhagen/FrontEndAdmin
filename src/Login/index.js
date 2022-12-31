import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Login = () => {
    const [visibleNegativ,setVisibleNegativ] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const [jwt,setJwt] =useLocalState("","jwt");

    // console.log(username);
    function goToRegister(){
        window.location.href='register';
    };
    function sendLoginRequest(){
        console.log("Im sending a request!");
 
    const reqBody={
        username : username,
        password : password,
    //   "username" :"joakim",
    //   "password" :1234
    };  
  
    fetch("api/auth/login",{
      headers: {
          "Content-Type": "application/json"
      },
      method:"post",
      body: JSON.stringify(reqBody)
    })
      .then((response) => {
        if(response.status == 200)
            return Promise.all([response.json(), response.headers])
        else
            return Promise.reject("Invalid login attempt"); 
            setVisibleNegativ(true);
    })
      .then(([body,headers]) =>
        {
          // setJwt(headers.get("authorization"));
          // console.log(`JWT: ${jwt}`);
          setJwt(headers.get("authorization"));
          window.location.href = 'dashboard';
        }).catch((message) => {
            console.log(message);
        });

    }
    return (
        <>
        <h2>Login</h2>
        <div>
            <label htmlFor='username'>Username</label>
            <input type="email" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
        <label htmlFor='password'>Password</label>
            <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
        </div>
       
        <div>
            <button id ="submit" type="button" onClick={() => sendLoginRequest()}>Login</button>
            <button id ="registrer" type="button"onClick={()=> goToRegister()} >Registrer</button>
        </div>
        {visibleNegativ && <div id='nonSuccess'>Non Succsessful!</div>}
        </>
    );
};

export default Login;