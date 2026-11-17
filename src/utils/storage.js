const PREFIX = "buildpermit:";
export function readStorage(key,fallback){try{const raw=localStorage.getItem(PREFIX+key);return raw===null?fallback:JSON.parse(raw)}catch{return fallback}}
export function writeStorage(key,value){try{localStorage.setItem(PREFIX+key,JSON.stringify(value));return true}catch{return false}}
export function removeStorage(key){localStorage.removeItem(PREFIX+key)}
export function resetDemoStorage(){Object.keys(localStorage).filter(k=>k.startsWith(PREFIX)).forEach(k=>localStorage.removeItem(k))}
