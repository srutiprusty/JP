import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import JobHeader from "@/components/JobHeader/JobHeader";
import { useNavigate } from "react-router-dom";
const CompanyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          setCompany(res.data.company);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div>
        <JobHeader />
        <div className="max-w-4xl mx-auto my-10">
          <p>Loading company details...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div>
        <JobHeader />
        <div className="max-w-4xl mx-auto my-10">
          <p>Company not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <JobHeader />
      <div className="max-w-4xl mx-auto my-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-2xl">{company.name}</h1>
          <Button onClick={() => navigate(`/admin/companies/${id}/edit`)}>
            Edit Company
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Description:</strong> {company.description || "N/A"}
          </div>
          <div>
            <strong>Website:</strong>{" "}
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            ) : (
              "N/A"
            )}
          </div>
          <div>
            <strong>Location:</strong> {company.location || "N/A"}
          </div>
          <div>
            <strong>Logo:</strong>{" "}
            {company.logo ? (
              <img
                src={company.logo}
                alt="Company Logo"
                className="w-16 h-16"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              "N/A"
            )}
          </div>
          <div>
            <strong>Employee Count:</strong> {company.employeeCount || "N/A"}
          </div>
          {/*  <div>
            <strong>Ratings:</strong> {company.ratings || "N/A"}
          </div> */}
        </div>
        {/* <div className="mt-4">
          <strong>Feedbacks:</strong>
          {company.feedbacks && company.feedbacks.length > 0 ? (
            <ul>
              {company.feedbacks.map((feedback, index) => (
                <li key={index}>{feedback}</li>
              ))}
            </ul>
          ) : (
            "N/A"
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CompanyPage;
