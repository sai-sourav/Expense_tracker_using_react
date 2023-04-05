import { createContext, useState } from "react";

const UserContext = createContext({
    isLogin : "",
    setIsLogin : () => {}
});


export const UserContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const updateLogin = () => {
        setIsLogin((prev) => !prev)
    }

    const values = {
        isLogin : isLogin,
        setIsLogin : updateLogin
    }
    return(<UserContext.Provider value={values}>{props.children}</UserContext.Provider>)
}

export default UserContext;