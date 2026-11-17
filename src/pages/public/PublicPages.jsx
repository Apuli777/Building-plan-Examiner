
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FAQS } from "@/data/faqs";

function Shell({ eyebrow, title, subtitle, children }) {
  return (
    <div className="page-container py-5">
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h1 className="mb-3">{title}</h1>
      <p className="lead text-secondary mb-4">{subtitle}</p>
      {children}
    </div>
  );
}

// HOME PAGE
export function HomePage() {
  return (
    <>
      <section className="bg-navy text-white py-5">
        <div className="page-container py-lg-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge text-bg-warning mb-3">
                Building permit workflow
              </span>

              <h1 className="display-4 text-white">
                A clearer path from application to decision.
              </h1>

              <p className="lead opacity-75">
                Submit building permit applications, provide supporting
                documents and follow each review stage through one
                organized portal.
              </p>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link to="/login" className="btn btn-warning btn-lg">
                  Start an application
                </Link>

                <Link to="/track" className="btn btn-outline-light btn-lg">
                  Track application
                </Link>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="bg-white text-dark rounded-4 p-4 shadow">
                <h2 className="h4">Application journey</h2>

                {[
                  "Draft",
                  "Submitted",
                  "Examiner review",
                  "Correction if required",
                  "Supervisor decision",
                  "Closed"
                ].map((step, index) => (
                  <div
                    className="d-flex align-items-center gap-3 py-2 border-bottom"
                    key={step}
                  >
                    <span className="badge rounded-pill text-bg-primary">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container py-5">
        <div className="row g-3">
          {[
            [
              "Clear process",
              "Know the stages and required documents before applying."
            ],
            [
              "Track progress",
              "Follow application status and review history."
            ],
            [
              "Role-based review",
              "Structured interfaces for applicants and reviewing officers."
            ]
          ].map((item) => (
            <div className="col-md-4" key={item[0]}>
              <div className="pp-card p-4 h-100">
                <h3 className="h5">{item[0]}</h3>
                <p className="mb-0">{item[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ABOUT PAGE
export function AboutPage() {
  return (
    <Shell
      eyebrow="About the system"
      title="A centralized building permit workflow"
      subtitle="This academic prototype demonstrates how application records, document checks and multi-level review can be organized."
    >
      <div className="alert alert-info">
        This is an educational prototype. It does not issue legally valid
        permits or connect to government databases.
      </div>

      <p>
        The portal separates applicant actions from examiner, supervisor
        and administrator responsibilities. It is designed to make status,
        next steps and review history easier to understand.
      </p>
    </Shell>
  );
}

// PROCESS PAGE
export function ProcessPage() {
  const steps = [
    "Register and sign in",
    "Create an application and enter property details",
    "Attach the required supporting documents",
    "Submit for initial validation",
    "Examiner reviews the application",
    "Applicant responds to objections, if any",
    "Supervisor performs second-level review",
    "Decision is recorded and the application is closed"
  ];

  return (
    <Shell
      eyebrow="Application process"
      title="How the workflow operates"
      subtitle="A structured sequence helps each application reach the appropriate review stage."
    >
      <ol className="list-group list-group-numbered">
        {steps.map((step) => (
          <li className="list-group-item" key={step}>
            {step}
          </li>
        ))}
      </ol>
    </Shell>
  );
}

// DOCUMENTS PAGE
export function DocumentsPage() {
  const documents = [
    "Ownership / title proof",
    "Site plan",
    "Building plan",
    "Identity and contact proof",
    "Relevant declarations or NOCs"
  ];

  return (
    <Shell
      eyebrow="Documents"
      title="Prepare your supporting documents"
      subtitle="The exact requirements may depend on property type and applicable local rules."
    >
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Document</th>
              <th>Purpose</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => (
              <tr key={document}>
                <td>{document}</td>
                <td>Supporting information for review</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="small text-secondary">
        This list is illustrative for the prototype, not an authoritative
        legal checklist.
      </p>
    </Shell>
  );
}

// GUIDELINES PAGE
export function GuidelinesPage() {
  const guidelines = [
    "Enter accurate property and contact details.",
    "Ensure uploaded files are readable and correspond to the selected document type.",
    "Review all fields before submission.",
    "Check your dashboard for objections or requests for correction.",
    "Use only synthetic data in this academic demonstration."
  ];

  return (
    <Shell
      eyebrow="Eligibility & guidelines"
      title="Before you submit"
      subtitle="Use these general preparation tips for the demonstration workflow."
    >
      <ul className="list-group">
        {guidelines.map((item) => (
          <li className="list-group-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </Shell>
  );
}

// FAQ PAGE
export function FaqPage() {
  return (
    <Shell
      eyebrow="Help centre"
      title="Frequently asked questions"
      subtitle="Common questions about using the prototype."
    >
      {(Array.isArray(FAQS) ? FAQS : []).map((faq, index) => (
        <div className="card mb-2" key={index}>
          <div className="card-body">
            <h2 className="h6">
              {faq.question || faq.q || "Question"}
            </h2>

            <p className="mb-0">
              {faq.answer || faq.a || ""}
            </p>
          </div>
        </div>
      ))}
    </Shell>
  );
}

// CONTACT PAGE
export function ContactPage() {
  return (
    <Shell
      eyebrow="Contact"
      title="Need help with the demonstration?"
      subtitle="Use this page to understand how a help request could be presented in a portal."
    >
      <div className="card">
        <div className="card-body">
          <p className="mb-1">
            <strong>Project:</strong> Building Permit Application Workflow
            Management System
          </p>

          <p className="mb-0">
            <strong>Support:</strong> Contact your project team or course
            instructor for prototype issues.
          </p>
        </div>
      </div>
    </Shell>
  );
}

// APPLICATION TRACKING PAGE
export function TrackPage() {
  return <TrackLookup />;
}

function TrackLookup() {
  const [ref, setRef] = useState("");
  const [found, setFound] = useState(null);
  const [searched, setSearched] = useState(false);

  function handleSearch(event) {
    event.preventDefault();

    const raw = localStorage.getItem("buildpermit:applications");
    const list = raw ? JSON.parse(raw) : [];

    const result = list.find(
      (application) =>
        String(application.id).toLowerCase() === ref.trim().toLowerCase()
    );

    setFound(result || null);
    setSearched(true);
  }

  return (
    <Shell
      eyebrow="Application tracking"
      title="Track an application"
      subtitle="Enter the reference number available in the demonstration record."
    >
      <form className="row g-2" onSubmit={handleSearch}>
        <div className="col-md-8">
          <input
            className="form-control form-control-lg"
            value={ref}
            onChange={(event) => setRef(event.target.value)}
            placeholder="Example: BP-2026-00123"
            required
          />
        </div>

        <div className="col-md-4">
          <button className="btn btn-primary btn-lg w-100" type="submit">
            Find application
          </button>
        </div>
      </form>

      {found && (
        <div className="alert alert-success mt-3">
          Reference: {found.id} · Current status: {found.status}
        </div>
      )}

      {searched && !found && (
        <div className="alert alert-warning mt-3">
          No application was found with that reference number.
        </div>
      )}
    </Shell>
  );
}
