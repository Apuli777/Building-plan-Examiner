import {NavLink,Outlet,useNavigate} from "react-router-dom";
import {useAuthContext} from "@/context/AuthContext";
export default function ApplicantLayout(){
 const {user,logout}=useAuthContext();const navigate=useNavigate();
 const links=[["/applicant/dashboard","Dashboard"],["/applicant/new-application","New application"],["/applicant/applications","My applications"],["/applicant/notifications","Notifications"],["/applicant/profile","Profile"]];
 return <div className="container-fluid py-3"><header className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3 mb-4 gap-2"><div><Link to="/" className="fw-bold fs-4 text-decoration-none text-navy">BuildPermit</Link><div className="small text-secondary">Applicant portal · {user?.name}</div></div><button className="btn btn-outline-secondary btn-sm" onClick={()=>{logout();navigate("/login")}}>Sign out</button></header><nav className="nav nav-pills gap-2 mb-4">{links.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>`nav-link ${isActive?'active':''}`}>{label}</NavLink>)}</nav><Outlet/></div>
}
import {Link} from "react-router-dom";
