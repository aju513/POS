import React from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import DashboardTable from "../../components/table/DashboardTable";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="orders" />
          <Widget type="earnings" />
          <Widget type="orders" />
        </div>
        <div className="charts">
          <Featured />
          <Chart />
        </div>
        <DashboardTable />
      </div>
    </div>
  );
};

export default Home;
