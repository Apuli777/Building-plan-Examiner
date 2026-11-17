import {useMemo,useState} from "react";
export default function useFilters(items,fields=[]){
 const [search,setSearch]=useState("");const [status,setStatus]=useState("all");const [sortBy,setSortBy]=useState("updatedAt");const [direction,setDirection]=useState("desc");
 const filteredItems=useMemo(()=>[...items].filter(x=>status==="all"||x.status===status).filter(x=>!search.trim()||fields.some(f=>String(x[f]??"").toLowerCase().includes(search.toLowerCase()))).sort((a,b)=>{const n=String(a[sortBy]??"").localeCompare(String(b[sortBy]??""),undefined,{numeric:true});return direction==="asc"?n:-n}),[items,fields,status,search,sortBy,direction]);
 const toggleSort=f=>{if(f===sortBy)setDirection(d=>d==="asc"?"desc":"asc");else{setSortBy(f);setDirection("asc")}};
 return {search,setSearch,status,setStatus,sortBy,direction,toggleSort,filteredItems};
}
