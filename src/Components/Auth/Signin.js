import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../Actions/authActions";
import "../../css/SignIn.css";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Signin(props) {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errorFromServer = useSelector((state) => state.user.error);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ValidateEmail(Email.toLowerCase()) && checkPwd(password)) {
      dispatch(signin(Email.toLowerCase(), password));
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

  return (
    <div>
      <div id="SignIncontainer">
        <div className="row justify-content-center">
          <div id="SignIn">
            <form onSubmit={handleSubmit} autocomplete="on">
              {errorFromServer === 0 && (
                <Alert variant="danger">
                  Email and\or password are incorrect!
                </Alert>
              )}
              <p id="title">Sign In</p>
              <div className="email-field">
                <input
                  id="email-signin"
                  type="text"
                  className="form-control fix-rounded-right"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user name or email"
                  aria-label="user name or email"
                  aria-describedby="basic-addon1"
                ></input>
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
              <div className="password-field">
                <input
                  id="pass-signin"
                  type="password"
                  className="form-control fix-rounded-right"
                  required
                  placeholder="password:"
                  aria-label="password:"
                  onChange={(e) => setPassword(e.target.value)}
                  aria-describedby="basic-addon2"
                ></input>
                <div className="invalid-feedback">
                  Please enter your password.
                </div>
              </div>
              <div className="row">
                <a id="forgot" href="/ForgotPass">
                  Forgot password?
                </a>
              </div>
              <div className="row">
                <button className="SignInButton" type="submit">
                  Signin
                </button>
              </div>
              <div className="row">
                <div className="need-acc-txt">
                  Need an account? <a href="/SignUp">Sign-Up</a>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signin;
