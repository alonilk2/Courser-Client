import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/signup.css";
import { signup } from "../../Actions/authActions";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";

function Signup(props) {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [Firstname, setFirstName] = useState("");
  const [Lastname, setLastName] = useState("");
  const [ID, setId]= useState("") 
  const errorFromServer = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      ValidateEmail(Email.toLowerCase()) &&
      checkPwd(password) &&
      checkNames(Firstname) &&
      checkNames(Lastname) && ID
    ) {
      if (password === password1) {
        dispatch(
          signup(Email.toLowerCase(), password, Firstname, Lastname, ID)
        );
        alert("Account signed up successfully, please login.");
        history.push("/signin")
      } else {
        alert("The passwords do not match");
        return false;
      }
    }
  };

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
        mail
      )
    )
      return true;
    else if (
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\.[a-zA-Z0-9-]+)$/.test(
        mail
      )
    )
      return true;
    alert("You have entered an invalid email address!");
    return false;
  }

  function checkPwd(str) {
    if (str.length < 6) {
      alert("Too short");
      return false;
    } else if (str.search(/\d/) === -1) {
      alert("No num");
      return false;
    } else if (str.search(/[a-zA-Z]/) === -1) {
      alert("no chars");
      return false;
    }
    return true;
  }

  function checkNames(str) {
    if (str.length < 1) {
      alert("Too short");
      return false;
    } else if (str.search(/[a-zA-Z]/) === -1) {
      alert("no chars");
      return false;
    } else if (str.search(/[0-9]/) !== -1) {
      alert("you cannot write number at your name");
      return false;
    }
    return true;
  }

  return (
    <div>
      <div id="SignUpcontainer">
        <div className="row justify-content-center">
          <div id="SignUp">
            <form onSubmit={handleSubmit}>
              {errorFromServer === 0 && (
                <Alert variant="danger">
                  Email is already used. Please write another email address.
                </Alert>
              )}
              <p id="title">Sign Up</p>
              <input
                id="Firstname"
                type="text"
                className="form-control fix-rounded-right"
                required
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter Firstname"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              ></input>
              <div className="invalid-feedback">Please choose a Firstname.</div>
              <input
                id="Lastname"
                type="text"
                className="form-control fix-rounded-right"
                required
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Lastname"
                aria-label="Lastname"
                aria-describedby="basic-addon1"
              ></input>
              <div className="invalid-feedback">Please choose a username.</div>
              <input
                id="email"
                type="text"
                className="form-control fix-rounded-right"
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                aria-label="user name or email"
                aria-describedby="basic-addon1"
              ></input>
              <div className="invalid-feedback">Please choose a email.</div>
              <input
                id="password2"
                type="password"
                className="form-control fix-rounded-right"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                aria-label="password:"
                aria-describedby="basic-addon2"
              ></input>
              <div className="invalid-feedback">
                Please enter your password.
              </div>
              <input
                id="password3"
                type="password"
                className="form-control fix-rounded-right"
                required
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Reenter Password"
                aria-label="password:"
                aria-describedby="basic-addon2"
              ></input>
              <div className="invalid-feedback">
                Please enter your password.
              </div>
              <input
                id="ID"
                type="text"
                className="form-control fix-rounded-right"
                required
                onChange={(e) => setId(e.target.value)}
                placeholder="ID Number"
              ></input>
              <div className="invalid-feedback">
                Please enter your ID number.
              </div>
              <div className="row">
                <button className="SignInButton" type="submit">
                  Signup
                </button>
              </div>
              <div className="row">
                <div className="need-acc-txt">
                  Have an account? <a href="/SignIn">Signin</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
