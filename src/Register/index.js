import React ,{useState} from 'react';

const Register = () => {
    const [visible,setVisible] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] =useState("");
    // const user = useUser

    function submitRegister(){
        const reqBody={
            username : username,
            password : password,
            // role: role,
        //   "username" :"joakim",
        //   "password" :1234
        };  
        fetch("api/auth/adminregister",{
            headers: {
                "Content-Type": "application/json"
            },
            method:"POST",
            body: JSON.stringify(reqBody),
        //   }).then((response) =>{
        //     if(response.status == 200){
        //         return Promise.all("Succsessful!"),
        //         window.location.href='login'
        //     }
        // })
        }).then((response) => {
              if(response.status == 200){
                    setVisible(false);
                //   return new Promise.all([response.json(),response.headers]),
                  window.location.href="/login";
              }
              else setVisible(true);
                //   return new Promise.reject("Invalid login attempt"); 
        //   })
        })}

    return (
        <>
        <div>
        <h2>Register </h2>
        <div>
                <label htmlFor='username'>Username</label>
                <input type="email" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div>
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                
                
                <button onClick={()=>submitRegister()}>Submit Register</button>
        </div>
        {visible && <div id='nonSuccess'> Registration Was Not Succsessful!</div>}
        </>
    );
};

export default Register;