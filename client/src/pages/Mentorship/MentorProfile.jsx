import React from "react";
import "./MentorProfile.css";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Pen } from "lucide-react";

const MentorProfile = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="mentor-profile">
      {/* Header Section */}
      <header className="header">
        <div className="head-upper">
          <div className="profiledialog">
            <img
              src="https://via.placeholder.com/120"
              alt="Mentor"
              className="profile-pic"
            />{" "}
          </div>
          <h1>Surja Sen Das Raj</h1>
          <Pen className="pen" />
        </div>
        <div className="head-lower">
          {" "}
          <p>Product Designer | 5+ years experience | ⭐ 4.1</p>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section">
        <h2>About</h2>
        <p>
          Experienced Product Designer dedicated to creating intuitive, elegant
          user experiences. Skilled in translating complex requirements into
          engaging designs with seamless flows. Passionate about empowering
          users through human-centric designs.Experienced Product Designer
          dedicated to creating intuitive, elegant user experiences. Skilled in
          translating complex requirements into user-centered designs, with
          expertise across the design lifecycle from research to testing. Known
          for attention to detail, strong problem-solving, and a keen aesthetic
          eye. Passionate about empowering users through innovative design and
          eager to contribute to products that enrich lives.
        </p>
      </section>
      {/* Expertise section  */}
      <section className="expertise-section">
        <h2>Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {" "}
          {user?.profile?.skills?.length ? (
            user?.profile?.skills.map((item, index) => (
              <Badge key={index} className="bg-blue-100 text-blue-800 text-xl">
                {item}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">
              <Badge>No skills added.</Badge>
            </span>
          )}
        </div>{" "}
        {/* <div className="tags">
          <span>Product Design</span>
          <span>UI/UX</span>
          <span>Wireframing</span>
        </div> */}
      </section>

      {/* Education Section */}
      <section className="education-section">
        <h2>Education</h2>
        <p className="place">Metropolitan University, Sylhet</p>
        <p className="course">
          {" "}
          Bachelor of Science in Computer Science & Engineering
        </p>
        <p className="year">2011-2015</p>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <h2>Experience</h2>
        <div className="experience-item">
          <h3>Product Design Lead, Commerce</h3>
          <p>GoDesyn - Payment Gateways</p>
          <p>
            Product Design Lead of GoDesyn's Smart Terminal POS team (App side &
            Payment code experience).
          </p>
        </div>
      </section>
      <div className="secondhalf">
        {/* Services Section */}
        <section className="services-section">
          <h2>Services</h2>
          <div className="service-cards">
            <div className="service-card">
              UI/UX Roadmap
              <div>
                Counselling<span>60 mins</span>
              </div>
              <button>Book Now</button>
            </div>
            <div className="service-card">
              UI/UX Roadmap
              <div>
                Counselling<span>60 mins</span>
              </div>{" "}
              <button>Book Now</button>
            </div>
            <div className="service-card">
              UI/UX Roadmap{" "}
              <div>
                Counselling<span>60 mins</span>
              </div>
              <button>Book Now</button>
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section className="availability-section">
          <h2>Availability</h2>
          <div className="availability-slots">
            <div>
              <span> MON</span> <br /> 1 Slot
            </div>
            <div>
              <span>SAT </span>
              <br />3 Slots
            </div>
            <div>
              <span>SUN</span> <br />3 Slots
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="reviews-section">
          <h2>Reviews</h2>
          <div className="reviews-box">
            {" "}
            <img
              src="./images/commasReview.png"
              style={{
                marginTop: "-75px",
                marginLeft: "-1150px",
                zIndex: "2",
                position: "absolute",
              }}
            />{" "}
            <div className="review">
              <p>
                <strong>Arpitha S:</strong> The mentor provided an in-depth
                session explaining UI/UX concepts. Highly satisfied with the
                insights shared during the session.
              </p>
            </div>{" "}
            <img
              src="./images/commasReview.png"
              style={{
                marginTop: "-75px",
                marginLeft: "-300px",
                zIndex: "2",
                position: "absolute",
              }}
            />{" "}
            <div className="review">
              <p>
                <strong>Riyans S:</strong> Highly recommend this mentor’s UI/UX
                Roadmap training. It was a game-changer for understanding modern
                design principles and tools.
              </p>
            </div>{" "}
            <img
              src="./images/commasReview.png"
              style={{
                marginTop: "-75px",
                marginLeft: "550px",
                zIndex: "2",
                position: "absolute",
              }}
            />{" "}
            <div className="review">
              <p>
                <strong>Anon:</strong> The session could be improved with more
                focus on practical examples, but overall it covered current
                industry trends.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MentorProfile;
