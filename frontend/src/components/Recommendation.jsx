import React from 'react';

const Recommendation = ({ recommendation, confidence, reasoning }) => {
  const isInvest = recommendation === "Invest";

  return (
    <section className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/70 p-6 shadow-[0_18px_70px_rgba(15,23,42,0.7)] backdrop-blur md:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200">Final Recommendation</p>
          <span className={`inline-flex rounded-2xl px-5 py-3 text-2xl font-black ${isInvest ? 'bg-emerald-400 text-slate-950' : 'bg-rose-400 text-slate-950'}`}>
            {recommendation}
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-4 text-left md:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Confidence Score</p>
          <p className={`mt-2 text-3xl font-black ${isInvest ? 'text-emerald-300' : 'text-rose-300'}`}>{confidence}%</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-slate-950/60 p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Reasoning</p>
        <p className="text-base leading-7 text-slate-200">{reasoning}</p>
      </div>
    </section>
  );
};

export default Recommendation;
