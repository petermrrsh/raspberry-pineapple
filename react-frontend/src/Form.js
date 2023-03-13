import React, {useState} from 'react';
//import {useNavigate} from 'react-router-dom';

function Form(props) {
  //const navigate = useNavigate();

  const [person, setPerson] = useState(
     {
        name: "",
        password: "",
     }
  );

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password")
      setPerson(
         {name: person['name'], password: value}
      );
    else     
       setPerson(
         {name: value, password: person['password']}   
       );
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({name: '', password: ''});
    //window.location.replace("https://www.calpoly.edu");
  }

  return (
    <form>
      <label htmlFor="name">Username</label>
      <input
        type="text"
        name="name"
        id="name"
	placeholder="example@calpoly.edu"
        value={person.name}
        onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={person.password}
        onChange={handleChange} />
      <input type="button" value="Login" onClick={submitForm} />
    </form>
    );

}
export default Form;

