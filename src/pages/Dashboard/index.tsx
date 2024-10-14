import React from "react";
import { Route, Routes } from "react-router-dom";
import { nestedRoutes } from "utils/routesArray";
import './Dashboard.scss'
const Dashboard = () => {
  // State to manage the current month

  return (
    <div className="dashboard-wrapper" >
      <Routes>
        {nestedRoutes.map(route=><Route path={route.path.split("/dashboard/")[1]} element={route.component} />)}
      </Routes>
    </div>
  );
};

export default Dashboard;
