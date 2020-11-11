import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import schema from "../schema/schema";
import axios from "axios";

//Styled components

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 2%;
  font-weight: 500;
  background-color: whitesmoke;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 25px #222;
  margin: 10% auto 10% auto;

  input {
    margin: 1%;
  }

  button {
    padding: 0.5%;
    font-size: 1.5rem;
    margin: 2% 0;
    background: slateblue;
    &:hover {
      color: whitesmoke;
      background: crimson;
    }
  }
`;

const ErrorContainer = styled.div`
  padding: 2% 0;
  color: red;
`;

const UserContainer = styled.div`
  color: black;
  background: slateblue;
  border: 1px solid black;
  margin-top: 75px;
  border-radius: 10px;
  box-shadow: 2.5px 2.5px 12.5px #222;
  .headings {
    text-align: center;
  }
`;

//Default blank form
const defaultFormData = {
  name: "",
  email: "",
  password: "",
  role: "",
  bestlanguage: "",
  agree: false,
};

const defaultErrorState = {
  name: "",
  email: "",
  password: "",
  role: "",
  agree: "",
};

export default function Form(props) {
  //Hold form values in state
  const [formData, setFormData] = useState(defaultFormData);

  //Set Yup errors during validation
  const [errors, setErrors] = useState(defaultErrorState);

  //Disable button until form is complete
  const [disabled, setDisabled] = useState(true);

  //Keep track of users entered
  const [users, setUsers] = useState([]);

  //Every time form data is filled out, check schema to see if it's valid. If so disable button.
  useEffect(() => {
    schema
      .isValid(formData)
      .then((valid) => setDisabled(!valid))
      .catch((err) => alert(err));
  }, [formData]);

  //Check the schema and set errors for display
  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const submit = (evt) => {
    evt.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        const newUser = res.data;
        setUsers([...users, newUser]);
        console.log(JSON.stringify(newUser));
        setFormData(defaultFormData);
      })
      .catch((err) => {
        alert("There was an error!", err);
      });
  };

  const handleForm = (evt) => {
    //Get target name, it's value and type and checked from field user interacted with
    const { name, value, checked, type } = evt.target;
    //Check if the input was a checkbox, if so set checked state as value, else use the input fields value
    const valueToUse = type === "checkbox" ? checked : value;
    setFormErrors(name, valueToUse);
    setFormData({ ...formData, [name]: valueToUse });
  };

  return (
    <>
      <FormContainer>
        {" "}
        <ErrorContainer>
          <div className="nameError">{errors.name}</div>
          <div className="emailError">{errors.email}</div>
          <div className="passwordError">{errors.password}</div>
          <div className="checkedError">{errors.agree}</div>
          <div className="roleError">{errors.role}</div>
        </ErrorContainer>
        <h1>Sign up</h1>
        <form onSubmit={submit}>
          <label>
            Name
            <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleForm}
            />
          </label>
          <br />
          <label>
            Email
            <br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleForm}
            />
          </label>
          <br />
          <label>
            Password
            <br />
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleForm}
            />
          </label>
          <br />
          <label>
            Role
            <br />
            <select name="role" checked={formData.role} onChange={handleForm}>
              <option value="">--please select a role--</option>
              <option value="Front End Engineer">Front End Engineer</option>
              <option value="Back End Engineer">Back End Engineer</option>
              <option value="UX Designer">UX Designer</option>
            </select>
          </label>
          <h3>Favorite Language</h3>
          <label>
            Python
            <br />
            <input
              type="radio"
              name="bestlanguage"
              value="Python"
              checked={formData.bestlanguage === "Python"}
              onChange={handleForm}
            ></input>
          </label>
          <br />
          <label>
            Java
            <br />
            <input
              type="radio"
              name="bestlanguage"
              value="Java"
              checked={formData.bestlanguage === "Java"}
              onChange={handleForm}
            ></input>
          </label>
          <br />
          <label>
            Node.js
            <br />
            <input
              type="radio"
              name="bestlanguage"
              value="Node.js"
              checked={formData.bestlanguage === "Node.js"}
              onChange={handleForm}
            ></input>
          </label>
          <br />
          <br />
          <label>
            Agree to terms of service
            <br />
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleForm}
            />
          </label>
          <br />
          <button disabled={disabled}>Submit</button>
        </form>
      </FormContainer>
      <UserContainer>
        <div className="headings">
          <h2>Users</h2>
        </div>

        {users.length !== 0 && (
          <pre>
            {JSON.stringify(users, null, "\t").replace(/[[\]{},]/g, "")}
          </pre>
        )}
      </UserContainer>
    </>
  );
}
