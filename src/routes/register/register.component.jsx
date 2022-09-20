import { useContext, useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";
import "./register.styles.scss";

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  //  ------ Handling State Changes --------
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  //   const { setCurrentUser } = useContext(UserContext);
  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match ");
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      //   clear out the input fields
      resetFormFields();
      console.log(user);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("user creation encountered an error:", e);
      }
    }
  };
  //  generic function that will identify which of the
  //  inputs is firing off change / which form fields need
  //  to be updated in State
  const handleChange = (event) => {
    const { name, value } = event.target;
    // spread out the onces that are not being udated and unpdate the one that is
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="reg-page">
      <div className="register-container">
        {/* <h1>Register Page</h1> */}
        {/* <button onClick={logGoogleUser}>Log in with Google Popup</button> */}
        {/* <button onClick={singInWithGoogleRedirect}>
        Sign in wiht Google Redirect
      </button> */}
        <h2>Register with your email and password</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="group">
            <input
              className="form-input"
              type="text"
              required
              onChange={handleChange}
              //   name has to match the state obj keys
              name="displayName"
              //circular flow ----> input triggers handleChange which updates the state
              //we put the value off the updated state which is what gets diplayed on the UI
              value={displayName}
            />
            <label
              className={`${
                displayName.length ? "shrink" : ""
              } form-input-label`}
            >
              Display Name
            </label>
          </div>
          <div className="group">
            <input
              className="form-input"
              type="email"
              required
              onChange={handleChange}
              name="email"
              value={email}
            />
            <label
              className={`${email.length ? "shrink" : ""} form-input-label`}
            >
              Email
            </label>
          </div>
          <div className="group">
            <input
              className="form-input"
              type="password"
              required
              onChange={handleChange}
              name="password"
              value={password}
            />
            <label
              className={`${password.length ? "shrink" : ""} form-input-label`}
            >
              Password
            </label>
            {/* type password hides input field */}
          </div>
          <div className="group">
            <input
              className="form-input"
              type="password"
              required
              onChange={handleChange}
              name="confirmPassword"
              value={confirmPassword}
            />
            <label
              className={`${
                confirmPassword.length ? "shrink" : ""
              } form-input-label`}
            >
              Confirm Password
            </label>
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
