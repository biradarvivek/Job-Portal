// import React, { useState } from "react";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// import { Button } from "./ui/button";
// import { Contact, Mail, Pen } from "lucide-react";
// import AppliedJobTable from "./AppliedJobTable";
// import UpdateProfileDialog from "./UpdateProfileDialog";
// import Navbar from "./shared/Navbar";
// import { useSelector } from "react-redux";

// // const skills = ["html", "css", "javascript", "django"];
// const isResume = true;

// const Profile = () => {
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   console.log(user?.profile?.resume);
//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col gap-5 lg:flex-row justify-center px-4 lg:px-6">
//         <div className="flex relative flex-col mt-5 ml-24 items-center p-6 w-full lg:w-[25vw] h-auto lg:h-[85vh] bg-white rounded-xl shadow-lg">
//           <Button
//             onClick={() => setOpen(true)}
//             className="absolute top-2 right-2"
//             variant="outline"
//           >
//             <Pen />{" "}
//           </Button>
//           <Avatar className="w-32 h-32 mb-4">
//             <AvatarImage
//               src="https://e7.pngegg.com/pngimages/421/506/png-clipart-google-logo-google-home-alphabet-inc-google-company-trademark.png"
//               alt="profile"
//             />
//           </Avatar>
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-blue-500">
//               {user?.fullname}
//             </h1>
//             <p className="text-gray-600">FullStack Developer</p>
//             <p className="mt-4 text-gray-500">{user?.profile.bio}</p>
//           </div>
//           <div className="w-full">
//             <div className="mt-10 flex flex-col gap-3 mb-10">
//               <div className="flex items-center gap-3">
//                 <Mail />
//                 <span>{user?.email}</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Contact />
//                 <span>{user?.phoneNumber}</span>
//               </div>
//             </div>
//             <h2 className="text-lg font-bold text-gray-700">Skills</h2>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {user?.profile?.skills.length !== 0 ? (
//                 user?.profile?.skills.map((skill, index) => (
//                   <Badge
//                     key={index}
//                     className="text-sm font-medium bg-gray-200 text-gray-700"
//                   >
//                     {skill}
//                   </Badge>
//                 ))
//               ) : (
//                 <span>Na</span>
//               )}
//             </div>
//           </div>
//           <div className="mt-6 w-full">
//             <h2 className="text-lg font-bold text-gray-700">Resume</h2>
//             {isResume ? (
//               <a
//                 target="_blank"
//                 className="text-blue-500 w-full cursor-pointer hover:underline"
//                 rel="noopener noreferrer"
//                 href={user?.profile?.resume}
//               >
//                 {user?.profile?.resumeOriginalName}
//               </a>
//             ) : (
//               <span>NA</span>
//             )}
//           </div>
//         </div>

//         <div className="flex relative flex-col mt-5 p-4 w-full lg:w-[100vh] h-auto lg:h-[85vh] bg-white rounded-xl shadow-lg overflow-scroll">
//           <h1 className="font-bold text-xl m-4">Applied jobs</h1>
//           <hr />
//           <AppliedJobTable />
//         </div>
//       </div>
//       <UpdateProfileDialog open={open} setOpen={setOpen} />
//     </>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import Footer from "./Footer";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const isResume = user?.profile?.resume ? true : false;

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-5 justify-center px-4 lg:px-0">
        <div className="flex relative flex-col mt-5 items-center p-6 w-full lg:w-[25vw] h-auto lg:h-[85vh] bg-white rounded-xl shadow-lg">
          <Button
            onClick={() => setOpen(true)}
            className="absolute top-2 right-2"
            variant="outline"
          >
            <Pen />
          </Button>
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage
              src="https://e7.pngegg.com/pngimages/421/506/png-clipart-google-logo-google-home-alphabet-inc-google-company-trademark.png"
              alt="profile"
            />
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-500">
              {user?.fullname}
            </h1>
            <p className="text-gray-600">FullStack Developer</p>
            <p className="mt-4 text-gray-500">{user?.profile.bio}</p>
          </div>
          <div className="w-full">
            <div className="mt-10 flex flex-col gap-3 mb-10">
              <div className="flex items-center gap-3">
                <Mail />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Contact />
                <span>{user?.phoneNumber}</span>
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-700">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="text-sm font-medium bg-gray-200 text-gray-700"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span>Na</span>
              )}
            </div>
          </div>
          <div className="mt-6 w-full">
            <h2 className="text-lg font-bold text-gray-700">Resume</h2>
            {isResume ? (
              <a
                target="_blank"
                className="text-blue-500 w-full cursor-pointer hover:underline"
                rel="noopener noreferrer"
                href={user?.profile?.resume}
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="flex relative flex-col mt-5 p-4 w-full lg:w-[100vh] h-auto lg:h-[85vh] bg-white rounded-xl shadow-lg overflow-scroll">
          <h1 className="font-bold text-xl m-4">Applied jobs</h1>
          <hr />
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </>
  );
};

export default Profile;
