export const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v||"").trim());
export const isPositiveNumber = v => Number.isFinite(Number(v)) && Number(v)>0;
export function validateLogin({email="",password=""}){const e={};if(!isEmail(email))e.email="Enter a valid email.";if(!password)e.password="Password is required.";return e}
export function validateApplication(v={}){const e={};if(!v.applicantName?.trim())e.applicantName="Applicant name is required.";if(!v.propertyAddress?.trim())e.propertyAddress="Property address is required.";if(!isPositiveNumber(v.plotArea))e.plotArea="Enter a valid plot area.";if(!isPositiveNumber(v.builtUpArea))e.builtUpArea="Enter a valid built-up area.";return e}
