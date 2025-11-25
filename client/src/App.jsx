import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Faq from "./components/Faq/Faq";
import Login from "./components/Login/Login";
import EmpLog from "./pages/Emp-login/EmpLog";
import StdLog from "./pages/Std-Login/StdLog";
import Landing from "./components/Landing/Landing";
import SignUp from "./components/SignUp/SignUp";
import SeekHm from "./pages/JobSeeker/SeekerHome/SeekHm";
import Mentorship from "./pages/Mentorship/Mentorship";
import MentorLogin from "./pages/Mentorship/MentorLogin";
import Internship from "./pages/JobSeeker/internshipPg/Internship";
import JobPg from "./pages/JobSeeker/JobPg/JobPg";
import Jobs from "./components/Jobs/Jobs";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Job from "./components/job/Job";
import Companies from "./pages/Provider/Companies";
import CompanyCreate from "./pages/Provider/CompanyCreate";
/* import CompanySetup from "./pages/Provider/CompanySetup";
 */ import PostJob from "./pages/Provider/PostJob";
import Applicants from "./pages/Provider/Applicants";
import AdminJobs from "./pages/Provider/AdminJobs";
import Browse from "./components/Browse";
import ProtectedRoute from "./pages/Provider/ProtectedRoute";
/* import ProtectedRoute from "./pages/Provider/ProtectedRoute"; */
import ResourcesHm from "./pages/JobSeeker/resources/ResourcesHm";
import Resume from "./pages/JobSeeker/resources/Resume/Resume";
import Roadmap from "./pages/JobSeeker/resources/Roadmap";
import FrontedRoadmap from "./pages/JobSeeker/resources/FrontendRoadmap";
import ExamSection from "./pages/JobSeeker/resources/ExamSection";
import EmailVerification from "./components/SignUp/EmailVerification";
import CandidateRecommend from "./components/Recommendations/CandidateRecommend";
import JobRecommend from "./components/Recommendations/JobRecommend";
import MentorProfile from "./pages/Mentorship/MentorProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/emplogin" element={<EmpLog />} />
        <Route path="/stdlogin" element={<StdLog />} />
        <Route path="/mentorlogin" element={<MentorLogin />} />
        <Route path="/jobseeker" element={<SeekHm />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/mentorProfile" element={<MentorProfile />} />
        <Route path="/internships" element={<Internship />} />
        <Route path="/jobpg" element={<JobPg />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDescription />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job" element={<Job />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/resources" element={<ResourcesHm />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/test-series" element={<ExamSection />} />
        <Route path="/roadmaps" element={<Roadmap />} />
        <Route path="/frontend" element={<FrontedRoadmap />} />
        <Route path="/verify/:token" element={<EmailVerification />} />
        {/* provider */}
        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            <ProtectedRoute>
              <CompanyCreate />
            </ProtectedRoute>
          }
        />
        {/*    <Route
          path="/admin/companies/:id"
          element={
            <ProtectedRoute>
              <CompanySetup />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:id/applicants"
          element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          }
        />
        <Route path="/recommendations/:id" element={<CandidateRecommend />} />
        {/* <Route path="/recommendations/:id" element={<JobRecommend />} /> */}
        {/*         <Route path="/recommendations/:id" element={<CandidateRecommend />} />
         */}{" "}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
