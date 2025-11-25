import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useGetAllAdminJobs(); // Add this if not already present

  // Redux selector to access job-related data
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job
  );

  // State to hold filtered jobs
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Filter jobs based on search text
  useEffect(() => {
    console.log("allAdminJobs updated:", allAdminJobs);
    console.log("searchJobByText:", searchJobByText);

    // Apply filtering logic
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText.trim()) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    // Set filtered jobs in state
    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  // Loading and error handling UI
  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error.message}</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Handle case where no jobs are found */}
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            // Map through filtered jobs and display them
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.company?.name || "N/A"}</TableCell>
                <TableCell>{job?.title || "N/A"}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
