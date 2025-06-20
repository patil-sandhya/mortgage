'use client';
import { useAlertAndLoader } from '@/app/layout';
import ApiServies from '@/Services/CommonApi';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext();

const authReducerFunc = (data, action) => {
  switch (action.type) {
    case 'userLogin':
      return { ...data, isLoggedIn: true, userData:action.data };
    case 'userLogout':
      return { ...data, isLoggedIn: false };
    default:
    // console.error('invalid action type for auth reducer');
  }
};

export const AuthProvider = ({ children }) => {
  const [{ isLoggedIn, userData }, setAuth] = useReducer(authReducerFunc, {
    isLoggedIn: false,
  });
  const {setAlert} = useAlertAndLoader()
  const router = useRouter()
  const handelUserLogin = (name,role) => {
    //console.log(getUserData);
    const dataObj = {
        name,
        role
    }
    setAuth({ type: 'userLogin', data: dataObj});
  };

  const handleUserLogout = () => {
    setAuth({ type: 'userLogout' });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const getUser = async()=>{
    try {
        let res = await ApiServies.get_user()
        console.log("user", res)
        if(res.status == 200){
            handelUserLogin(res?.data?.username,res?.data?.role )
        }
    } catch (error) {
         if(error?.response?.data?.message == "Unauthorized"){
        setAlert('error', "Session is expire, please login again")
        handleUserLogout()
          router.push("/")
      }else{
      setAlert('error', 'Error while getting user details.')
      }
        console.log(error);
        
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        handelUserLogin,
        handleUserLogout,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
