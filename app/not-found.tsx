import Link from 'next/link';
import { ArrowLeft, Dumbbell } from 'lucide-react';
export default function NotFound(){return <main id="main" className="not-found shell"><Dumbbell/><span className="error-number">404</span><h1>THIS LIFT IS OFF THE GRID.</h1><p>That page or workout could not be found. Your next session is waiting in the library.</p><Link href="/" className="btn btn-primary"><ArrowLeft/>Go to workouts</Link></main>;}
