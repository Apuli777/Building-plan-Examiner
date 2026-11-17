import {createContext,useCallback,useContext,useMemo,useState} from "react";
const C=createContext(null);
export function ToastProvider({children}){
 const [toasts,setToasts]=useState([]);
 const removeToast=useCallback(id=>setToasts(x=>x.filter(t=>t.id!==id)),[]);
 const showToast=useCallback((message,type="info")=>{const id=`t-${Date.now()}`;setToasts(x=>[...x,{id,message,type}]);window.setTimeout(()=>removeToast(id),4000)},[removeToast]);
 const value=useMemo(()=>({showToast}),[showToast]);
 return <C.Provider value={value}>{children}<div className="pp-toast-stack" aria-live="polite">{toasts.map(t=><div key={t.id} className={`pp-toast pp-toast--${t.type}`}><span>{t.message}</span><button className="pp-close ms-auto" onClick={()=>removeToast(t.id)} aria-label="Dismiss">×</button></div>)}</div></C.Provider>
}
export const useToast=()=>{const v=useContext(C);if(!v)throw Error("useToast must be inside ToastProvider");return v};
