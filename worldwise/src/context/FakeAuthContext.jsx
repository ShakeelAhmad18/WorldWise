import { createContext, useReducer } from "react";
import PropTypes from 'prop-types'

AuthProvider.propTypes={
    children:PropTypes.any,
}

const inialState={
    user:null,
    isAutheticated:false,
}


function reducer(state,action){
    switch(action.type){
       case 'login':
        return{
           ...state,
           user:action.payload,
           isAutheticated:true,
        }
      case 'logout':
        return {
            ...state,
            user:null,
            isAutheticated:false,
        }
       default: throw new Error('Unknown Action')
    }
}

const AuthContext=createContext();


function AuthProvider({children}){

    const FAKE_USER = {
        name: "Shakeel",
        email: "jack@example.com",
        password: "qwerty",
        avatar: "https://i.pravatar.cc/100?u=zz",
      };

   const [{user,isAutheticated},dispatch]=useReducer(reducer,inialState)
    function login(email,password){
        if(email===FAKE_USER.email && password===FAKE_USER.password) dispatch({type:'login',payload:FAKE_USER})
    }

    function logout(){
      dispatch({type:'logout'})
    }

    return <AuthContext.Provider value={{
    login,
    logout,
    isAutheticated,
    user,
    }}>
         {children}
    </AuthContext.Provider>
}

{/*function useAuth(){
    const context=useContext(AuthContext)
    if(context === undefined){
        throw new Error('You used the AuthCotext outside the AuthProvider')
    }
        return context;
}*/}

export {AuthProvider,AuthContext}