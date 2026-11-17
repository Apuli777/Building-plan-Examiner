import {NavLink,Outlet,Link} from "react-router-dom";
export default function PublicLayout(){
 const links=[["/","Home"],["/about","About"],["/process","Process"],["/documents","Documents"],["/guidelines","Guidelines"],["/faq","FAQ"],["/contact","Contact"]];
 return <><a className="skip-link" href="#main-content">Skip to content</a>
 <header className="bg-white border-bottom sticky-top">
  <nav className="navbar navbar-expand-lg page-container py-3">
   <Link className="navbar-brand fw-bold text-navy" to="/"> <span className="text-gold">◆</span> BuildPermit Portal</Link>
   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#publicNav" aria-controls="publicNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"/></button>
   <div className="collapse navbar-collapse" id="publicNav"><div className="navbar-nav ms-auto align-items-lg-center gap-lg-1">{links.map(([to,label])=><NavLink key={to} to={to} end className={({isActive})=>`nav-link ${isActive?'active fw-semibold':''}`}>{label}</NavLink>)}<Link className="btn btn-primary ms-lg-2 mt-2 mt-lg-0" to="/login">Login</Link></div></div>
  </nav>
 </header>
 <main id="main-content" className="min-vh-100"><Outlet/></main>
 <footer className="bg-navy py-4 mt-5"><div className="page-container d-flex flex-wrap justify-content-between gap-2"><div><strong>BuildPermit Portal</strong><div className="small opacity-75">Academic workflow management prototype</div></div><div className="small opacity-75">Demonstration only · Not an official government service</div></div></footer>
 </>;
}
