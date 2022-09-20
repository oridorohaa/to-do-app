import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import Home from "./routes/home/home.component";
import LogIn from "./routes/login/login.component";
import Register from "./routes/register/register.component";
import Dashboard from "./components/dashboard/dashboard.component";

const Navigation = () => {
  return (
    // <div>
    // instead of wrapping in a div can wrap in a Fragment
    // goes from "root" right into the "navigation-container" without extra divs
    <Fragment>
      <div className="navigation-container">
        <Link className="welcome-link" to="/">
          Welcome to To Do App
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/login">
            LogIn
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
    // </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="login" element={<LogIn />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="dashboard" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
