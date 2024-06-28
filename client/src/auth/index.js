import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    SET_ERROR: "SET_ERROR",
}

export const ErrorType = {
    NONE: "NONE",
    REGISTER_ERROR: "REGISTER_ERROR",
    LOGIN_ERROR: "LOGIN_ERROR",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error_type:ErrorType.NONE,
        message:""
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error_type: auth.error_type,
                    message: auth.message,
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error_type: auth.error_type,
                    message: auth.message,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error_type: auth.error_type,
                    message: auth.message,
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error_type: auth.error_type,
                    message: auth.message,
                })
            }
            case AuthActionType.SET_LOGGED_IN:{
                return setAuth({
                    loggedIn:payload.loggedIn,
                    user: payload.user,
                    error_type: auth.error_type,
                    message: auth.message,
                })
            }
            case AuthActionType.SET_ERROR:{
                return setAuth({
                    loggedIn:auth.loggedIn,
                    user: auth.user,
                    error_type: payload.error_type,
                    message: payload.message,
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
            return response.data.loggedIn;
        }
        return false;
    }

    auth.registerUser = async function(userName,firstName, lastName, email, password, passwordVerify) {
        try{
            const response = await api.registerUser(userName,firstName, lastName, email, password, passwordVerify);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/Playlister/");
            }
        }catch(error){
            authReducer({
                type: AuthActionType.SET_ERROR,
                payload: {
                    error_type:ErrorType.REGISTER_ERROR,
                    message:error.response.data.errorMessage
                }
            })
            }
        }
        
    

    auth.loginUser = async function(email, password) {
        try{
            const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            /// Go to Playlister
           
            history.push("/Playlister/");
        }
        }catch(error){
            authReducer({
                type: AuthActionType.SET_ERROR,
                payload: {
                    error_type:ErrorType.LOGIN_ERROR,
                    message:error.response.data.errorMessage
                }
            })
            }

        }
        
    

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            /// Go to Splash
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        return initials;
    }

    /// Functions to open up error modals 
    auth.isRegisterErrorOpen =()=>{
        return auth.error_type === ErrorType.REGISTER_ERROR;
    }
    auth.isLoginErrorOpen =()=>{
        return auth.error_type === ErrorType.LOGIN_ERROR;
    }

    auth.closeError = ()=>{
        authReducer({
            type: AuthActionType.SET_ERROR,
            payload: {
                error_type:ErrorType.NONE,
                message:"",
            }
        })

    }
   

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };