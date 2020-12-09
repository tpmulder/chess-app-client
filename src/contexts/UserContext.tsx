import axios from "axios";
import React, { useReducer } from "react";
import ApiClient from "../clients/ApiClient";
import User from "../models/User";

export enum user_actions {
    logout = 'logout',

    update_start = 'start update',
    update_finish = 'finish update',
    update_fail = 'fail update'
}

type UserState = { isAuthenticated: boolean, isLoading: boolean, user: User | null, error?: Error }
type UserDispatch = (props: UserDispatchProps) => void;
type UserDispatchProps = { action: user_actions, user: Partial<User>, error?: Error }

const initialState: UserState = { isAuthenticated: false, isLoading: false, user: null };

const UserStateContext = React.createContext<UserState>(initialState);
const UserDispatchContext = React.createContext<UserDispatch | null>(null);

const userReducer = (state: UserState, dispatchProps: UserDispatchProps): UserState => {
    switch(dispatchProps.action) {
        case user_actions.logout:
            return initialState;
        case user_actions.update_start:
            return { ...state, isLoading: true };
        case user_actions.update_finish:  
            let authenticated = state.isAuthenticated;            

            if (!authenticated && state.user) {
                storeAccessToken();
                authenticated = true;
            } 
            
            return { ...state, user: state.user 
                    ? { ...state.user, ...dispatchProps.user } 
                    : dispatchProps.user as User
                , isLoading: false
                , isAuthenticated: authenticated };
        case user_actions.update_fail:
            return { ...state, isLoading: false, error: dispatchProps.error }
        default:
            throw new Error("No valid user action supplied");
    }
}

const UserProvider: React.FC = (props) => {
    const [state, dispatch] = useReducer(userReducer, { isAuthenticated: false, isLoading: false, user: null });

    return (
        <UserStateContext.Provider value={state}>
          <UserDispatchContext.Provider value={dispatch}>
            {props.children}
          </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
}

const useUserContext = (): [UserState, UserDispatch] => {
    const userState = React.useContext(UserStateContext);
    const userDispatch = React.useContext(UserDispatchContext)

    if (!userState || !userDispatch) {
        throw new Error('useUserContext must be used within a UserProvider')
    }

    return [userState, userDispatch];
}

const storeAccessToken = async (): Promise<string> => {
    const result = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, { 
        client_id:`${process.env.REACT_APP_API_ID}`,
        client_secret:`${process.env.REACT_APP_API_SECRET}`,
        audience:`${process.env.REACT_APP_API_AUDIENCE}`,
        grant_type:"client_credentials"
    })

    const token = result.data.access_token;

    localStorage.setItem(`${process.env.REACT_APP_TOKEN_STORAGE}`, `${token}`);

    return `${token}`;
}

const userLogout = (dispatch: UserDispatch) => {
    dispatch({ action: user_actions.logout, user: {} });
}

const userUpdate = async (dispatch: UserDispatch, user: User | null, updates: Partial<User>) => {
    dispatch({ action: user_actions.update_start, user: {} })

    try {
        let updatedUser: User;

        if (user) {
            updatedUser = user;
        }
        else {
            const response = await ApiClient.get<User | null>(`/users/email?email=${updates.email}`)

            if (response)
                updatedUser = response;
            else {
                updatedUser = await ApiClient.post<User>('/users', updates);
            }
        }

        dispatch({ action: user_actions.update_finish, user: updatedUser });
    }
    catch (error) {
        dispatch({ action: user_actions.update_fail, user: {}, error: new Error(error.message) });
    }
}

export { UserProvider, userUpdate, useUserContext, userLogout }