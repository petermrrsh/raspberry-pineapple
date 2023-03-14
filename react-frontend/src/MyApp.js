import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';
import cp_logo from "./calpoly.png"
import { useNavigate } from 'react-router-dom';

const ip = "192.168.1.45";
//const ip = "localhost"

async function fetchAll(){
  try {
     const response = await axios.get(`http://${ip}:5005/users`);
     return response.data.users_list;     
  }
  catch (error){
     //We're not handling errors. Just logging into the console.
     console.log(error); 
     return false;         
  }
}


function MyApp() {
  //const navigate = useNavigate();


  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );  

  async function makePostCall(person){
      try {
          const response = await axios.post(`http://${ip}:5005/users`, person);
          return response;
      }
      catch (error) {
          console.log(error);
          return false;
      }
   }

   function removeOneCharacter (index) {
    makeDeleteCall(characters[index].id).then(response => {
      if (response.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      } else {
        console.error(`${response.status}: ${response.statusText}`);
      }
    });   
  }



 async function makeDeleteCall(id){
  try {
     const response = await axios.delete(`http://${ip}:5005/users`, { params: { id } });
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}

   function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201) {
       setCharacters([...characters, result.data]);
    }
    //navigate("http://www.calpoly.edu");
    window.location.href = 'http://www.calpoly.edu'; // Navigate to google.com
   });
 }

    return (
      <div className="container" >
	<p></p>
        <img src={cp_logo} alt="Cal Poly Logo" width="200px" margin="10px" />
        <Form handleSubmit={updateList} />
      </div>
    )
}
export default MyApp;
