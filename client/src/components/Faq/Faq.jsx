import React, { useEffect, useState } from "react";
import "./Faq.css";
import { questions } from "../faqQuestion";
import Navbar from "../Navbar/Navbar";

function Faq() {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container" id="faq">
        {/* FAQ Section */}
        <Navbar />
        <div className="faq-heading">
          <img src="./images/Group 24 (1).png" alt="faq" />
        </div>
        <div className="faq-wrap">
          <div className="accordion">
            {questions.map((item, i) => (
              <div className="item" key={i}>
                <div className="faq-title" onClick={() => toggle(i)}>
                  <h3 className="question">{item.question}</h3>
                  <span>{selected === i ? " - " : " + "}</span>
                </div>
                <div className={selected === i ? "answer show" : "answer"}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
          <div className="faq-img">
            <img src="./images/ZenBook Duo 14 (3).png" alt="faqimg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
