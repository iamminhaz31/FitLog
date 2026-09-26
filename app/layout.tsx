import type { Metadata } from 'next';
import './globals.css';
import { FitlogProvider } from '@/components/fitlog-provider';
import { SiteHeader, SiteFooter } from '@/components/site-shell';
export const metadata: Metadata = { title: {default:'FitLog — Workout Library',template:'%s | FitLog'}, description:"Train with intent. Build today's workout plan, save your favorite lifts and log every set.",icons:{icon:'/images/logo.png'} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className="dark"><body><FitlogProvider><a className="skip-link" href="#main">Skip to content</a><SiteHeader/>{children}<SiteFooter/></FitlogProvider></body></html>;}
