import React, {useReducer, createContext, useContext} from 'react';

export const SessionContext = createContext();

const sessionReducer = (state, username, password)=> {
    return {username: username, password: password}
}

export const SessionProvider = ({children})=>{
    const [state, dispatch] = useReducer(sessionReducer)
    let value = {state, dispatch}
    return <SessionContext.Provider value ={value}>{children}</SessionContext.Provider>
}

export const useSession = () => {
    const context = useContext(SessionContext);
    return context;
}