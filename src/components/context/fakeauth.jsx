import {React,createContext, useContext, useReducer,useEffect} from 'react'
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
const Authcontext=createContext();
const initailState={user:null,isauthenticated:false};
function reducer(state,action){
    switch(action.type){
        case "login":
            return{...state,user:action.payload,isauthenticated:true};
        case "logout":
            return{...state,user:null,isauthenticated:false};
        default:
            throw new Error("i dont know what to do")
    }
}
function FakeAuth({children}) {
    const [{user,isauthenticated},dispatch]=useReducer(reducer,initailState);
    function login(email,password)
    {if(email===FAKE_USER.email&&password===FAKE_USER.password){
        dispatch({type:"login",payload:FAKE_USER});
    }}
    function logout(){
        dispatch({type:"logout"});
    }
  return (
   <Authcontext.Provider value={{FakeAuth, user, login, logout,isauthenticated}}>{children}
   </Authcontext.Provider>
  )
}
function useAuth(){
    const context=useContext(Authcontext);
    if(context===undefined){
        throw new Error("useAuth must be defined within a AuthProvider");
    }return context;
}
export {FakeAuth,useAuth};
