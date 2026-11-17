import {useAuthContext} from "@/context/AuthContext";
export default function ProfilePage(){const {user}=useAuthContext();return <><h1 className="h3">My profile</h1><div className="card" style={{maxWidth:600}}><div className="card-body"><p><strong>Name:</strong> {user.name}</p><p><strong>Email:</strong> {user.email}</p><p className="mb-0"><strong>Role:</strong> Applicant</p></div></div></>}
