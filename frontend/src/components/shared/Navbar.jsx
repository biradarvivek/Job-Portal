import { Popover } from "@radix-ui/react-popover";
import React, { useEffect } from "react";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className=" bg-slate-300">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div>
            <Link to="/">
              <h1 className=" text-blue-500 text-2xl font-bold">Job Portal</h1>
            </Link>
          </div>
          <div className="mx-auto hidden md:flex">
            <ul className="flex font-medium  items-center gap-8 md:gap-16">
              {user && user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>

                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className=" bg-teal-700 hover:bg-slate-50 hover:text-black">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex mx-6">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-3 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Vivek Biradar</h4>
                      <p className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-3 ">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">view Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
