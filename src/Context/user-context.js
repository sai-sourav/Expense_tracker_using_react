import { createContext, useState } from "react";

const UserContext = createContext({
  isLogin: "",
  setIsLogin: () => {},
  Profiledetails: "",
  setProfiledetails: () => {},
});

export const UserContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(() => {
   if (localStorage.getItem('authToken') === null){
    return false
   }else {
    return true
   }
  });
  const [Profiledetails, setProfiledetails] = useState(() => {
    if (localStorage.getItem('profile') === null){
      return false
    }
    else if (localStorage.getItem('profile') === "false"){
      return false
    }else {
      return true
     }
  });
  const updateLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const updateProfiledetails = (bool) => {
    setProfiledetails(bool)
  }

  const values = {
    isLogin: isLogin,
    setIsLogin: updateLogin,
    Profiledetails: Profiledetails,
    setProfiledetails: updateProfiledetails,
  };
  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;
