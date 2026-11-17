import {createContext,useCallback,useContext,useMemo,useState} from "react";
import {USERS} from "@/data/users";
import {readStorage,writeStorage} from "@/utils/storage";
const C=createContext(null);
export function AuthProvider({children}){
 const [user,setUser]=useState(()=>readStorage("session",null));
 const login=useCallback(async(email,password)=>{
  const found=USERS.find(u=>u.email.toLowerCase()===email.trim().toLowerCase()&&u.password===password);
  if(!found)return {success:false,message:"Email or password is incorrect."};
  const safe={id:found.id,name:found.name,email:found.email,role:found.role};
  setUser(safe);writeStorage("session",safe);return {success:true,user:safe};
 },[]);
 const logout=useCallback(()=>{setUser(null);localStorage.removeItem("buildpermit:session")},[]);
 const value=useMemo(()=>({user,isAuthenticated:!!user,login,logout}),[user,login,logout]);
 return <C.Provider value={value}>{children}</C.Provider>;
}
export const useAuthContext=()=>{const v=useContext(C);if(!v)throw Error("useAuthContext must be inside AuthProvider");return v};
