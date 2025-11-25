import React from "react";
import Form from "../../components/Login/Form/Form";
import Navbar from "../../components/Navbar/Navbar";
import "./StdLog.css";
import Globe from "../../components/Login/Globe/Globe";

const EmpLog = () => {
  return (
    <>
      <div className="log-nav">
        <Navbar />
      </div>
      <div className="stdlog-page" id="stdlog">
        <div className="yellow-gradient" />
        <div className="stdlog-container">
          <div className="sec">
            <div className="head-sec">
              Welcome to
              <h1>Internova</h1>
              <div className="para-sec" style={{ fontSize: "26px" }}>
                Join us to <span style={{ color: "#e4c61b" }}>Unlock </span>your
                Potential !
              </div>
            </div>
            {/* globe */}
            <div className="globe-container">
              <Globe className="globe-wrapper" />
            </div>
          </div>
          <div className="sec">
            <Form role="student" />
          </div>
        </div>
        <div className="violet-gradient" />
      </div>
    </>
  );
};

export default EmpLog;
