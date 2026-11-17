import { ALLOWED_TRANSITIONS } from '@/data/workflowConfig';

export function buildWorkflowGraph() {
  const graph = {};
  Object.entries(ALLOWED_TRANSITIONS).forEach(([role, states]) => {
    Object.entries(states).forEach(([from, targets]) => {
      graph[from] ||= new Set();
      targets.forEach(to => { graph[from].add(to); graph[to] ||= new Set(); });
    });
  });
  return Object.fromEntries(Object.entries(graph).map(([k,v]) => [k,[...v]]));
}

export function traverseBFS(graph, start) {
  const queue=[start], visited=new Set([start]), order=[];
  while(queue.length){const node=queue.shift();order.push(node);(graph[node]||[]).forEach(next=>{if(!visited.has(next)){visited.add(next);queue.push(next)}})}
  return {order, reachable:[...visited]};
}
export function traverseDFS(graph, start) {
  const visited=new Set(), order=[];
  const visit=node=>{if(visited.has(node))return;visited.add(node);order.push(node);(graph[node]||[]).forEach(visit)};
  visit(start); return {order,reachable:[...visited]};
}
export function detectCycle(graph) {
  const visiting=new Set(), visited=new Set();
  const visit=node=>{if(visiting.has(node))return true;if(visited.has(node))return false;visiting.add(node);for(const next of graph[node]||[])if(visit(next))return true;visiting.delete(node);visited.add(node);return false};
  return Object.keys(graph).some(visit);
}
export function simulateTransaction(records, operations) {
  const staged=records.map(x=>({...x}));
  for(const op of operations){
    const index=staged.findIndex(x=>x.id===op.id);
    if(index<0)return {committed:false,records,reason:`Record ${op.id} was not found. No changes were committed.`};
    if(!op.status || typeof op.status!=='string')return {committed:false,records,reason:'Invalid status value. Transaction rolled back.'};
    staged[index]={...staged[index],status:op.status};
  }
  return {committed:true,records:staged,reason:`${operations.length} operation(s) validated and committed in the simulation.`};
}
export function compareVersion(current, submitted) {
  if(submitted!==current)return {ok:false,status:409,message:`Conflict: submitted version ${submitted} is stale. Current version is ${current}.`};
  return {ok:true,status:200,message:'Version matches. Update may proceed.'};
}
export function simulateApiRequest({user,requiredRole,application,requestedStatus}) {
  if(!user)return {status:401,label:'Unauthorized',message:'Sign in is required.'};
  if(!application)return {status:404,label:'Not Found',message:'Application record does not exist.'};
  if(user.role!==requiredRole && user.role!=='admin')return {status:403,label:'Forbidden',message:`Role ${user.role} cannot perform this operation.`};
  if(!requestedStatus || typeof requestedStatus!=='string')return {status:400,label:'Bad Request',message:'A valid target status is required.'};
  return {status:200,label:'OK',message:'Authentication and role check passed. A server would now validate the workflow transition and persist the change.'};
}
