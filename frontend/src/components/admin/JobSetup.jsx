import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant"; // Update the API endpoint
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Footer from "../Footer";

const JobSetup = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
  });
  const { singleJob } = useSelector((store) => store.job); // Fetch the job from the redux store
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`, // Use job-specific endpoint
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJob) {
      // Check if singleJob exists
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements || "",
        location: singleJob.location || "",
      });
    }
  }, [singleJob]);

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Job Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full mt-6 mb-2 px-10 bg-green-500">
              <Loader2 className="w-4 mr-2 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 mb-2 px-10 bg-green-500 hover:bg-green-700"
            >
              Update
            </Button>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default JobSetup;
