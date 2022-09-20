import "./login.styles.scss";

import { Fragment, useEffect, useState } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUser,
} from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/button.component";
import { Outlet } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

const LogIn = () => {
  useEffect(() => {
    //on mount use effect runs the call back ones
    // the redirect is based on the auth
    // auth is like a memory bank regardless of where the website is going
    async function x() {
      const response = await getRedirectResult(auth);
      console.log(response);

      // if (response) {
      //   const userDocRef = await createUserDocumentFromAuth(response.user);
      // }
    }
    x();
  }, []);

  const logGoogleUser = async () => {
    //whenever you make a call to some database this will be async
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(user, "user");
  };
  //   const logGoogleRedirectUser = async () => {
  //     //whenever you make a call to some database this will be async
  //     const { user } = await singInWithGoogleRedirect();
  //   };

  //  ------ Handling State Changes --------
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  console.log(formFields);

  //  generic function that will identify which of the
  // inputs is firing off change / which form fields need to be updated in State
  const handleChange = (event) => {
    const { name, value } = event.target;
    // spread out the onces that are not being udated and update the one that is
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUser(email, password);
      console.log(response);

      return (
        <Fragment>
          <h2>hello {email}</h2>
          {/* <Outlet /> */}
        </Fragment>
      );
    } catch (e) {
      if (e.code === "auth/wrong-password") {
        alert("Wrong password. Try again");
      } else {
        console.log("Failed to sign in:", e);
      }
    }
  };

  return (
    <div className="reg-page">
      <div className="register-container">
        {/* <h2>Sign In Page</h2> */}
        {/* <button onClick={logGoogleUser}>Log in with Google Popup</button> */}
        {/* <button onClick={singInWithGoogleRedirect}>
        Sign in wiht Google Redirect
      </button> */}
        <h2>Welcome back! Sign in to your To Do App</h2>
        <div>
          <Button buttonType="google" onClick={logGoogleUser}>
            Continue with Google
          </Button>
        </div>
        <p>or</p>
        <form className="register-form" onSubmit={handleSubmit}>
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
              //   type password hides input field
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
          </div>
          <Button type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
