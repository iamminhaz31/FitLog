'use client';
import Link from 'next/link';
import { Clock3, Flame, Star, Dumbbell, ArrowRight, RotateCcw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { type Workout, type SortKey, workoutImage } from '@/lib/workouts';
export function WorkoutStats({w}:{w:Workout}){return <div className="workout-stats"><span><Clock3/>{w.duration} min</span><span><Flame/>{w.caloriesBurned} kcal</span><span><Star/>{w.rating}</span></div>;}
export function WorkoutImage({w,className=''}:{w:Workout;className?:string}){return <img className={className} src={workoutImage(w)} alt={w.name} loading="lazy" onError={e=>{if(e.currentTarget.dataset.fallback)return;e.currentTarget.dataset.fallback='true';e.currentTarget.src=w.image;}}/>;}
export function Tags({w}:{w:Workout}){return <div className="tags">{w.muscleGroups.map(t=><span key={t}>{t}</span>)}</div>;}
export function WorkoutCard({w}:{w:Workout}){return <Link href={`/workouts/${w.id}`} className="workout-card"><WorkoutImage w={w}/><div className="workout-card-body"><Tags w={w}/><h3>{w.name}</h3><p>{w.equipment}</p><WorkoutStats w={w}/></div></Link>;}
export function SortControl({value,onChange}:{value:SortKey;onChange:(s:SortKey)=>void}){return <div className="sort-control"><span>Sort By</span><Select value={value} onValueChange={v=>onChange(v as SortKey)}><SelectTrigger aria-label="Sort workouts"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="duration">Duration</SelectItem><SelectItem value="caloriesBurned">Calories</SelectItem><SelectItem value="rating">Rating</SelectItem></SelectContent></Select></div>;}
export function LoadingWorkouts({cards=false}:{cards?:boolean}){return <div className="loading-state" role="status" aria-live="polite"><p><span className="loading-dot"/>Loading workouts…</p><div className={cards?'workout-grid':'loading-rows'}>{Array.from({length:cards?6:2},(_,i)=><Skeleton className={cards?'h-80 rounded-lg':'h-28 rounded-lg'} key={i}/>)}</div></div>;}
export function ErrorState({message,retry}:{message:string;retry:()=>void}){return <div className="error-state" role="alert"><Dumbbell/><h2>LET’S TRY THAT AGAIN</h2><p>{message}</p><button className="btn btn-primary" onClick={retry}><RotateCcw/>Try again</button></div>;}
export function EmptyPlan(){return <Empty className="empty-plan"><EmptyHeader><Dumbbell className="empty-icon"/><EmptyTitle className="empty-title">NOTHING HERE YET</EmptyTitle><EmptyDescription>Browse the library and add a lift to get today moving.</EmptyDescription></EmptyHeader><EmptyContent><Link href="/" className="btn btn-primary">Go to workouts<ArrowRight/></Link></EmptyContent></Empty>;}
