import { createContext, useState } from "react";

const UserContext = createContext({
  isLogin: "",
  setIsLogin: () => {},
  Profiledetails: "",
  setProfiledetails: () => {},
  isEmailVerified: "",
  setisEmailVerified: () => {},
  username: "",
  setUsername: () => {}
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
  const [isEmailVerified, setisEmailVerified] = useState(() => {
    if (localStorage.getItem('verifyemail') === null){
      return false
    }
    else if (localStorage.getItem('verifyemail') === "false"){
      return false
    }else {
      return true
     }
  })
  const [userName, setUsername] = useState("");
  const updateLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const updateProfiledetails = (bool) => {
    setProfiledetails(bool)
  }

  const updateEmailVerified = (bool) => {
    setisEmailVerified(bool);
  }

  const values = {
    isLogin: isLogin,
    setIsLogin: updateLogin,
    Profiledetails: Profiledetails,
    setProfiledetails: updateProfiledetails,
    isEmailVerified: isEmailVerified,
    setisEmailVerified: updateEmailVerified,
    username: userName,
    setUsername: (name) => setUsername(name)
  };
  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContext;
