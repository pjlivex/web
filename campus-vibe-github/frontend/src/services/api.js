const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') + '/api';
const DEMO = !import.meta.env.VITE_API_URL;
const key = 'campusVibeDemoDB';
const initial = {
 users: [
  {id:1,name:'Campus Admin',email:'admin@campusvibe.com',password:'Admin@123',role:'ADMIN'},
  {id:2,name:'Alex Student',email:'student@campusvibe.com',password:'Student@123',role:'STUDENT',studentId:'CV2026-001',department:'CSE',year:'2'},
  {id:3,name:'Event Coordinator',email:'coordinator@campusvibe.com',password:'Coord@123',role:'COORDINATOR'},
  {id:4,name:'Festival Judge',email:'judge@campusvibe.com',password:'Judge@123',role:'JUDGE'}
 ],
 events: [
  {id:1,name:'CodeStorm Challenge',description:'A fast-paced programming contest for problem solvers. Build, debug and compete with the best.',category:{name:'Technical'},date:'2026-11-12',startTime:'09:00',endTime:'12:00',venue:{name:'Computer Lab'},maxParticipants:100,entryFee:0,coordinator:{name:'Event Coordinator'}},
  {id:2,name:'Battle of Bands',description:'Bring your sound to the stage. Original music, live energy and a campus crowd.',category:{name:'Cultural'},date:'2026-11-12',startTime:'14:00',endTime:'17:00',venue:{name:'Open Stage'},maxParticipants:12,entryFee:100,coordinator:{name:'Event Coordinator'}},
  {id:3,name:'Dance League',description:'Solo and group dance competition across styles. Show the campus what you can do.',category:{name:'Arts'},date:'2026-11-13',startTime:'10:00',endTime:'13:00',venue:{name:'Main Auditorium'},maxParticipants:40,entryFee:50,coordinator:{name:'Event Coordinator'}},
  {id:4,name:'Campus Quiz',description:'General knowledge, technology, pop culture and a final buzzer round.',category:{name:'Literary'},date:'2026-11-13',startTime:'14:00',endTime:'16:00',venue:{name:'Seminar Hall'},maxParticipants:60,entryFee:0,coordinator:{name:'Event Coordinator'}},
  {id:5,name:'Photography Walk',description:'Capture the spirit of campus life and submit your best frame.',category:{name:'Arts'},date:'2026-11-14',startTime:'09:00',endTime:'11:00',venue:{name:'Campus'},maxParticipants:80,entryFee:0,coordinator:{name:'Event Coordinator'}},
  {id:6,name:'Esports Arena',description:'Friendly competition in popular esports titles. Bring your team and compete.',category:{name:'Gaming'},date:'2026-11-14',startTime:'12:00',endTime:'17:00',venue:{name:'Seminar Hall'},maxParticipants:32,entryFee:100,coordinator:{name:'Event Coordinator'}}
 ], announcements:[{id:1,title:'Registrations are open',description:'Sign in and reserve your spot in your favourite events.'},{id:2,title:'Festival dates announced',description:'Campus Vibe runs from 12–14 November 2026.'}], registrations:[], venues:[{id:1,name:'Main Auditorium'},{id:2,name:'Open Stage'},{id:3,name:'Computer Lab'},{id:4,name:'Seminar Hall'}], results:[]
};
function db(){let d;try{d=JSON.parse(localStorage.getItem(key)||'null')}catch{} if(!d){d=initial;save(d)} return d}
function save(d){localStorage.setItem(key,JSON.stringify(d))}
function currentUser(){try{return JSON.parse(localStorage.getItem('user')||'null')}catch{return null}}
async function liveReq(path,opt={}){const token=localStorage.getItem('token');const headers={'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})};const r=await fetch(API+path,{...opt,headers:{...headers,...opt.headers}});const t=await r.text();let data;try{data=JSON.parse(t)}catch{data=t}if(!r.ok)throw new Error(data?.message||data?.error||`Request failed (${r.status})`);return data}
async function demoReq(path,opt={}){const d=db(), method=(opt.method||'GET').toUpperCase(), body=opt.body?JSON.parse(opt.body):{}; const user=currentUser();
 if(path.startsWith('/public/events'))return d.events;
 if(path.startsWith('/public/announcements'))return d.announcements;
 if(path.startsWith('/public/categories'))return [...new Set(d.events.map(e=>e.category?.name).filter(Boolean))].map((name,i)=>({id:i+1,name}));
 if(path.startsWith('/public/venues'))return d.venues;
 if(path.startsWith('/public/results'))return d.results;
 if(path==='/auth/login'&&method==='POST'){const u=d.users.find(x=>x.email.toLowerCase()===body.email?.toLowerCase()&&x.password===body.password);if(!u)throw Error('Invalid email or password. Try a demo account listed in README.md.');return {id:u.id,name:u.name,email:u.email,role:u.role,token:'demo-token-'+u.id,...(u.studentId?{studentId:u.studentId,department:u.department,year:u.year}:{})}}
 if(path==='/auth/register'&&method==='POST'){if(d.users.some(u=>u.email.toLowerCase()===body.email?.toLowerCase()))throw Error('An account with this email already exists.');const u={id:Math.max(0,...d.users.map(x=>x.id))+1,...body,role:'STUDENT'};d.users.push(u);save(d);return {id:u.id,name:u.name,email:u.email,role:u.role,token:'demo-token-'+u.id}}
 if(path.startsWith('/events/')&&method==='GET'){const id=Number(path.split('/')[2]);const e=d.events.find(x=>x.id===id);if(!e)throw Error('Event not found');return e}
 if(path==='/registrations'&&method==='POST'){if(!user)throw Error('Please log in first.');const eventId=Number(body.eventId),studentId=Number(body.studentId||user.id);if(d.registrations.some(r=>r.eventId===eventId&&r.studentId===studentId&&r.status!=='CANCELLED'))throw Error('You are already registered for this event.');const ev=d.events.find(e=>e.id===eventId);if(!ev)throw Error('Event not found');const reg={id:Math.max(0,...d.registrations.map(x=>x.id))+1,registrationCode:'CV-'+Date.now().toString().slice(-8),student:{id:user.id,name:user.name,email:user.email},studentId:user.id,event:ev,eventId,status:'PENDING',createdAt:new Date().toISOString()};d.registrations.push(reg);save(d);return reg}
 if(path.startsWith('/registrations/student/'))return d.registrations.filter(r=>r.studentId===Number(path.split('/').pop()));
 if(path==='/registrations'&&method==='GET')return d.registrations;
 if(path.includes('/status')&&method==='PUT'){if(user?.role!=='ADMIN')throw Error('Only an admin can approve or reject registrations.');const id=Number(path.split('/')[2]),status=new URLSearchParams(path.split('?')[1]||'').get('status');const r=d.registrations.find(x=>x.id===id);if(!r)throw Error('Registration not found');r.status=status;save(d);return r}
 if(path==='/dashboard/admin'){return {totalStudents:d.users.filter(x=>x.role==='STUDENT').length,totalEvents:d.events.length,totalRegistrations:d.registrations.length,pendingRegistrations:d.registrations.filter(x=>x.status==='PENDING').length}}
 if(path==='/events'&&method==='POST'){if(!user||!['ADMIN','COORDINATOR'].includes(user.role))throw Error('Admin/coordinator login required.');const e={id:Math.max(0,...d.events.map(x=>x.id))+1,...body,category:typeof body.category==='string'?{name:body.category}:body.category,venue:typeof body.venue==='string'?{name:body.venue}:body.venue};d.events.push(e);save(d);return e}
 if(path.startsWith('/events/')&&method==='DELETE'){if(user?.role!=='ADMIN')throw Error('Admin login required.');const id=Number(path.split('/')[2]);d.events=d.events.filter(x=>x.id!==id);save(d);return {success:true}}
 throw Error('This action is not available in demo mode. Configure VITE_API_URL to use the deployed backend.');}
async function req(path,opt={}){return DEMO?demoReq(path,opt):liveReq(path,opt)}
export const api={events:(q='')=>req('/public/events'+(q?'?search='+encodeURIComponent(q):'')).then(xs=>q?xs.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())):xs),event:(id)=>DEMO?req('/events/'+id):liveReq('/events/'+id),categories:()=>req('/public/categories'),announcements:()=>req('/public/announcements'),venues:()=>req('/public/venues'),results:()=>req('/public/results'),login:x=>req('/auth/login',{method:'POST',body:JSON.stringify(x)}),register:x=>req('/auth/register',{method:'POST',body:JSON.stringify(x)}),registrations:id=>req('/registrations/student/'+id),createRegistration:x=>req('/registrations',{method:'POST',body:JSON.stringify(x)}),adminStats:()=>req('/dashboard/admin'),allRegistrations:()=>req('/registrations'),updateReg:(id,status)=>req(`/registrations/${id}/status?status=${status}`,{method:'PUT'}),createEvent:x=>req('/events',{method:'POST',body:JSON.stringify(x)}),deleteEvent:id=>req('/events/'+id,{method:'DELETE'})};
