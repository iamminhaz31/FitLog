'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Bookmark, Plus, Check, ArrowLeft } from 'lucide-react';
import { useFitlog } from '@/components/fitlog-provider';
import { fetchWorkout, type Workout } from '@/lib/workouts';
import { WorkoutImage, Tags, LoadingWorkouts, ErrorState } from '@/components/workout-ui';
import NotFound from '@/app/not-found';
export default function WorkoutDetail({params}:{params:Promise<{id:string}>}){
 const {id}=use(params);const {plan,saved,ready,addPlan,save}=useFitlog();
 const [w,setWorkout]=useState<Workout|null>(null);const [loading,setLoading]=useState(true);const [error,setError]=useState('');const [attempt,setAttempt]=useState(0);
 useEffect(()=>{const c=new AbortController();setLoading(true);setError('');if(!/^\d+$/.test(id)){setWorkout(null);setLoading(false);return;}fetchWorkout(id,c.signal).then(setWorkout).catch(e=>{if(e.name!=='AbortError')setError(e.message);}).finally(()=>{if(!c.signal.aborted)setLoading(false);});return()=>c.abort();},[id,attempt]);
 if(loading)return <main id="main" className="shell detail-page"><LoadingWorkouts/></main>;
 if(error)return <main id="main" className="shell detail-page"><ErrorState message={error} retry={()=>setAttempt(n=>n+1)}/></main>;
 if(!w)return <NotFound/>;
 const inPlan=plan.some(x=>x.id===w.id),isSaved=saved.some(x=>x.id===w.id),full=plan.filter(x=>!x.done).length>=5;
 const specs=[['Equipment',w.equipment],['Difficulty',w.difficulty],['Sets',w.sets],['Reps',w.reps],['Duration',`${w.duration} min`],['Calories',`${w.caloriesBurned} kcal`],['Rating',w.rating]];
 return <main id="main" className="shell detail-page"><div className="detail-grid"><div className="detail-media"><WorkoutImage w={w}/></div><section className="detail-info"><h1>{w.name}</h1><p className="detail-description">{w.description}</p><Tags w={w}/><dl className="spec-panel">{specs.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><section className="instructions"><h2>INSTRUCTIONS</h2><ol>{w.instructions.map((step,i)=><li key={step}><span>{i+1}.</span><p>{step}</p></li>)}</ol></section><div className="detail-actions"><button className="btn btn-primary" disabled={!ready||inPlan||full} onClick={()=>addPlan(w)}>{inPlan?<Check/>:<Plus/>}{inPlan?'Added to plan':full?'Plan is full':"Add to today's plan"}</button><button className="btn" disabled={!ready||isSaved} onClick={()=>save(w)}>{isSaved?<Check/>:<Bookmark/>}{isSaved?'Saved':'Save for later'}</button></div>{full&&!inPlan&&<p className="cap-note">Five active lifts in your plan. Mark one as done or remove one to add more.</p>}</section></div><Link className="back-link" href="/"><ArrowLeft size={16}/>Back to workouts</Link></main>;
}
