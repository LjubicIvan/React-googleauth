import {useEffect,useState} from 'react'
import React from 'react';
import jwt_decode from "jwt-decode";

function App() {

  const[user,setUser]=useState([]);

  function handleCallbackResponse(response){
    var userObject=jwt_decode(response.credential)
    console.loh (userObject)
    setUser(userObject)

  }

  function handleSignOut(event){
    setUser({});

  }

  useEffect(()=>{
    /*global google*/
    google.accounts.id.initialize({
      client_id:"271356592543-qra00io8kloler2has3ffqjge52tn67k.apps.googleusercontent.com",
      callback:handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),{
        theme:"outline",size:"large"
      }
    )

  },[])  


  return (
    <div className="App">
      
      <div id="signInDiv"></div>
      <button onClick={(e)=> handleSignOut(e)}></button>

      {
        user &&
        <div>
          <img src={user.picture} alt="" />
          <h1>{user.name}</h1>
        </div>
      }
    </div>
  );
}

export default App;
