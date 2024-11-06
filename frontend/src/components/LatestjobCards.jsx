import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestjobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/description/${job?._id}`)}
        className="p-2 w-full md:w-11/12 sm:w-full rounded-2xl shadow-xl bg-white border border-gray-300 cursor-pointer"
      >
        <div className="w-full bg-orange-300 rounded-xl p-6 border border-gray-400">
          <div>
            <h1 className="font-medium text-lg">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">India</p>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">{job?.title}</h1>
            <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
              {job?.description}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {job?.position} positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {job?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {job?.salary}LPA
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestjobCards;
