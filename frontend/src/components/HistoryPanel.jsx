const HistoryPanel = ({ items, onClose, onOpenItem }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm">
      <div className="absolute left-0 top-0 flex h-full w-full max-w-[420px] flex-col border-r border-white/10 bg-slate-950/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.7)]">
        <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200">History</p>
            <h3 className="mt-1 text-2xl font-bold text-white">Recent searches</h3>
          </div>

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-sm text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-300">
              No history yet. Search a company to save it here.
            </div>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="w-full rounded-[22px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4 text-left transition hover:border-cyan-400/40 hover:translate-x-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">{item.company}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100">
                    Open
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
