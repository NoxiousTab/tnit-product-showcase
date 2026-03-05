import { Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/10 bg-white dark:border-white/10 dark:bg-bg-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-slate-600 dark:text-white/70 sm:flex-row sm:px-6 lg:px-8">
        <div>Built for TNIT Assignment</div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-900/10 bg-slate-900/5 p-2 text-slate-700 transition-all duration-300 hover:bg-slate-900/10 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-900/10 bg-slate-900/5 p-2 text-slate-700 transition-all duration-300 hover:bg-slate-900/10 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
