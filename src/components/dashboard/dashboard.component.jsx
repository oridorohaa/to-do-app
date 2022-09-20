import "./dashboard.styles.scss";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const [auth, setauth] = useState(null);

  useEffect(() => {
    // SET THIS TO ACTUAL VALUE________________________________
    const loggedInUser = "";
    if (loggedInUser) {
      setauth(loggedInUser);
    }
  }, []);

  if (!auth) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <div className="dashboard-page">
        <h2>Welcome to your Page Sunshine</h2>
      </div>
    );
  }
};

export default Dashboard;
