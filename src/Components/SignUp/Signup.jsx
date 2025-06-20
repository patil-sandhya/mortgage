'use client'
import { useAlertAndLoader } from "@/app/layout";
import ApiSercies from "@/Services/CommonApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import LoginForm from "./LoginForm";
import { Eye, EyeOff, Heart, Bed, Bath, Maximize, Star } from "lucide-react"

const Signup = () => {
 

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-center  lg:jus  p-8 bg-white">
        <div className="w-full pt-10 pb-10 max-w-md space-y-8">
          {/* Logo */}
          <div className="flex  mb-10 sm:mb-16 items-center justify-center lg:justify-start space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-2xl font-semibold text-center text-gray-900">MortgagePro</span>
          </div>

          {/* Welcome Section */}
          <div>
   <LoginForm />

          </div>

          {/* Form */}
          
        </div>
         
      </div>
      <div className="flex-1 relative bg-[#f8f7fe] overflow-hidden">
        {/* Background Geometric Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary transform rotate-45 translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e0def8] transform rotate-45 -translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/4 right-1/4 w-44 h-44 bg-[#0f0a54] transform rotate-45"></div>
        </div>

        {/* Property Card */}
        <div className="relative z-10 flex items-center justify-center h-full p-8">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              <div className="aspect-video p-4 relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
                  alt="Beverly Springfield House"
                  // fill
                  className="object-cover rounded-md"
                />
              </div>
              {/* <div className="absolute top-4 left-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-600 text-white">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  POPULAR
                </span>
              </div> */}
              <button className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="p-4 ">
              <div className="p-4 text-center flex font-semibold">
                From application to approval, we've got you covered ✅
Smart mortgage solutions, built around you 🏡💡
              </div>
             

            
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative sm:absolute bottom-0 p-4 mt-10  z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-600">Powered by</span>
            <div className="flex items-center space-x-1">
             
              {/* <div className="w-4 h-4 bg-primary rounded-md flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div> */}
              <span className="text-sm font-semibold text-gray-700">MortgagePro</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            You agree to MortgagePro's{" "}
            <a href="#" className="text-purple-600 mr-1 hover:underline">
              Terms of Use & Privacy Policy
            </a>
            You don't need to consent as a condition of renting any property, or buying any other goods or services.
            Message/data rates may apply.
          </p>
        </div>
      </div>
   </div>
  )
}

export default Signup