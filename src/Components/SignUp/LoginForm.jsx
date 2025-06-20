"use client"

import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation";
import { useAlertAndLoader } from '@/app/layout'
import ApiServies from "@/Services/CommonApi";
import { useAuth } from "@/context/AuthContext/AuthContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [type, setType] = useState('signin');
  const [disable, setDisable] = useState(true)
 const [msg, setMsg] = useState('');
  const { setAlert, setLoading } = useAlertAndLoader();
  const {handelUserLogin} = useAuth()

const router = useRouter();
  const [formData, setFormData] = useState({
    name:'',
    password:''
  })
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
 const handleSignup = ()=>{
    if(type == 'signup'){
      setType('signin')
    }else{
      setType('signup')
    }
  }

  const handleRegister = async()=>{
    try {
      setLoading(true)
      let data ={
        username: formData.name,
        password: formData.password,
        role : "VA"
      }
      let res = await ApiServies.post_signUp(data)
      if(res?.status == 201){
        setAlert('success', `You're signed up! Please log in to continue.`)
        setType("signin")
      }
      console.log(res)
    } catch (error) {
      if(error?.response?.data?.message){
        setAlert('error', error?.response?.data?.message)
      }else{
      setAlert('error', 'Error creating account. Please try again later.')
      }
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const handleLogin = async()=>{
    setLoading(true)
    try {
       let data ={
        username: formData.name,
        password: formData.password,
      }
      let res = await ApiServies.post_signIn(data)
      if(res?.status == 201){
        setAlert("success", `Welcome to MortgagePro, ${res?.data?.username}. You’re now logged in`)
        localStorage.setItem('token', res?.data?.access_token);
        localStorage.setItem('role', res?.data?.role);

        handelUserLogin(res?.data?.username,res?.data?.role)
        if(res?.data?.role == 'VA'){
        router.push("/user/user-records")
        }else{
          router.push("/admin/dashboard")
        }
      }
      console.log(res)
    } catch (error) {
     if(error?.response?.data?.message){
        setAlert('error', error?.response?.data?.message)
      }else{
      setAlert('error', 'Error creating account. Please try again later.')
      }
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let res = validateFields();
    if(res == true){
      if(type == 'signup'){
        handleRegister()
      }else{
        handleLogin()
      }
    }  
    // console.log("Form submitted:", { email, password })
  }

    const isStrongPassword = (password) => {
    // At least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]{8,}$/;
    return passwordRegex.test(password);
  };

   const validateFields = () => {
    if (
      (formData.name.length > 3) &&
      isStrongPassword(formData.password)
    ) {
      return true;
    } else {
      let newMsg = '';
      if (formData.name.length < 3) {
        newMsg += 'Enter a valid username. ';
      }
      if (!isStrongPassword(formData.password)) {
        newMsg += `Password should contain -
         At least one uppercase letter (A-Z), 
         one lowercase letter(a-z), 
         one number (0-9), 
         one special character (! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~) & minimum length 8.`;
      }
      setMsg(newMsg.trim());
      return false;
    }
  };



  useEffect(()=>{
    if(formData.name?.trim() && formData.password?.trim()){
     setDisable(false)
    }else{
     setDisable(true)
    }
  },[formData])

  return (
    <div>
       <div className="space-y-2 ">
            <h1 className="text-3xl font-bold text-gray-900">
              {
                type == "signup" ? "Welcome Aboard!" : "Welcome back"
              }
              </h1>
            <p className="text-gray-600">
              {
                type == "signup" ? "Create your account to get started." : "Log in to access your account"
              }
              </p>
          </div>
    
    <div className=" mt-4 ">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e)=>{
                    setFormData((prev)=>({
                      ...prev, name:e.target.value
                    }))
                  }}
              className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="Enter user name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e)=>{
                    setFormData((prev)=>({
                      ...prev, password:e.target.value
                    }))
                  }}
                className="w-full px-3 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
{msg.length > 0 && (
                <div className="text-md rounded-md mt-5 flex cursor-pointer bg-[#e0def8] p-4 text-center text-gray-500">
                  {msg}
                </div>
              )}
          <div onClick={handleSignup} className="flex justify-end">
             {
                (type == 'signup') ? (
                  <>
                    <span className="text-primary cursor-pointer text-textClr ml-1 ">Already have an account? Log In</span>
                  </>
                ) : (
                  <>
                    <span className=" text-primary cursor-pointer text-textClr ml-1 ">Don't have an account? Sign Up</span>
                  </>
                )
              }
          </div>
 
          <button
            type="submit"
            // onClick={handleContinue}
            disabled={disable}
            className="w-full bg-primary hover:bg-[#6355ff] text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-[#e0def8]"
          >
           {type == 'signup' ? "Sign Up" :"Login"} 
          </button>
        </form>
          {/* <button onClick={()=> setAlert('success', "ahnddl")}>add</button> */}

      </div>
    </div>
    </div>
  )
}
