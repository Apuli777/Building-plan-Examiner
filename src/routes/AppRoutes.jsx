import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicLayout from "@/layouts/PublicLayout";
import ApplicantLayout from "@/layouts/ApplicantLayout";
import LoginPage from "@/routes/LoginPage";
import {HomePage,AboutPage,ProcessPage,DocumentsPage,GuidelinesPage,FaqPage,ContactPage,TrackPage} from "@/pages/public/PublicPages";
import DashboardPage from "@/pages/applicant/DashboardPage";
import NewApplicationPage from "@/pages/applicant/NewApplicationPage";
import ApplicationsPage from "@/pages/applicant/ApplicationsPage";
import ApplicationDetailsPage from "@/pages/applicant/ApplicationDetailsPage";
import NotificationsPage from "@/pages/applicant/NotificationsPage";
import ProfilePage from "@/pages/applicant/ProfilePage";
import StaffLayout from "@/layouts/StaffLayout";
import StaffDashboard from "@/pages/staff/StaffDashboard";
import StaffQueue from "@/pages/staff/StaffQueue";
import StaffApplicationReview from "@/pages/staff/StaffApplicationReview";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminWorkflowPage from "@/pages/admin/AdminWorkflowPage";
import AdminActivityPage from "@/pages/admin/AdminActivityPage";
import AdminReportsPage from "@/pages/admin/AdminReportsPage";
import EngineLabPage from "@/pages/admin/EngineLabPage";
function PublicRoutes(){return <Routes>
 <Route element={<PublicLayout/>}><Route index element={<HomePage/>}/><Route path="about" element={<AboutPage/>}/><Route path="process" element={<ProcessPage/>}/><Route path="documents" element={<DocumentsPage/>}/><Route path="guidelines" element={<GuidelinesPage/>}/><Route path="faq" element={<FaqPage/>}/><Route path="contact" element={<ContactPage/>}/><Route path="track" element={<TrackPage/>}/></Route>
 <Route path="/login" element={<LoginPage/>}/>
 <Route element={<ProtectedRoute allowedRoles={["applicant"]}/> }><Route path="/applicant" element={<ApplicantLayout/>}><Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<DashboardPage/>}/><Route path="new-application" element={<NewApplicationPage/>}/><Route path="applications" element={<ApplicationsPage/>}/><Route path="applications/:id" element={<ApplicationDetailsPage/>}/><Route path="notifications" element={<NotificationsPage/>}/><Route path="profile" element={<ProfilePage/>}/></Route></Route>
 <Route element={<ProtectedRoute allowedRoles={["examiner"]}/> }><Route path="/examiner" element={<StaffLayout/>}><Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<StaffDashboard/>}/><Route path="queue" element={<StaffQueue/>}/><Route path="applications/:id" element={<StaffApplicationReview/>}/></Route></Route>
 <Route element={<ProtectedRoute allowedRoles={["supervisor"]}/> }><Route path="/supervisor" element={<StaffLayout/>}><Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<StaffDashboard/>}/><Route path="queue" element={<StaffQueue/>}/><Route path="applications/:id" element={<StaffApplicationReview/>}/></Route></Route>
 <Route element={<ProtectedRoute allowedRoles={["admin"]}/> }><Route path="/admin" element={<StaffLayout/>}><Route index element={<Navigate to="dashboard" replace/>}/><Route path="dashboard" element={<StaffDashboard/>}/><Route path="queue" element={<StaffQueue/>}/><Route path="applications/:id" element={<StaffApplicationReview/>}/><Route path="users" element={<AdminUsersPage/>}/><Route path="workflow" element={<AdminWorkflowPage/>}/><Route path="activity" element={<AdminActivityPage/>}/><Route path="reports" element={<AdminReportsPage/>}/><Route path="engines" element={<EngineLabPage/>}/></Route></Route>
 <Route path="*" element={<div className="container py-5"><h1>Page not found</h1><a href="/">Return home</a></div>}/>
</Routes>}
export default function AppRoutes(){return <BrowserRouter><PublicRoutes/></BrowserRouter>}
