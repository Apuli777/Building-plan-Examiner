import {ALLOWED_TRANSITIONS,STATUS_LABELS} from "@/data/workflowConfig";
export class WorkflowError extends Error {constructor(message){super(message);this.name="WorkflowError"}}
export const canTransition = (role,from,to) => (ALLOWED_TRANSITIONS[role]?.[from]||[]).includes(to);
export function transitionApplication(app,to,actor){
 if(!app)throw new WorkflowError("Application not found.");
 if(!canTransition(actor.role,app.status,to))throw new WorkflowError(`${actor.role} cannot move ${STATUS_LABELS[app.status]||app.status} to ${STATUS_LABELS[to]||to}.`);
 const at=new Date().toISOString();
 return {...app,status:to,version:(app.version||0)+1,updatedAt:at,history:[...(app.history||[]),{status:to,action:`Status changed to ${STATUS_LABELS[to]||to}`,actor:actor.name,at}]};
}
export function addObjection(app,message,actor){
 if(!canTransition(actor.role,app.status,"objection-raised"))throw new WorkflowError("An objection cannot be raised at this stage.");
 if(!message?.trim())throw new WorkflowError("Enter objection details.");
 const at=new Date().toISOString();
 return {...app,status:"objection-raised",version:(app.version||0)+1,updatedAt:at,objections:[...(app.objections||[]),{id:`OBJ-${Date.now()}`,message:message.trim(),actor:actor.name,at,resolved:false}],history:[...(app.history||[]),{status:"objection-raised",action:"Objection raised",actor:actor.name,at}]};
}
