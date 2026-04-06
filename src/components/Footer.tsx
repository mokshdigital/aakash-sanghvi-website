
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-dark relative z-10 text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold mb-6">Let&apos;s Build Something Amazing.</h2>
                <div className="flex justify-center gap-6 mb-8">
                    <a href="mailto:aakashsanghvi2791@gmail.com"
                        className="text-slate-400 hover:text-white transition-colors">Email</a>
                    <a href="https://linkedin.com/in/aakashsanghvi" target="_blank" rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
                    <Link href="/playground" className="text-slate-400 hover:text-white transition-colors">Playground</Link>
                    <Link href="/work-with-me" className="text-slate-400 hover:text-white transition-colors">Work With Me</Link>
                </div>
                <p className="text-slate-600 text-sm">
                    &copy; {new Date().getFullYear()} Aakash Sanghvi.
                </p>
            </div>
        </footer>
    );
}
