import {createContext,useCallback,useContext,useMemo,useState} from "react";
import {INITIAL_APPLICATIONS,createApplicationId} from "@/data/applications";
import {INITIAL_AUDIT_LOGS} from "@/data/auditLogs";
import {readStorage,writeStorage,removeStorage} from "@/utils/storage";
import {transitionApplication,addObjection as addObjectionLogic} from "@/utils/workflowEngine";
const C=createContext(null);
export function AppDataProvider({children}){
 const [applications,setApplications]=useState(()=>readStorage("applications",INITIAL_APPLICATIONS));
 const [auditLogs,setAuditLogs]=useState(()=>readStorage("auditLogs",INITIAL_AUDIT_LOGS));
 const commit=(apps,logs)=>{setApplications(apps);setAuditLogs(logs);writeStorage("applications",apps);writeStorage("auditLogs",logs)};
 const updateStatus=useCallback((id,status,user)=>{const app=applications.find(a=>a.id===id);const updated=transitionApplication(app,status,user);const log={id:`AUD-${Date.now()}`,applicationId:id,actor:user.name,role:user.role,action:`Status changed to ${status}`,at:new Date().toISOString()};commit(applications.map(a=>a.id===id?updated:a),[log,...auditLogs]);return updated},[applications,auditLogs]);
 const raiseObjection=useCallback((id,message,user)=>{const app=applications.find(a=>a.id===id);const updated=addObjectionLogic(app,message,user);const log={id:`AUD-${Date.now()}`,applicationId:id,actor:user.name,role:user.role,action:"Objection raised",at:new Date().toISOString()};commit(applications.map(a=>a.id===id?updated:a),[log,...auditLogs]);return updated},[applications,auditLogs]);
 const createApplication=useCallback((v,user)=>{const now=new Date().toISOString();const app={id:createApplicationId(applications),applicantId:user.id,applicantName:user.name,propertyAddress:v.propertyAddress,city:v.city||"Hubballi-Dharwad",propertyType:v.propertyType||"Residential",plotArea:Number(v.plotArea),builtUpArea:Number(v.builtUpArea),status:"draft",version:0,createdAt:now,updatedAt:now,documents:[],objections:[],history:[{status:"draft",action:"Draft created",actor:user.name,at:now}]};commit([app,...applications],auditLogs);return app},[applications,auditLogs]);
 const resetDemoData=useCallback(()=>{removeStorage("applications");removeStorage("auditLogs");setApplications(INITIAL_APPLICATIONS);setAuditLogs(INITIAL_AUDIT_LOGS)},[]);
 const value=useMemo(()=>({applications,auditLogs,updateStatus,raiseObjection,createApplication,resetDemoData,getApplication:id=>applications.find(a=>a.id===id)}),[applications,auditLogs,updateStatus,raiseObjection,createApplication,resetDemoData]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useAppDataContext=()=>{const v=useContext(C);if(!v)throw Error("useAppDataContext must be inside AppDataProvider");return v};
