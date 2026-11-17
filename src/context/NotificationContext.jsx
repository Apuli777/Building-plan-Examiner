import {createContext,useCallback,useContext,useMemo,useState} from "react";
import {INITIAL_NOTIFICATIONS} from "@/data/notifications";
import {readStorage,writeStorage} from "@/utils/storage";
const C=createContext(null);
export function NotificationProvider({children}){
 const [notifications,setNotifications]=useState(()=>readStorage("notifications",INITIAL_NOTIFICATIONS));
 const markAllAsRead=useCallback(()=>setNotifications(old=>{const next=old.map(n=>({...n,read:true}));writeStorage("notifications",next);return next}),[]);
 const addNotification=useCallback(n=>setNotifications(old=>{const next=[{id:`NTF-${Date.now()}`,read:false,createdAt:new Date().toISOString(),...n},...old];writeStorage("notifications",next);return next}),[]);
 const value=useMemo(()=>({notifications,unreadCount:notifications.filter(n=>!n.read).length,markAllAsRead,addNotification}),[notifications,markAllAsRead,addNotification]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useNotificationContext=()=>{const v=useContext(C);if(!v)throw Error("useNotificationContext must be inside NotificationProvider");return v};
