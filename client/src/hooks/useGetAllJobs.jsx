import { React, useEffect } from "react";
import axios from "axios";
import { setAllJobs } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
  /*  return { loading: false }; */
};

export default useGetAllJobs;
