import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).max(15).required(),
});

function Login() {
  const navigate = useNavigate(); //for navigate to another page
  const emailRef = useRef(""); //email ref object
  const passwordRef = useRef(null); //password ref object
  const [validationError, setValidationError] = useState({}); // defining use state for errorHandling which has empty object as initial value

  const submitFormHandler = (e) => {
    e.preventDefault(); //

    const userData = {
      email: emailRef.current.value, //getting email field value in current property
      password: passwordRef.current.value, //getting password field value in current property
    };

    let { error } = schema.validate(userData); //validating userData object using validate method & extract error property using destructure

    if (error) {
      const errors = {};
      error.details.forEach((formErr) => {
        // looping over details array of object of error
        errors[formErr.path[0]] = formErr.message;
      });
      console.log(error.details); //error object
      setValidationError(errors); //updating validationError using updating function which has a "errors" object
    } else {
      navigate("/"); //after successfully submitting the form this function redirect us to home page
      console.log(userData); //print updated value of userData object in console
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={submitFormHandler}
        className="container form-control mt-5 w-50"
      >
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            ref={emailRef}
            id="userName"
            placeholder="name@example.com"
          />
          {validationError.email && (
            <span className="text-danger d-block">{validationError.email}</span>
          )}
        </div>

        <div className="mb-3 ">
          <label className="form-label">Password</label>
          <input type="password" ref={passwordRef} id="password" />
          {validationError.password && (
            <span className="text-danger d-block">
              {validationError.password}
            </span>
          )}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary text-center">
            Sign in
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default Login;
