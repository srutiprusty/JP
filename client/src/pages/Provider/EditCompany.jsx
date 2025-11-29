import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import JobHeader from "@/components/JobHeader/JobHeader";
import { Loader2 } from "lucide-react";

const EditCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    logo: null,
    employeeCount: "",
  });
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(true);

  // Fetch company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const company = res.data.company;
          setInput({
            companyName: company.companyName || "",
            description: company.description || "",
            website: company.website || "",
            location: company.location || "",
            logo: company.logo || "",
            employeeCount: company.employeeCount || "",
          });
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        toast.error("Failed to load company data");
      } finally {
        setCompanyLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, logo: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Add validation
    if (!input.companyName.trim()) {
      toast.error("Company name is required");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("companyName", input.companyName);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);
      formData.append("employeeCount", input.employeeCount);
      if (input.logo) {
        formData.append("file", input.logo);
      }
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${id}`);
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error(error.response?.data?.message || "Failed to update company");
    } finally {
      setLoading(false);
    }
  };

  if (companyLoading) {
    return (
      <div>
        <JobHeader />
        <div className="flex items-center justify-center w-screen my-5">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading company
          data...
        </div>
      </div>
    );
  }

  return (
    <div>
      <JobHeader />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Edit Company</h1>
          <p className="text-gray-500">Update the details for your company.</p>
        </div>

        <form onSubmit={submitHandler} className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name *</Label>
            <Input
              type="text"
              name="companyName"
              value={input.companyName}
              onChange={changeEventHandler}
              className="my-2"
              placeholder="JobHunt, Microsoft etc."
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="my-2"
              placeholder="Brief description of the company"
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="url"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              className="my-2"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="my-2"
              placeholder="City, Country"
            />
          </div>
          <div>
            <Label>Upload Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              className="my-2"
            />
          </div>
          <div>
            <Label>Employee Count</Label>
            <Input
              type="number"
              name="employeeCount"
              value={input.employeeCount}
              onChange={changeEventHandler}
              className="my-2"
              placeholder="Number of employees"
            />
          </div>
          <div className="col-span-2 flex items-center gap-2 my-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            {loading ? (
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit">Update Company</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
