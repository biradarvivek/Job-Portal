// import React, { useEffect, useState } from "react";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
// import { setSingleJob } from "@/redux/jobSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Navbar from "./shared/Navbar";
// import { toast } from "sonner";

// const JobDescription = () => {
//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.auth);
//   const isIntiallyApplied =
//     singleJob?.applications?.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//   const params = useParams();
//   const jobId = params.id;
//   const dispatch = useDispatch();

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_END_POINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         setIsApplied(true); // Update the local state
//         const updatedSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           ); // Ensure the state is in sync with fetched data
//         } else {
//           dispatch(setSingleJob(null)); // Set to null if no job found
//         }
//       } catch (error) {
//         console.log(error);
//         dispatch(setSingleJob(null));
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);
//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center my-10 px-4">
//         <div className=" w-full max-w-2xl rounded-lg shadow-lg border border-black">
//           <div className="flex flex-col items-center p-4">
//             <h1 className="font-bold text-2xl sm:text-xl md:text-2xl lg:text-3xl">
//               {singleJob?.title}
//             </h1>
//             <div className="flex flex-wrap gap-2 mb-10">
//               <Badge className={"text-blue-700 font-bold"} variant="ghost">
//                 {singleJob?.position} postions
//               </Badge>
//               <Badge className={"text-blue-700 font-bold"} variant="ghost">
//                 {singleJob?.jobType}
//               </Badge>
//               <Badge className={"text-blue-700 font-bold"} variant="ghost">
//                 {singleJob?.salary}LPA
//               </Badge>
//             </div>
//           </div>
//           <hr />
//           <h1 className="border-b-2 border-b-gray-300 font-medium py-4 px-4 text-lg md:text-xl">
//             Job Description
//           </h1>
//           <div className="p-5 flex flex-col gap-2 text-sm md:text-base">
//             <h1 className="font-bold my-1">
//               Role:{" "}
//               <span className="pl-2 font-normal text-gray-800">
//                 {singleJob?.title}
//               </span>
//             </h1>
//             <h1 className="font-bold my-1">
//               Location:{" "}
//               <span className="pl-2 font-normal text-gray-800">
//                 {singleJob?.location}
//               </span>
//             </h1>
//             <h1 className="font-bold my-1">
//               Description:{" "}
//               <span className="pl-2 font-normal text-gray-800">
//                 {singleJob?.description}
//               </span>
//             </h1>
//             <h1 className="font-bold my-1">
//               Experience:{" "}
//               <span className="pl-2 font-normal text-gray-800">
//                 {singleJob?.expreience} yrs
//               </span>
//             </h1>
//             <h1 className="font-bold my-1">
//               Salary:{" "}
//               <span className="pl-2 font-normal text-gray-800">
//                 {singleJob?.salary}LPA
//               </span>
//             </h1>
//             <h1 className="font-bold my-1">
//               Total Applicants:{" "}
//               <span className="pl-2 font-normal text-gray-800">
//                 {singleJob.applications?.length}
//               </span>
//             </h1>
//             <h1 className="font-bold my-1">
//               Posted Date:{" "}
//               <span className="pl-2 font-normal text-gray-800">
//                 {singleJob?.createdAt.split("T")[0]}
//               </span>
//             </h1>
//           </div>
//           <div className="text-center m-5">
//             <Button
//               onClick={isApplied ? null : applyJobHandler}
//               disabled={isApplied}
//               className={`rounded-lg ${
//                 isApplied
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-[#7209b7] hover:bg-[#5f32ad]"
//               } `}
//             >
//               {isApplied ? "Already Applied" : "Apply Now"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobDescription;

import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";
import Footer from "./Footer";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        } else {
          dispatch(setSingleJob(null)); // Set to null if no job found
        }
      } catch (error) {
        console.log(error);
        dispatch(setSingleJob(null));
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  if (!singleJob) {
    return <div>Job not found</div>; // Display an error message if the job is not found
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center my-10 px-4">
        <div className="w-full max-w-2xl rounded-lg shadow-lg border border-black">
          <div className="flex flex-col items-center p-4">
            <h1 className="font-bold text-2xl sm:text-xl md:text-2xl lg:text-3xl">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-10">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.position} positions
              </Badge>
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>
          <hr />
          <h1 className="border-b-2 border-b-gray-300 font-medium py-4 px-4 text-lg md:text-xl">
            Job Description
          </h1>
          <div className="p-5 flex flex-col gap-2 text-sm md:text-base">
            <h1 className="font-bold my-1">
              Role:{" "}
              <span className="pl-2 font-normal text-gray-800">
                {singleJob?.title}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Location:{" "}
              <span className="pl-2 font-normal text-gray-800">
                {singleJob?.location}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Description:{" "}
              <span className="pl-2 font-normal text-gray-800">
                {singleJob?.description}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Experience:{" "}
              <span className="pl-2 font-normal text-gray-800">
                {singleJob?.experience} yrs
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Salary:{" "}
              <span className="pl-2 font-normal text-gray-800">
                {singleJob?.salary}LPA
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Total Applicants:{" "}
              <span className="pl-2 font-normal text-gray-800">
                {singleJob?.applications?.length || 0}
              </span>
            </h1>
            <h1 className="font-bold my-1">
              Posted Date:{" "}
              <span className="pl-2 font-normal text-gray-800">
                {singleJob?.createdAt?.split("T")[0]}
              </span>
            </h1>
          </div>
          <div className="text-center m-5">
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              } `}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDescription;
