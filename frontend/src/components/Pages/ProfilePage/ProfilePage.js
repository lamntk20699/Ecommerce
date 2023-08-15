import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ErrorMessage from "../../module-common/ErrorMessage/ErrorMessage";

import {
  fetchUserInfo,
  updateUserInfo,
} from "../../react-redux/actions/meActions";
import * as selectors from "../../react-redux/selectors";

import "./ProfilePage.css";

function Profile(props) {
  const { userInfo = {}, fetchUserInfo, updateUserInfo } = props;
  const { name, email, phoneNumber, address } = userInfo;

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const [message, setMessage] = useState("");
  // const dispatch = useDispatch();
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const userUpdate = useSelector((state) => state.userUpdate);
  // const { loading, error, success } = userUpdate;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const isDataChanged = () => {
    return (
      nameRef.current.value !== name ||
      emailRef.current.value !== email ||
      phoneRef.current.value !== phoneNumber ||
      addressRef.current.value !== address
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(
      "name: ",
      nameRef.current.value,
      emailRef.current.value,
      phoneRef.current.value,
      addressRef.current.value
    );
    if (isDataChanged()) {
      setMessage("");
      updateUserInfo(
        nameRef.current.value,
        emailRef.current.value,
        phoneRef.current.value,
        addressRef.current.value
      );
    } else {
      setMessage("Thông tin cá nhân không thay đổi");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="d-flex align-item-center justify-content-center container">
        <div className="w-100 w-400 ">
          <div className="card mt-80">
            <div className="card-body ">
              <h2 className="text-center mb-4 font-300">User Profile</h2>
              {/* {error && <ErrorMessage variant="danger">{error} </ErrorMessage>}
              {!loading && message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              {loading && <Loading />} */}
              {/* {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )} */}
              {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
              <form
                onSubmit={submitHandler}
                className="align-item-center justify-content-center text-center"
              >
                <div className="form-group">
                  <label className="text-left font-200">Fullname</label>
                  <input
                    ref={nameRef}
                    type="text"
                    defaultValue={name}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-left font-200">Email</label>
                  <input
                    ref={emailRef}
                    type="email"
                    defaultValue={email}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-left font-200">Phone Number</label>
                  <input
                    ref={phoneRef}
                    type="text"
                    defaultValue={phoneNumber}
                    maxLength={10}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="text-left font-200">Address</label>
                  <input
                    ref={addressRef}
                    type="text"
                    defaultValue={address}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="w-100 btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

const mapStateToProps = (state) => {
  const userInfo = selectors.meSelector(state);
  return { userInfo };
};

const masDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: () => dispatch(fetchUserInfo()),
    updateUserInfo: (name, email, phoneNumber, address) =>
      dispatch(updateUserInfo({ name, email, phoneNumber, address })),
  };
};

export default connect(mapStateToProps, masDispatchToProps)(Profile);
