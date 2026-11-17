import { useMemo, useState } from 'react';
import PageHeading from '@/components/PageHeading';

const initialUsers = [
  { id: 'USR-001', name: 'Aarav Kulkarni', email: 'applicant@demo.in', role: 'Applicant', status: 'Active' },
  { id: 'USR-002', name: 'Meera Joshi', email: 'examiner@demo.in', role: 'Examiner', status: 'Active' },
  { id: 'USR-003', name: 'Rohan Patil', email: 'supervisor@demo.in', role: 'Supervisor', status: 'Active' },
  { id: 'USR-004', name: 'System Administrator', email: 'admin@demo.in', role: 'Administrator', status: 'Active' }
];
const KEY = 'buildpermit_admin_users';
export default function AdminUsersPage() {
  const [users, setUsers] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || initialUsers; } catch { return initialUsers; } });
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'Applicant' });
  const filtered = useMemo(() => users.filter(u => (role === 'All' || u.role === role) && `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase())), [users, query, role]);
  const save = next => { setUsers(next); localStorage.setItem(KEY, JSON.stringify(next)); };
  const addUser = e => { e.preventDefault(); if (!form.name.trim() || !form.email.trim()) return; save([...users, { ...form, id: `USR-${String(Date.now()).slice(-5)}`, status: 'Active' }]); setForm({ name: '', email: '', role: 'Applicant' }); setShow(false); };
  const toggle = id => save(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  return <div className="container-fluid py-4">
    <PageHeading title="User management" subtitle="View demo accounts and manage their portal access." />
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
      <input className="form-control" style={{maxWidth:320}} placeholder="Search name or email" value={query} onChange={e=>setQuery(e.target.value)} />
      <select className="form-select" style={{maxWidth:190}} value={role} onChange={e=>setRole(e.target.value)}><option>All</option>{['Applicant','Examiner','Supervisor','Administrator'].map(x=><option key={x}>{x}</option>)}</select>
      <button className="btn btn-primary ms-auto" onClick={()=>setShow(true)}><i className="bi bi-person-plus me-2"/>Add demo user</button>
    </div>
    <div className="card border-0 shadow-sm"><div className="table-responsive"><table className="table align-middle mb-0"><thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th className="text-end">Action</th></tr></thead><tbody>
      {filtered.map(u=><tr key={u.id}><td><strong>{u.name}</strong><div className="small text-secondary">{u.id}</div></td><td>{u.email}</td><td>{u.role}</td><td><span className={`badge ${u.status==='Active'?'text-bg-success':'text-bg-secondary'}`}>{u.status}</span></td><td className="text-end"><button className="btn btn-sm btn-outline-secondary" onClick={()=>toggle(u.id)}>{u.status==='Active'?'Deactivate':'Activate'}</button></td></tr>)}
      {!filtered.length&&<tr><td colSpan="5" className="text-center py-4 text-secondary">No matching users found.</td></tr>}
    </tbody></table></div></div>
    {show&&<div className="modal d-block" tabIndex="-1" style={{background:'rgba(10,20,35,.45)'}}><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><form onSubmit={addUser}><div className="modal-header"><h5 className="modal-title">Add demo user</h5><button type="button" className="btn-close" onClick={()=>setShow(false)}/></div><div className="modal-body"><label className="form-label">Full name</label><input className="form-control mb-3" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><label className="form-label">Email</label><input type="email" className="form-control mb-3" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><label className="form-label">Role</label><select className="form-select" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>{['Applicant','Examiner','Supervisor','Administrator'].map(x=><option key={x}>{x}</option>)}</select><p className="small text-secondary mt-3 mb-0">Demo only: this does not create a real login account.</p></div><div className="modal-footer"><button type="button" className="btn btn-light" onClick={()=>setShow(false)}>Cancel</button><button className="btn btn-primary">Save user</button></div></form></div></div></div>}
  </div>;
}
