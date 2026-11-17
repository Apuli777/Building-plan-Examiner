import { useMemo } from 'react';
import { useAppDataContext } from '@/context/AppDataContext';
import PageHeading from '@/components/PageHeading';
const labels={draft:'Draft',submitted:'Submitted',under_review:'Under Review',objection_raised:'Objection Raised',resubmitted:'Resubmitted',supervisor_review:'Supervisor Review',approved:'Approved',rejected:'Rejected',closed:'Closed'};
export default function AdminReportsPage(){
 const {applications,auditLogs}=useAppDataContext();
 const counts=useMemo(()=>applications.reduce((a,x)=>{const k=String(x.status||'draft').toLowerCase().replaceAll(' ','_');a[k]=(a[k]||0)+1;return a},{}),[applications]);
 const total=applications.length; const pending=applications.filter(x=>!['approved','rejected','closed'].includes(String(x.status).toLowerCase())).length;
 const reviewed=auditLogs.filter(x=>/review|objection|approved|rejected/i.test(x.action||'')).length;
 return <div className="container-fluid py-4"><PageHeading title="Reports & insights" subtitle="Operational summary based on the local demonstration dataset."/>
 <div className="row g-3 mb-4">{[{label:'Total applications',value:total,icon:'bi-files'},{label:'In progress',value:pending,icon:'bi-hourglass-split'},{label:'Recorded review actions',value:reviewed,icon:'bi-clipboard2-check'},{label:'Audit events',value:auditLogs.length,icon:'bi-activity'}].map(x=><div className="col-12 col-sm-6 col-xl-3" key={x.label}><div className="card border-0 shadow-sm p-3 h-100"><div className="d-flex justify-content-between align-items-center"><span className="text-secondary small">{x.label}</span><i className={`bi ${x.icon} fs-4 text-primary`}/></div><div className="fs-2 fw-semibold mt-2">{x.value}</div></div></div>)}</div>
 <div className="card border-0 shadow-sm p-3"><h6 className="mb-3">Applications by status</h6>{Object.entries(counts).length?Object.entries(counts).map(([k,v])=><div className="mb-3" key={k}><div className="d-flex justify-content-between small mb-1"><span>{labels[k]||k.replaceAll('_',' ')}</span><strong>{v} ({total?Math.round(v/total*100):0}%)</strong></div><div className="progress" style={{height:9}}><div className="progress-bar" role="progressbar" style={{width:`${total?v/total*100:0}%`}} aria-valuenow={v} aria-valuemin="0" aria-valuemax={total}/></div></div>):<p className="text-secondary mb-0">No application records are available yet.</p>}</div>
 <p className="small text-secondary mt-3">These figures are calculated from browser localStorage and are intended for demonstration, not official reporting.</p>
 </div>;
}
