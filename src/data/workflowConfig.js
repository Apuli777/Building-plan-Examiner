export const STATUS_LABELS = {draft:"Draft",submitted:"Submitted","under-review":"Under Review","objection-raised":"Objection Raised",resubmitted:"Resubmitted","supervisor-review":"Supervisor Review",approved:"Approved",rejected:"Rejected",closed:"Closed"};
export const ALLOWED_TRANSITIONS = {
 applicant:{draft:["submitted"],"objection-raised":["resubmitted"]},
 examiner:{submitted:["under-review"],resubmitted:["under-review"],"under-review":["objection-raised","supervisor-review","approved","rejected"]},
 supervisor:{"supervisor-review":["approved","rejected","under-review"]},
 admin:{draft:["submitted"],submitted:["under-review"],"under-review":["objection-raised","supervisor-review","approved","rejected"],"objection-raised":["resubmitted"],resubmitted:["under-review"],"supervisor-review":["approved","rejected","under-review"],approved:["closed"],rejected:["closed"]}
};
export const getNextStatuses = (role,status) => ALLOWED_TRANSITIONS[role]?.[status] ?? [];
