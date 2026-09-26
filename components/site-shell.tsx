'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitlog } from './fitlog-provider';
export function Brand(){return <Link href="/" className="brand" aria-label="FitLog home"><img src="/images/logo.png" alt="" width="28" height="28"/><span>FITLOG</span></Link>;}
export function SiteHeader(){const pathname=usePathname();const {plan,saved}=useFitlog();return <header className="site-header"><div className="shell nav-inner"><Brand/><nav aria-label="Main navigation"><Link className={pathname==='/my-plan'?'':'active'} aria-current={pathname==='/'?'page':undefined} href="/">Workout</Link><Link className={pathname==='/my-plan'?'active':''} aria-current={pathname==='/my-plan'?'page':undefined} href="/my-plan">My Plan</Link></nav><div className="nav-counters"><Link href="/my-plan" className="counter plan-counter">Plan <span>{plan.length}</span></Link><Link href="/my-plan?tab=saved" className="counter saved-counter">Saved <span>{saved.length}</span></Link></div></div></header>;}
export function SiteFooter(){return <footer className="site-footer"><div className="shell footer-inner"><Brand/><p>© 2026 FitLog — Workout Library. Train hard, log honest.</p></div></footer>;}
