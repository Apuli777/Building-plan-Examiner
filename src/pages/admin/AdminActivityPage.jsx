import { useMemo, useState } from 'react';
import { useAppDataContext } from '@/context/AppDataContext';
import PageHeading from '@/components/PageHeading';
export default function AdminActivityPage(){
 const {auditLogs}=useAppDataContext(); const [query,setQuery]=useState(''); const [role,setRole]=useState('All');
 const rows=useMemo(()=>auditLogs.filter(x=>(role==='All'||x.role===role)&&`${x.actor} ${x.action} ${x.applicationId||''}`.toLowerCase().includes(query.toLowerCase())),[auditLogs,query,role]);
 const exportCsv=()=>{const header=['Timestamp','Actor','Role','Application','Action'];const lines=[header,...rows.map(x=>[x.at,x.actor,x.role,x.applicationId||'',x.action])].map(a=>a.map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(','));const blob=new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='buildpermit-activity.csv';a.click();URL.revokeObjectURL(url)};
 return <div className="container-fluid py-4"><PageHeading title="Activity & audit log" subtitle="A traceable view of workflow actions recorded in this browser demo."/>
 <div className="d-flex flex-wrap gap-2 mb-3"><input className="form-control" style={{maxWidth:330}} placeholder="Search actor, action or application" value={query} onChange={e=>setQuery(e.target.value)}/><select className="form-select" style={{maxWidth:190}} value={role} onChange={e=>setRole(e.target.value)}>{['All','applicant','examiner','supervisor','admin'].map(x=><option key={x} value={x}>{x==='All'?'All roles':x}</option>)}</select><button className="btn btn-outline-primary ms-auto" onClick={exportCsv}><i className="bi bi-download me-2"/>Export CSV</button></div>
 <div className="card border-0 shadow-sm"><div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>Date & time</th><th>Actor</th><th>Role</th><th>Application</th><th>Activity</th></tr></thead><tbody>{rows.map((x,i)=><tr key={x.id||i}><td className="text-nowrap">{x.at?new Date(x.at).toLocaleString():'—'}</td><td>{x.actor}</td><td><span className="badge text-bg-light">{x.role}</span></td><td>{x.applicationId||'—'}</td><td>{x.action}</td></tr>)}{!rows.length&&<tr><td colSpan="5" className="text-center text-secondary py-4">No activity matches these filters.</td></tr>}</tbody></table></div></div>
 </div>;
}
