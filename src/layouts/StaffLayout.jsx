import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
export default function StaffLayout(){
 const {user,logout}=useAuthContext();const navigate=useNavigate();
 const base=user.role==='examiner'?'/examiner':user.role==='supervisor'?'/supervisor':'/admin';
 const links=user.role==='admin'
 ?[{to:`${base}/dashboard`,label:'Dashboard'},{to:`${base}/queue`,label:'Applications'},{to:`${base}/users`,label:'Users'},{to:`${base}/workflow`,label:'Workflow'},{to:`${base}/activity`,label:'Activity log'},{to:`${base}/reports`,label:'Reports'},{to:`${base}/engines`,label:'Engine Lab'}]
 :[{to:`${base}/dashboard`,label:'Dashboard'},{to:`${base}/queue`,label:'Review queue'}];
 return <div className="container-fluid py-3"><header className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3 mb-4"><div><div className="fw-bold fs-4">BuildPermit <span className="text-secondary">Staff Portal</span></div><small className="text-secondary">Signed in as {user.name} · {user.role}</small></div><button className="btn btn-outline-secondary btn-sm" onClick={()=>{logout();navigate('/login')}}>Sign out</button></header><nav className="nav nav-pills gap-2 mb-4">{links.map(x=><NavLink key={x.to} to={x.to} end className={({isActive})=>`nav-link ${isActive?'active':''}`}>{x.label}</NavLink>)}</nav><Outlet/></div>;
}
