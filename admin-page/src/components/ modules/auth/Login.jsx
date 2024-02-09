import axios from "axios";
import React, { useEffect, useState } from "react";
import Constants from "../../../Constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${Constants.BASE_URL}/login`, input)
      .then((res) => {
        localStorage.email = res.data.email;
        localStorage.name = res.data.name;
        localStorage.photo = res.data.photo;
        localStorage.phone = res.data.phone;
        localStorage.token = res.data.token;
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
          console.log(errors);
        }
      });
  };
  useEffect(() => {
    if (localStorage.token !== undefined) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="d-flex justify-content-center flex-nowrap">
        <form className="container">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={input.email}
              onChange={handleInput}
            />
            <p className="login-error-msg danger">
              <small>
                {errors["email"] !== undefined ? errors["email"] : ""}
              </small>
            </p>
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleLogin}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
