"use client";
import { useAlertAndLoader } from "@/app/layout";
import { useAuth } from "@/context/AuthContext/AuthContext";
import {
  Phone,
  Star,
  Send,
  Users,
  ArrowRight,
  List,
  LogOut,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const ProfileDropDown = ({ userDetails, closeFunc }) => {
  const { handleUserLogout } = useAuth();
  const { setAlert, setLoading } = useAlertAndLoader();
  const dropdownRef = useRef(null);
  const router = useRouter();
  const handelLogout = () => {
    handleUserLogout();
    setAlert("success", "Successfully Logout");
    router.push("/sign-up");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeFunc();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeFunc]);

  return (
    <>
      <div
        ref={dropdownRef}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        autoFocus
        tabIndex={-1}
        className="absolute z-[1] w-[300px] -translate-x-[80%] translate-y-[58%] rounded-lg border-2 bg-white text-sm shadow-xl "
      >
        <div className="flex items-center gap-2 border-b p-5">
          <div className="w-[30%]">
            <div className="box-content flex h-[30px] w-[30px]  items-center justify-center rounded-full font-semibold bg-gradient-to-r from-[#e6e5fa] to-[#aaa6f8] p-2 capitalize text-gray-700">
              {userDetails?.name[0]}
            </div>
          </div>
          <div className="flex-start text-gray-800 flex w-full  flex-col">
            <div className="break-all  font-medium">{userDetails?.name}</div>
          </div>
        </div>
        <ul className="mt-2 text-base text-gray-700 " role="menuitem">
          <li role="menuitem">
            <div
              // onClick={handelLogout}
              className="flex w-full cursor-default items-center gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <Users /> {userDetails.role}
            </div>
          </li>
          <li role="menuitem">
            <button
              onClick={handelLogout}
              className="flex w-full items-center gap-3 px-5 py-3 hover:bg-gray-100"
            >
              <LogOut /> Logout
            </button>
          </li>
        </ul>

        {/* <p className="p-2 text-xs "> USER ID: 34565 </p> */}
      </div>
    </>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("records");
  const [showProfile, setShowProfile] = useState(false);
  const { isLoggedIn, userData } = useAuth();
    const pathName = usePathname();

  const handleActiveTab = (val)=>{
    setActiveTab(val)
  }

  useEffect(()=>{
    if(pathName.startsWith('/admin/dashboard')){
      setActiveTab('records')
    }else
     if(pathName.startsWith('/admin/batch')){
      setActiveTab('batch')
    }else
     if(pathName.startsWith('/admin/logs')){
      setActiveTab('logs')
    }else
     if(pathName.startsWith('/user/user-records')){
      setActiveTab('userorders')
    }else{
      setActiveTab("Home")
    }
  },[pathName])

  return (
    <>
      <nav className="border-b bg-primary text-white border-gray-100 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div> */}
            <span className="text-xl font-semibold text-white">
              MortgagePro
            </span>
          </div>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center space-x-6">
            {userData?.role == "VA" ? (
              <>
                <Link
                  href="/user/user-records"
                  onClick={()=> handleActiveTab("userorders")}
                  className={`relative group px-4 py-2 shadow-inner rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-primary ${
                    activeTab === "userorders"
                      ? "text-primary bg-white"
                      : "text-textClr"
                  }`}
                >
                  Records
                </Link>
                <Link
                  href="#"
                  className={`relative group px-4 py-2 shadow-inner rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-primary ${
                    activeTab === "about"
                      ? "text-primary bg-white"
                      : "text-textClr"
                  }`}
                >
                  About
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/admin/dashboard"
                  onClick={()=> handleActiveTab("records")}
                  className={`relative group px-4 py-2 shadow-inner rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-primary ${
                    activeTab === "records"
                      ? "text-primary bg-white"
                      : "text-textClr"
                  }`}
                >
                  Records
                </Link>
                <Link
                  href="/admin/batch"
                  onClick={()=> handleActiveTab("batch")}
                  className={`relative group px-4 py-2 shadow-inner rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-primary ${
                    activeTab === "batch"
                      ? "text-primary bg-white"
                      : "text-textClr"
                  }`}
                >
                  Batch
                </Link>
                 <Link
                  href="/admin/logs"
                  onClick={()=> handleActiveTab("logs")}
                  className={`relative group px-4 py-2 shadow-inner rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-primary ${
                    activeTab === "logs"
                      ? "text-primary bg-white"
                      : "text-textClr"
                  }`}
                >
                  Logs
                </Link>
              </>
            )}

            <div
              onBlur={() => setShowProfile(false)}
              onClick={() => setShowProfile(!showProfile)}
              className="relative flex cursor-pointer items-center gap-1.5 rounded-full"
            >
              {showProfile && (
                <ProfileDropDown
                  userDetails={userData}
                  closeFunc={() => setShowProfile(false)}
                />
              )}
              <span className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#e6e5fa] to-[#aaa6f8]  p-3 text-center font-semibold capitalize text-gray-700">
                {userData?.name[0]}
              </span>
              <ArrowRight className="rotate-90" />
            </div>
          </div>

          {/* Mobile Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white  hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="container mx-auto px-4 py-4">
              <div
                onBlur={() => setShowProfile(false)}
                onClick={() => setShowProfile(!showProfile)}
                className="relative flex cursor-pointer items-center gap-1.5 rounded-full"
              >
                <span className="flex h-[50px] my-4 w-[50px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#e6e5fa] to-[#aaa6f8]  p-3 text-center font-semibold capitalize text-gray-700">
                  {userData?.name[0]}
                </span>
                <span className="ml-2 text-gray-700">
                  {userData.name} ({userData.role})
                </span>
              </div>
              <nav className="flex flex-col  p-2 space-y-4">
                <Link
                  href="#"
                  className="text-gray-600 flex gap-4 hover:text-gray-900 transition-colors py-2 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <List /> Records
                </Link>
                <Link
                  href=""
                  className="text-gray-600 flex gap-4 hover:text-gray-900 transition-colors py-2 border-b border-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogOut /> Logout
                </Link>
              </nav>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
