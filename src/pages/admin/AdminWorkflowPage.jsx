import { useState } from 'react';
import PageHeading from '@/components/PageHeading';
const stages = ['Draft','Submitted','Under Review','Objection Raised','Resubmitted','Supervisor Review','Approved / Rejected','Closed'];
const defaultRules = [
 {from:'Draft',to:'Submitted',role:'Applicant',enabled:true},
 {from:'Submitted',to:'Under Review',role:'Examiner',enabled:true},
 {from:'Under Review',to:'Objection Raised',role:'Examiner',enabled:true},
 {from:'Objection Raised',to:'Resubmitted',role:'Applicant',enabled:true},
 {from:'Under Review',to:'Supervisor Review',role:'Examiner',enabled:true},
 {from:'Supervisor Review',to:'Approved / Rejected',role:'Supervisor',enabled:true},
 {from:'Approved / Rejected',to:'Closed',role:'Administrator',enabled:true}
];
export default function AdminWorkflowPage(){
 const [rules,setRules]=useState(()=>{try{return JSON.parse(localStorage.getItem('buildpermit_workflow_rules'))||defaultRules}catch{return defaultRules}});
 const save=next=>{setRules(next);localStorage.setItem('buildpermit_workflow_rules',JSON.stringify(next))};
 return <div className="container-fluid py-4"><PageHeading title="Workflow configuration" subtitle="Review the permitted lifecycle and role ownership for the academic prototype."/>
 <div className="card border-0 shadow-sm p-3 mb-4"><h6 className="mb-3">Application lifecycle</h6><div className="d-flex flex-wrap align-items-center gap-2">{stages.map((s,i)=><div key={s} className="d-flex align-items-center gap-2"><span className="badge rounded-pill text-bg-light border px-3 py-2">{s}</span>{i<stages.length-1&&<i className="bi bi-arrow-right text-secondary"/>}</div>)}</div></div>
 <div className="alert alert-warning"><i className="bi bi-info-circle me-2"/>These switches are a UI demonstration only. They do not alter the Phase B workflow engine's server-side rules.</div>
 <div className="card border-0 shadow-sm"><div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>Current state</th><th>Next state</th><th>Authorized role</th><th>Enabled (demo)</th></tr></thead><tbody>{rules.map((r,i)=><tr key={`${r.from}-${r.to}`}><td>{r.from}</td><td>{r.to}</td><td>{r.role}</td><td><div className="form-check form-switch"><input className="form-check-input" type="checkbox" checked={r.enabled} onChange={()=>save(rules.map((x,j)=>i===j?{...x,enabled:!x.enabled}:x))}/></div></td></tr>)}</tbody></table></div></div>
 <button className="btn btn-outline-secondary mt-3" onClick={()=>save(defaultRules)}><i className="bi bi-arrow-counterclockwise me-2"/>Reset demo rules</button>
 </div>;
}
