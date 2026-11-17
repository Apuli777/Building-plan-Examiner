import {useMemo} from "react";
import {useAppDataContext} from "@/context/AppDataContext";
import useAuth from "@/hooks/useAuth";
export default function useApplications(){const data=useAppDataContext();const {user}=useAuth();const myApplications=useMemo(()=>user?.role==="applicant"?data.applications.filter(a=>a.applicantId===user.id):data.applications,[data.applications,user]);return {...data,myApplications}}
