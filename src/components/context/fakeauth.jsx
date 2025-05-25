import {React,createContext, useContext, useReducer} from 'react'
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
const Authcontext=createContext();
const initailState={user:null,isauthenciated:false};
function reducer(state,action){
    switch(action.type){
        case "login":
            return{...state,user:action.payload,isauthenciated:true};
        case "logout":
            return{...state,user:null,isauthenciated:false};
        default:
            throw new Error("i dont know what to do")
    }
}
function FakeAuth({a}) {
    const [{user,isauthenciated},dispatch]=useReducer(reducer,initailState);
    function login(email,password)
    {if(email===FAKE_USER.email&&password===FAKE_USER.password){
        dispatch({type:"login",payload:FAKE_USER});
    }}
    function logout(){
        dispatch({type:"logout"});
    }
  return (
   <Authcontext.Provider>{a}
   </Authcontext.Provider>
  )
}
function useAuth(){
    const context=useContext(Authcontext);
    if(context===undefined){
        throw new Error("useAuth must be defined within a AuthProvider");
    }
}
export {FakeAuth,useAuth};
