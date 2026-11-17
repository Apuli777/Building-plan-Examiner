export const formatDate = v => v ? new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(v)) : "—";
export const formatCurrency = v => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(v)||0);
export const formatArea = v => `${new Intl.NumberFormat("en-IN").format(Number(v)||0)} sq ft`;
export const titleCase = v => (v||"").replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase());
