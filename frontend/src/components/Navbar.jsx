const Navbar = ({ onHistoryClick, historyCount = 0 }) => {
  return (
    <nav className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => window.location.reload()}
          className="group flex items-center gap-3 text-left"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 shadow-lg shadow-cyan-500/30 transition-transform group-hover:scale-105">
            <span className="text-lg font-black text-slate-950">AI</span>
          </div>

          <div>
            <p className="text-lg font-bold tracking-wide text-white">AI Investment Research Agent</p>
            <p className="text-xs text-slate-400">Realtime market intelligence</p>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onHistoryClick}
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-50 transition hover:border-cyan-300 hover:bg-cyan-400/20"
          >
            History {historyCount > 0 ? `(${historyCount})` : ""}
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]"></span>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">Live AI</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;