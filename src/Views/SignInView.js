import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../Components/Navbar/Navbar";
import SignIn from "../Components/Auth/Signin";

export default function SigninView() {
  return (
    <div>
      <NavBar />
      <SignIn />
    </div>
  );
}
