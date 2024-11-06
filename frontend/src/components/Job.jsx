import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="p-2 rounded-3xl shadow-xl shadow-zinc-400 bg-white border border-gray-200"
      style={{ width: "300px", height: "400px" }} // Fixed width and height
    >
      <div className="w-full bg-orange-300 rounded-3xl p-5 border border-gray-400 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Badge
              className={"text-black bg-slate-50 h-10 w-20 pl-6 font-medium"}
              variant="ghost"
            >
              {daysAgoFunction(job?.createdAt) === 0
                ? "Today"
                : `${daysAgoFunction(job?.createdAt)} days ago`}
            </Badge>
            <Button variant="outline" className="rounded-full" size="icon">
              <Bookmark />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-sm sm:text-md font-medium">
                {job?.company?.name}
              </h1>
              <p className="text-xs sm:text-sm">India</p>
            </div>
          </div>
          <div className="my-4">
            <div className="flex gap-7 justify-between">
              <h1 className="font-semibold text-lg sm:text-xl md:text-2xl">
                {job?.title}
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  className="p-4 sm:p-6 rounded-full"
                  variant="outline"
                  size="icon"
                >
                  <Avatar>
                    <AvatarImage src={job?.company?.logo} />
                  </Avatar>
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-h-8">
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
        <div className="flex items-center justify-around gap-4 mt-4">
          <Button
            onClick={() => navigate(`/description/${job?._id}`)}
            variant="ghost"
            className="border border-black rounded-2xl"
          >
            Details
          </Button>
          <Button className="rounded-3xl bg-teal-700 hover:bg-slate-50 hover:text-black hover:border border-black">
            Save for later
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Job;
