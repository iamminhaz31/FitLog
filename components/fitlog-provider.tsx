'use client';
import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { fetchWorkouts, type Workout } from '@/lib/workouts';
export type PlannedWorkout = Workout & { done: boolean };
type State = { plan: PlannedWorkout[]; saved: Workout[] };
type FitlogContext = State & {
 workouts: Workout[]; loading: boolean; ready: boolean; error: string; reload: () => void;
 addPlan: (w: Workout) => void; save: (w: Workout) => void;
 remove: (id: number, tab: string) => void; complete: (id: number) => void;
};
const Context = createContext<FitlogContext | null>(null);
const KEY = 'fitlog-plan-v1';
function validWorkout(w: unknown): w is Workout { return !!w && typeof w === 'object' && typeof (w as Workout).id === 'number' && typeof (w as Workout).name === 'string' && Array.isArray((w as Workout).muscleGroups) && typeof (w as Workout).duration === 'number' && typeof (w as Workout).caloriesBurned === 'number'; }
export function FitlogProvider({ children }: { children: React.ReactNode }) {
 const [state,setState] = useState<State>({plan:[],saved:[]});
 const current = useRef(state);
 const [ready,setReady]=useState(false);
 const [workouts,setWorkouts]=useState<Workout[]>([]);
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const [attempt,setAttempt]=useState(0);
 useEffect(()=>{
  try { const raw=JSON.parse(localStorage.getItem(KEY)||'null');
   if(raw) { const next={ plan: Array.isArray(raw.plan)?raw.plan.filter(validWorkout).map((w: PlannedWorkout)=>({...w,done:!!w.done})):[], saved:Array.isArray(raw.saved)?raw.saved.filter(validWorkout):[]};current.current=next;setState(next); }
  } catch { toast.info('Your stored plan could not be read. Start a new plan.'); }
  setReady(true);
 },[]);
 useEffect(()=>{
  const controller=new AbortController();setLoading(true);setError('');
  fetchWorkouts(controller.signal).then(setWorkouts).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
  return ()=>controller.abort();
 },[attempt]);
 const commit=useCallback((next:State)=>{ current.current=next;setState(next);try{localStorage.setItem(KEY,JSON.stringify(next));}catch{toast.warning('Changes are kept for this visit, but browser storage is unavailable.');}},[]);
 function addPlan(w:Workout){
  const s=current.current;if(s.plan.some(x=>x.id===w.id)){toast.info('This workout is already in your plan');return;}
  if(s.plan.filter(x=>!x.done).length>=5){toast.warning('Finish a lift before adding more. Your plan has five active lifts.');return;}
  commit({...s,plan:[...s.plan,{...w,done:false}]});toast.success("Added to today's plan");
 }
 function save(w:Workout){const s=current.current;if(s.saved.some(x=>x.id===w.id)){toast.info('This workout is already saved');return;}commit({...s,saved:[...s.saved,w]});toast.success('Saved for later');}
 function remove(id:number,tab:string){const s=current.current;commit(tab==='saved'?{...s,saved:s.saved.filter(w=>w.id!==id)}:{...s,plan:s.plan.filter(w=>w.id!==id)});toast.success(tab==='saved'?'Removed from saved workouts':"Removed from today's plan");}
 function complete(id:number){const s=current.current;if(s.plan.find(w=>w.id===id)?.done)return;commit({...s,plan:s.plan.map(w=>w.id===id?{...w,done:true}:w)});toast.success('Workout marked as done. Great work!');}
 return <Context.Provider value={{...state,workouts,loading,ready,error,reload:()=>setAttempt(x=>x+1),addPlan,save,remove,complete}}>{children}<Toaster theme="dark" position="bottom-right" richColors closeButton /></Context.Provider>;
}
export function useFitlog(){const value=useContext(Context);if(!value)throw new Error('FitLog provider missing');return value;}
