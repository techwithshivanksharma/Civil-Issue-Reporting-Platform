import React,{createContext, useState, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    //On first load, check if user already logged in (from localstorage)
    useEffect(()=>{
        const savedUser = localStorage.getItem("user");
        if(savedUser) setUser(JSON.parse(savedUser));
    },[])

    //Login Function
    const login = (username, password) => {
        //mock Login will be replaced by Firebase later
        if(username === "admin" && password === "1234"){
            const userData = {name: "Admin", role: "admin"};
            setUser(userData);
            localStorage.setItem('user',JSON.stringify(userData));
            return true;
        }else if(username === 'user' && password === "1234"){
            const userData = {name: 'User', role:"user"};
            setUser(userData);
            localStorage.setItem("user",JSON.stringify(userData));
            return true;
        }else{
            return false;
            //Invalid credentials
        }
    };

    //Logout function
    const logout = () =>{
        setUser(null);
        localStorage.removeItem('user');
    };


    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};