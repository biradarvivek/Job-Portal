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
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="h-[674px] bg-[#D9AFD9] bg-gradient-to-b from-[#D9AFD9] to-[#97D9E1] flex items-center justify-center">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md border border-gray-200 rounded-lg p-6 my-10 sm:p-8 md:p-10 mx-4 md:mx-0"
          >
            <h1 className="font-bold text-xl mb-5 text-center">Login</h1>
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
                  Login
                </Button>
              )}
            </div>
            <span className="flex justify-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className=" text-blue-500">
                Login
              </Link>{" "}
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
