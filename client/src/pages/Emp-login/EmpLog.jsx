import React from "react";
import Form from "../../components/Login/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import "./EmpLog.css";
import Globe from "../../components/Login/Globe/Globe";

const EmpLog = () => {
  return (
    <>
      <div className="log-nav">
        <Navbar />
      </div>
      <div className="emplog-page" id="emplog">
        <div className="yellow-gradient" />
        <div className="emplog-container">
          <div className="sec">
            <Form role="recruiter" />
          </div>
          <div className="sec">
            <div className="head-sec">
              Welcome to
              <h1>Internova</h1>
              <div className="para-sec" style={{ fontSize: "26px" }}>
                Join us to <span style={{ color: "#543E6C" }}>Connect </span>
                more Talents !
              </div>
            </div>
            {/* globe */}

            <div className="globe-container">
              <Globe className="globe-wrapper" />
            </div>
          </div>
        </div>
        <div className="violet-gradient" />
      </div>
    </>
  );
};

export default EmpLog;
