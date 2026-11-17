import {useEffect,useState} from "react";
export default function useScrollSpy(ids=[],offset=120){
 const [activeId,setActiveId]=useState(ids[0]||"");
 useEffect(()=>{const update=()=>{let active=ids[0]||"";ids.forEach(id=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=offset)active=id});setActiveId(active)};window.addEventListener("scroll",update,{passive:true});update();return()=>window.removeEventListener("scroll",update)},[ids,offset]);
 return activeId;
}
