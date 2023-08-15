import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../../module-common/ErrorMessage/ErrorMessage";
import Loading from "../../module-common/Loading/Loading";
import { register } from "../../react-redux/actions/userActions";
import "./Signup.css";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  //const [usename, setName] = useState("");
  // const [fullname, setFullname] = useState("Anonymous");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState(null);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister) || {};
  const { loading, error, userInfo } = userRegister;

  const history = useHistory();
  //If register action success then redirect to homepage

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password do not match!");
    } else {
      dispatch(register(userName, email, password));
      //setMessage("Sign Up Success!");
    }
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <div>
      <div className="d-flex align-item-center justify-content-center container">
        <div className="w-100 w-400 ">
          <div className="logo header-logo">
            <Link to="/">
              <img
                className="logoImg"
                src="https://thumbs.dreamstime.com/b/simple-vector-filled-flat-amazon-icon-logo-solid-black-pictogram-isolated-white-background-amazon-logo-159029074.jpg"
                alt="amazon-logo"
              />
            </Link>
          </div>
          <div className="card ">
            <div className="card-body ">
              <h2 className="text-center mb-4 font-300">Sign Up</h2>
              {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
              {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              {loading && <Loading />}
              <form
                onSubmit={submitHandler}
                className="align-item-center justify-content-center text-center"
              >
                <div className="form-group">
                  <label className="text-left font-200">User Name</label>
                  <input
                    type="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-left font-200">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-left font-200">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-left font-200">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="w-100 btn">
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          <div className="text-center w-100 mt-2 font-150">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
