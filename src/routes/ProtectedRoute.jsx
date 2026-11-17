import {Navigate,Outlet,useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import {ROLE_HOME} from "@/routes/routeConfig";
export default function ProtectedRoute({allowedRoles=[]}){const {user,isAuthenticated}=useAuth();const location=useLocation();if(!isAuthenticated)return <Navigate to="/login" replace state={{from:location}}/>;if(allowedRoles.length&&!allowedRoles.includes(user.role))return <Navigate to={ROLE_HOME[user.role]||"/"} replace/>;return <Outlet/>}
