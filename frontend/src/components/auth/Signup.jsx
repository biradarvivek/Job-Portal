import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHnadler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res?.data?.success) {
        navigate("/login");
        toast.success(res.data.message);
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Network error or CORS issue."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="h-[674px] bg-[#D9AFD9] bg-gradient-to-b from-[#D9AFD9] to-[#97D9E1] flex items-center justify-center mx-auto">
          <form
            onSubmit={submitHandler}
            className="w-full mx-10 border border-gray-200 rounded-lg p-4 my-10 md:w-1/3"
          >
            <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>
            <div className="my-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="enter full name"
              />
            </div>
            <div className="my-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="enter email id"
              />
            </div>
            <div className="my-2">
              <Label>Phone Number</Label>
              <Input
                type="number"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="enter phoneNumber"
              />
            </div>
            <div className="my-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="enter password"
              />
            </div>
            <div>
              <RadioGroup className=" flex items-center my-5 gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">recruiter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHnadler}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-center">
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
                  Signup
                </Button>
              )}
            </div>
            <span className="flex justify-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className=" text-blue-500">
                Login
              </Link>{" "}
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
